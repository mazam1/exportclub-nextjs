export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-busy="true">
      <div className="h-6 w-40 rounded bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="h-24 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
            <div className="h-24 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
            <div className="h-24 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          </div>
        </div>
        <div>
          <div className="h-6 w-64 rounded bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          <div className="mt-2 h-4 w-36 rounded bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          <div className="mt-4 h-6 w-24 rounded bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          <div className="mt-6 h-10 w-40 rounded bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="h-20 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
            <div className="h-20 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
          </div>
        </div>
      </div>
    </div>
  );
}

