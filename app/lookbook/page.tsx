import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Lookbook",
  description: "Curated styling inspiration and seasonal edits.",
};

const looks = [
  {
    title: "Monochrome Minimal",
    img: "https://images.unsplash.com/photo-1495121605193-b116b5b09d0d?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Effortless Linen",
    img: "https://images.unsplash.com/photo-1519415943484-9fa18778fcd1?w=1200&q=80&auto=format&fit=crop",
  },
  {
    title: "Tailored Layers",
    img: "https://images.unsplash.com/photo-1520974735194-0a2a20f98b6f?w=1200&q=80&auto=format&fit=crop",
  },
];

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Lookbook</h1>
        <Link href="/products" className="text-sm hover:underline">Shop the looks</Link>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {looks.map((l) => (
          <article key={l.title} className="group">
            <div className="aspect-[4/5] overflow-hidden rounded-md border border-line">
              <Image src={l.img} alt={l.title} width={1200} height={1500} className="h-full w-full object-cover" />
            </div>
            <h2 className="mt-3 text-lg font-medium">{l.title}</h2>
          </article>
        ))}
      </div>
    </div>
  );
}