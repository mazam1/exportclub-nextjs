"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { getCurrentUser, getUserByHandle, getUserContent, type User, type Post, type Media, type Achievement } from "@/lib/users";

type TabKey = "posts" | "media" | "pinned" | "achievements";

export default function UserProfilePage({ params }: { params: { handle: string } }) {
  const [viewer, setViewer] = useState<User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [pinned, setPinned] = useState<string[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<TabKey>("posts");
  const [followed, setFollowed] = useState(false);
  const [offline, setOffline] = useState(false);
  const tabRefs = useRef<Record<TabKey, HTMLButtonElement | null>>({ posts: null, media: null, pinned: null, achievements: null });

  useEffect(() => {
    setOffline(typeof navigator !== "undefined" ? !navigator.onLine : false);
    function onOnline() { setOffline(false); }
    function onOffline() { setOffline(true); }
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const [v, u] = await Promise.all([getCurrentUser(), getUserByHandle(params.handle)]);
      if (!u) {
        setError("Invalid user");
        setLoading(false);
        return;
      }
      setViewer(v);
      setUser(u);
      const c = await getUserContent(u.handle);
      setPosts(c.posts);
      setMedia(c.media);
      setPinned(c.pinned);
      setAchievements(c.achievements);
    } catch (err) {
      setError("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [params.handle]);

  const isOwn = useMemo(() => viewer && user ? viewer.handle === user.handle : false, [viewer, user]);

  const onFollow = () => {
    setFollowed((v) => !v);
    trackEvent("profile_follow_toggle", { to: user?.handle, followed: !followed });
  };

  const onMessage = () => {
    trackEvent("profile_message", { to: user?.handle });
  };

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const order: TabKey[] = ["posts", "media", "pinned", "achievements"];
    const idx = order.indexOf(selected);
    if (e.key === "ArrowRight") {
      const next = order[(idx + 1) % order.length];
      setSelected(next);
      const el = tabRefs.current[next];
      el?.focus();
    } else if (e.key === "ArrowLeft") {
      const next = order[(idx - 1 + order.length) % order.length];
      setSelected(next);
      const el = tabRefs.current[next];
      el?.focus();
    }
  };

  const avatarSrc = useMemo(() => user?.avatar || "/logo.png", [user]);

  const privateBlocked = user && !user.privacy.publicProfile && !isOwn;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-busy={loading ? "true" : "false"} aria-live="polite">
      <h1 className="sr-only">Profile</h1>

      {offline && (
        <div className="mb-4 rounded-md border border-line bg-background px-3 py-2 text-sm">You are offline. Some features may be unavailable.</div>
      )}

      {error && (
        <div className="mb-6 rounded-md border border-line bg-background px-4 py-3 text-sm">
          <p>{error}</p>
          <button type="button" className="mt-3 h-9 px-3 rounded-md btn-secondary text-xs font-medium" onClick={load}>Retry</button>
        </div>
      )}

      {!error && user && (
        <div className="space-y-10">
          <section aria-labelledby="profile-header">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="relative h-24 w-24 rounded-full overflow-hidden border border-line bg-muted">
                <Image src={avatarSrc} alt={user.fullName} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 id="profile-header" className="text-2xl font-semibold">{user.fullName}</h2>
                  <span className="text-sm text-tertiary/70">@{user.handle}</span>
                </div>
                <div className="mt-2 text-sm text-tertiary/70">Joined {new Date(user.joinDate).toLocaleDateString()}</div>
                <div className="mt-4 flex items-center gap-4 text-sm">
                  <span><span className="font-medium">{posts.length}</span> Posts</span>
                  <span><span className="font-medium">{user.stats.followers}</span> Followers</span>
                  <span><span className="font-medium">{user.stats.following}</span> Following</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!isOwn && (
                  <>
                    <button type="button" className="h-9 px-3 rounded-md btn-primary text-xs font-medium" onClick={onFollow} aria-pressed={followed}>{followed ? "Following" : "Follow"}</button>
                    <button type="button" className="h-9 px-3 rounded-md btn-secondary text-xs font-medium" onClick={onMessage}>Message</button>
                  </>
                )}
                {isOwn && (
                  <Link href="/profile" className="h-9 px-3 rounded-md btn-secondary text-xs font-medium">Edit Profile</Link>
                )}
              </div>
            </div>
          </section>

          <section aria-labelledby="profile-info" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-md border border-line bg-background p-4">
              <h3 id="profile-info" className="text-base font-medium">About</h3>
              <p className="mt-2 text-sm">{user.bio || ""}</p>
            </div>
            <div className="rounded-md border border-line bg-background p-4">
              <h3 className="text-base font-medium">Details</h3>
              <ul className="mt-2 space-y-2 text-sm">
                {(user.privacy.showEmail && user.contact?.email) && <li><span className="font-medium">Email:</span> {user.contact.email}</li>}
                {(user.privacy.showPhone && user.contact?.phone) && <li><span className="font-medium">Phone:</span> {user.contact.phone}</li>}
                {(user.privacy.showLocation && user.location) && <li><span className="font-medium">Location:</span> {user.location}</li>}
                {user.social?.twitter && <li><span className="font-medium">Twitter:</span> <Link href={`https://twitter.com/${user.social.twitter}`}>{user.social.twitter}</Link></li>}
                {user.social?.instagram && <li><span className="font-medium">Instagram:</span> <Link href={`https://instagram.com/${user.social.instagram}`}>{user.social.instagram}</Link></li>}
                {user.social?.website && <li><span className="font-medium">Website:</span> <Link href={user.social.website}>{user.social.website}</Link></li>}
              </ul>
              <div className="mt-4">
                <Link href="/privacy" className="h-9 px-3 rounded-md btn-secondary text-xs font-medium">Account Settings</Link>
              </div>
            </div>
          </section>

          {privateBlocked && (
            <div className="rounded-md border border-line bg-background p-4 text-sm">This profile is private.</div>
          )}

          {!privateBlocked && (
            <section aria-labelledby="profile-content">
              <div className="flex items-center justify-between">
                <h3 id="profile-content" className="text-base font-medium">Content</h3>
              </div>
              <div role="tablist" aria-label="Profile content" onKeyDown={onTabKeyDown} className="mt-3 flex items-center gap-2">
                <button
                  ref={(el) => { tabRefs.current.posts = el; }}
                  role="tab"
                  aria-selected={selected === "posts"}
                  className={`h-9 px-3 rounded-md text-xs font-medium ${selected === "posts" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelected("posts")}
                >
                  Posts
                </button>
                <button
                  ref={(el) => { tabRefs.current.media = el; }}
                  role="tab"
                  aria-selected={selected === "media"}
                  className={`h-9 px-3 rounded-md text-xs font-medium ${selected === "media" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelected("media")}
                >
                  Media
                </button>
                <button
                  ref={(el) => { tabRefs.current.pinned = el; }}
                  role="tab"
                  aria-selected={selected === "pinned"}
                  className={`h-9 px-3 rounded-md text-xs font-medium ${selected === "pinned" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelected("pinned")}
                >
                  Pinned
                </button>
                <button
                  ref={(el) => { tabRefs.current.achievements = el; }}
                  role="tab"
                  aria-selected={selected === "achievements"}
                  className={`h-9 px-3 rounded-md text-xs font-medium ${selected === "achievements" ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => setSelected("achievements")}
                >
                  Achievements
                </button>
              </div>

              <div className="mt-6">
                {selected === "posts" && (
                  <div className="space-y-4">
                    {posts.map((p) => (
                      <article key={p.id} className="rounded-md border border-line bg-background p-4">
                        <div className="text-xs text-tertiary/70">{new Date(p.date).toLocaleDateString()}</div>
                        <p className="mt-1 text-sm">{p.content}</p>
                      </article>
                    ))}
                    {posts.length === 0 && (
                      <p className="text-sm text-tertiary">No posts yet.</p>
                    )}
                  </div>
                )}

                {selected === "media" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {media.map((m) => (
                      <div key={m.id} className="aspect-[4/5] overflow-hidden rounded-md border border-line">
                        <Image src={m.url} alt={m.alt} width={800} height={1000} className="h-full w-full object-cover" />
                      </div>
                    ))}
                    {media.length === 0 && (
                      <p className="text-sm text-tertiary">No media uploaded.</p>
                    )}
                  </div>
                )}

                {selected === "pinned" && (
                  <div className="space-y-2">
                    {pinned.map((t, i) => (
                      <div key={`${t}-${i}`} className="rounded-md border border-line bg-background px-3 py-2 text-sm">{t}</div>
                    ))}
                    {pinned.length === 0 && (
                      <p className="text-sm text-tertiary">No pinned items.</p>
                    )}
                  </div>
                )}

                {selected === "achievements" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {achievements.map((a) => (
                      <div key={a.id} className="rounded-md border border-line bg-background p-4 text-center">
                        <div className="mx-auto h-12 w-12 rounded-full border border-line grid place-items-center">
                          <span className="text-sm">★</span>
                        </div>
                        <div className="mt-2 text-sm font-medium">{a.title}</div>
                      </div>
                    ))}
                    {achievements.length === 0 && (
                      <p className="text-sm text-tertiary">No achievements yet.</p>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      )}

      {loading && (
        <div className="mt-6 grid grid-cols-1 gap-4" aria-hidden>
          <div className="h-32 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" />
          <div className="h-24 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" />
          <div className="h-64 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" />
        </div>
      )}
    </div>
  );
}