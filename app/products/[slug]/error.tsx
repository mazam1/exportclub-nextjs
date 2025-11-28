"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="mt-2 text-sm text-black/70">{error.message}</p>
      <button type="button" className="mt-4 h-11 rounded-md btn-primary px-6 text-sm font-medium" onClick={reset}>
        Try again
      </button>
    </div>
  );
}

