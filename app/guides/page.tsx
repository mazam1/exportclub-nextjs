export const metadata = {
  title: "Styling Guides",
  description: "Expert tips to style ExportClub pieces across seasons.",
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Styling Guides</h1>
      <article className="mt-6 space-y-4">
        <h2 className="text-xl font-medium">Building a Capsule Wardrobe</h2>
        <p className="text-sm text-black">
          Focus on versatile silhouettes and neutral tones. Layer tailored outerwear over premium basics, then add an accent piece for dimension.
        </p>
      </article>
      <article className="mt-10 space-y-4">
        <h2 className="text-xl font-medium">Linen for Warm Weather</h2>
        <p className="text-sm text-black">
          Choose relaxed fits with breathable blends. Pair linen blazers with camisoles or lightweight tees for balance.
        </p>
      </article>
      <article className="mt-10 space-y-4">
        <h2 className="text-xl font-medium">Elevated Denim Essentials</h2>
        <p className="text-sm text-black">
          Opt for selvedge finishes and straight silhouettes. Contrast with structured tops or drape with a cashmere scarf.
        </p>
      </article>
    </div>
  );
}