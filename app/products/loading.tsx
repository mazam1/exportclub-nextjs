export default function Loading() {
  const cards = Array.from({ length: 8 });
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-busy="true" aria-label="Loading products">
      <div className="h-6 w-24 bg-primary/10 rounded" aria-hidden></div>
      <div className="mt-6 flex flex-wrap items-center gap-4" aria-label="Loading filters">
        <div className="h-10 w-40 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
        <div className="h-10 w-32 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
        <div className="h-10 w-56 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Loading product grid">
        {cards.map((_, i) => (
          <div key={i} className="group">
            <div className="aspect-[4/5] overflow-hidden rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
            <div className="mt-3 h-4 w-3/4 bg-primary/10 rounded" aria-hidden></div>
            <div className="mt-2 h-3 w-1/3 bg-primary/10 rounded" aria-hidden></div>
          </div>
        ))}
      </div>
    </div>
  );
}