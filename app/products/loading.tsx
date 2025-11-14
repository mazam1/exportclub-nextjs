export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-label="Loading products">
      <section className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 bg-primary/10 rounded" aria-hidden></div>
          <div className="h-10 w-40 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-primary/10 rounded" aria-hidden></div>
          <div className="h-10 w-32 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-primary/10 rounded" aria-hidden></div>
          <div className="h-10 w-56 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
        </div>
      </section>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}