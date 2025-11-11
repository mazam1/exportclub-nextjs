"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import { reviews as initialReviews, type Review, getAverageRating } from "@/lib/reviews";

type SortOption = "recent" | "rating" | "helpful";

export default function ReviewsSection() {
  const [items, setItems] = useState<Review[]>(initialReviews);
  const [sort, setSort] = useState<SortOption>("recent");
  const [page, setPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const pageSize = 4;

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

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const start = (page - 1) * pageSize;
  const visible = sorted.slice(start, start + pageSize);

  const setSortOption = (value: SortOption) => {
    setSort(value);
    setPage(1);
  };

  const markHelpful = (id: string) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)));
  };

  return (
    <section aria-labelledby="reviews-title" className="reviews-section px-4 sm:px-6 lg:px-8 py-12">
      <div className="rounded-md border border-line p-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 id="reviews-title" className="text-xl font-semibold">Customer Reviews</h2>
            <div className="flex items-center gap-3 text-sm">
              <Stars rating={Math.round(average)} />
              <span className="text-black">{average.toFixed(1)} average</span>
              <span className="text-black">• {items.length} reviews</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm">Sort by</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="h-10 rounded-md border border-line bg-background px-3 text-sm"
            >
              <option value="recent">Most recent</option>
              <option value="rating">Highest rated</option>
              <option value="helpful">Most helpful</option>
            </select>
            <button
              type="button"
              className="h-10 rounded-md border border-black px-4 text-sm font-medium"
              onClick={() => setShowForm(true)}
            >
              Write a Review
            </button>
          </div>
        </header>

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visible.map((r) => (
            <li key={r.id} className="rounded-md border border-line p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Stars rating={r.rating} />
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-black">by {r.customerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {r.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-line px-2 py-1 text-[11px]">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      Verified purchase
                    </span>
                  )}
                  <time className="text-xs text-black" dateTime={r.date}>
                    {new Date(r.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                  </time>
                </div>
              </div>

              <p className="text-sm text-black">{r.content}</p>

              {r.images && r.images.length > 0 && (
                <div className="mt-1 -mx-1 flex flex-wrap gap-2">
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

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => markHelpful(r.id)}
                  className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-1 text-xs hover:bg-muted"
                  aria-label="Mark review helpful"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 9V5a3 3 0 00-3-3l-4 8v12h11a3 3 0 003-3v-7a2 2 0 00-2-2h-5z" />
                  </svg>
                  Helpful ({r.helpfulCount})
                </button>
                <span className="text-[12px] text-black">Rating: {r.rating}/5</span>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="h-9 rounded-md border border-line px-3 text-sm disabled:opacity-50"
            aria-label="Previous page"
          >
            Previous
          </button>
          <div className="text-sm">Page {page} of {pageCount}</div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={page === pageCount}
            className="h-9 rounded-md border border-line px-3 text-sm disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
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

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className={filled ? "text-accent" : "text-black/30"}
            aria-hidden="true"
          >
            <path
              d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.4 8.165L12 18.896l-7.334 4.267 1.4-8.165L.132 9.211l8.2-1.193L12 .587z"
              fill="currentColor"
            />
          </svg>
        );
      })}
    </div>
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
          <button type="button" className="h-9 rounded-md border border-line px-3 text-sm" onClick={onClose}>Cancel</button>
          <button
            type="button"
            className="h-9 rounded-md border border-black px-3 text-sm font-medium"
            onClick={() => onSubmit(form)}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}