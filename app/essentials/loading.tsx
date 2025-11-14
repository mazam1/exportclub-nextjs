export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-label="Loading essentials">
      <div className="h-6 w-40 rounded bg-[rgba(196,154,54,0.08)]" aria-hidden></div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[4/5] rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse"
            aria-hidden
          />
        ))}
      </div>
    </section>
  );
}