"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { reviews as initialReviews, type Review, getAverageRating } from "@/lib/reviews";
import Stars from "@/components/Stars";

type SortOption = "recent" | "rating" | "helpful";

export default function ReviewsSection() {
  const [items, setItems] = useState<Review[]>(initialReviews);
  const [sort, setSort] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const pageSize = 6;

  const average = useMemo(() => getAverageRating(items), [items]);

  const sorted = useMemo(() => {
    const next = [...items];
    switch (sort) {
      case "rating":
        next.sort((a, b) => b.rating - a.rating || b.helpfulCount - a.helpfulCount);
        break;
      case "helpful":
        next.sort((a, b) => b.helpfulCount - a.helpfulCount || b.rating - a.rating);
        break;
      case "recent":
      default:
        next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    return next;
  }, [items, sort]);

  const start = (page - 1) * pageSize;
  const visible = sorted.slice(start, start + pageSize);

  

  const markHelpful = (id: string) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)));
  };

  return (
    <section aria-labelledby="reviews-title" className="reviews-section clean-box-container px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 id="reviews-title" className="text-xl font-semibold">Customer Reviews</h2>
            <div className="flex items-center gap-3 text-sm">
              <Stars rating={Math.round(average)} />
              <span>{average.toFixed(1)} average</span>
              <span>• {items.length} reviews</span>
            </div>
          </div>
        </header>

        <ul className="mt-6 clean-box-grid" role="list">
          {visible.map((r) => (
            <li key={r.id} className="clean-box-item" aria-label={`Review by ${r.customerName}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 shrink-0 rounded-full bg-white/10 grid place-items-center text-white font-semibold">
                    <span>{r.avatarInitial || r.customerName.charAt(0)}</span>
                    {typeof r.badge === "number" && (
                      <span className="absolute -bottom-1 -left-1 h-5 w-5 rounded-full bg-accent text-white text-[10px] grid place-items-center">{r.badge}</span>
                    )}
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold">{r.customerName}</p>
                    <p className="text-[12px] text-black/70">{r.role}{r.location ? ` • ${r.location}` : ""}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Stars rating={r.rating} />
                    <span className="text-[12px] text-black/70">{r.rating}/5</span>
                  </div>
                  <time className="block text-[12px] text-black/50" dateTime={r.date}>
                    {new Date(r.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                </div>
              </div>

              <p className="mt-3 text-sm italic">{r.content}</p>

              {r.images && r.images.length > 0 && (
                <div className="mt-2 -mx-1 flex flex-wrap gap-2">
                  {r.images.map((img, idx) => (
                    <div key={idx} className="rounded-md border border-line overflow-hidden">
                      <Image
                        src={img.url}
                        alt={img.alt || "Customer photo"}
                        width={96}
                        height={96}
                        className="object-cover w-24 h-24"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-[13px]">{r.product}</span>
                <span className="text-[13px] font-bold text-accent">{r.priceDisplay}</span>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => markHelpful(r.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1 text-[12px] hover:bg-background"
                  aria-label="Mark review helpful"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 8v12h11a3 3 0 003-3v-7a2 2 0 00-2-2h-5z" />
                  </svg>
                  Helpful ({r.helpfulCount})
                </button>
                <span className="text-[12px] text-black/60">Rating {r.rating}/5</span>
              </div>
            </li>
          ))}
        </ul>

        
      </div>

      {showForm && (
        <ReviewForm
          onClose={() => setShowForm(false)}
          onSubmit={(data) => {
            const newItem: Review = {
              id: `r-${Date.now()}`,
              customerName: data.name || "Anonymous",
              rating: data.rating as 1 | 2 | 3 | 4 | 5,
              title: data.title || "New review",
              content: data.content || "",
              date: new Date().toISOString().slice(0, 10),
              verified: !!data.verified,
              helpfulCount: 0,
              images: data.imageUrl ? [{ url: data.imageUrl }] : undefined,
              product: "",
              priceDisplay: "",
            };
            setItems((prev) => [newItem, ...prev]);
            setShowForm(false);
            setPage(1);
            setSort("recent");
          }}
        />
      )}
    </section>
  );
}

type ReviewFormData = {
  name: string;
  rating: number;
  title: string;
  content: string;
  imageUrl?: string;
  verified?: boolean;
};

function ReviewForm({ onClose, onSubmit }: { onClose: () => void; onSubmit: (data: ReviewFormData) => void }) {
  const [form, setForm] = useState<ReviewFormData>({ name: "", rating: 5, title: "", content: "", imageUrl: "", verified: true });

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/30" aria-label="Close" onClick={onClose} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] sm:w-[600px] rounded-md border border-line bg-background p-4 shadow-sm">
        <h3 className="text-base font-semibold">Write a Review</h3>
        <div className="mt-4 grid grid-cols-1 gap-3">
          <label className="text-sm">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 w-full h-10 rounded-md border border-line bg-background px-3 text-sm"
            />
          </label>
          <label className="text-sm">
            <span>Rating</span>
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              className="mt-1 w-full h-10 rounded-md border border-line bg-background px-3 text-sm"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <label className="text-sm">
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="mt-1 w-full h-10 rounded-md border border-line bg-background px-3 text-sm"
            />
          </label>
          <label className="text-sm">
            <span>Review</span>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className="mt-1 w-full min-h-[120px] rounded-md border border-line bg-background px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            <span>Image URL (optional)</span>
            <input
              type="url"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              className="mt-1 w-full h-10 rounded-md border border-line bg-background px-3 text-sm"
            />
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!form.verified}
              onChange={(e) => setForm({ ...form, verified: e.target.checked })}
            />
            Verified purchase
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end gap-3">
          <button type="button" className="h-9 rounded-md btn-secondary px-3 text-sm" onClick={onClose}>Cancel</button>
          <button
            type="button"
            className="h-9 rounded-md btn-primary px-3 text-sm font-medium"
            onClick={() => onSubmit(form)}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}