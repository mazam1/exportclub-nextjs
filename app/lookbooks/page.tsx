import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Lookbooks",
  description: "Seasonal men’s fashion lookbooks with curated styling inspiration.",
};

type Lookbook = {
  id: string;
  title: string;
  season: "Spring/Summer" | "Autumn/Winter";
  year: number;
  cover: string;
  productsQuery?: string;
};

const lookbooks: Lookbook[] = [
  {
    id: "monochrome-minimal",
    title: "Monochrome Minimal",
    season: "Spring/Summer",
    year: 2025,
    cover: "/formal.png",
    productsQuery: "monochrome",
  },
  {
    id: "effortless-linen",
    title: "Effortless Linen",
    season: "Spring/Summer",
    year: 2025,
    cover: "/shirt1.png",
    productsQuery: "linen",
  },
  {
    id: "tailored-layers",
    title: "Tailored Layers",
    season: "Autumn/Winter",
    year: 2025,
    cover: "/winter.png",
    productsQuery: "layers",
  },
];

export default function LookbooksPage({
  searchParams,
}: {
  searchParams?: { season?: string; year?: string };
}) {
  const seasonFilter = (searchParams?.season || "").toLowerCase();
  const yearFilter = parseInt(searchParams?.year || "", 10);

  const filtered = lookbooks.filter((lb) => {
    const matchesSeason = seasonFilter
      ? lb.season.toLowerCase() === seasonFilter
      : true;
    const matchesYear = Number.isFinite(yearFilter) ? lb.year === yearFilter : true;
    return matchesSeason && matchesYear;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Lookbooks</h1>
        <div className="flex items-center gap-3" aria-label="Filters">
          <div className="flex items-center gap-2">
            <label htmlFor="season" className="text-sm">Season</label>
            <div id="season" className="flex items-center gap-2">
              <Link href="/lookbooks" className="text-sm hover:underline">All</Link>
              <Link href={{ pathname: "/lookbooks", query: { season: "Spring/Summer" } }} className="text-sm hover:underline">SS</Link>
              <Link href={{ pathname: "/lookbooks", query: { season: "Autumn/Winter" } }} className="text-sm hover:underline">AW</Link>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="year" className="text-sm">Year</label>
            <div id="year" className="flex items-center gap-2">
              <Link href="/lookbooks" className="text-sm hover:underline">All</Link>
              <Link href={{ pathname: "/lookbooks", query: { year: "2025" } }} className="text-sm hover:underline">2025</Link>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-6" aria-label="Fashion collections">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((lb) => (
            <article key={lb.id} className="group rounded-md overflow-hidden border border-line bg-background">
              <div className="relative aspect-[4/5]">
                <Image
                  src={lb.cover}
                  alt={lb.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                {lb.productsQuery && (
                  <div className="absolute bottom-3 left-3">
                    <Link
                      href={{ pathname: "/products", query: { q: lb.productsQuery } }}
                      aria-label={`Shop the ${lb.title} look`}
                      className="inline-flex items-center rounded-full btn-secondary px-4 py-1 text-[12px]"
                    >
                      Shop the Look
                    </Link>
                  </div>
                )}
              </div>
              <div className="px-3 py-3 flex items-center justify-between">
                <h2 className="text-lg font-medium">{lb.title}</h2>
                <span className="text-sm text-tertiary/70">{lb.season} {lb.year}</span>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-6 text-sm text-tertiary">No lookbooks found.</p>
        )}
      </section>

      <footer className="mt-10 text-sm text-tertiary/70">
        <p>Explore seasonal edits and curated styles. Discover pieces across shirts, pants, jackets, suits, and more.</p>
      </footer>
    </div>
  );
}