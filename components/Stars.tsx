export default function Stars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <div className="flex items-center" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rounded;
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