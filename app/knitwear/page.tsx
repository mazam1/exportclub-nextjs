import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Knitwear",
  description: "Sweaters, cardigans, and knit essentials.",
};

export default async function KnitwearPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Knitwear"
      slug="knitwear"
      banner={{ src: "https://images.unsplash.com/photo-1520975942406-3797cc7bd312?w=1200&q=80&auto=format&fit=crop", alt: "Knitwear banner" }}
      synonyms={["knit", "sweater", "cardigan", "wool"]}
      searchParams={awaitedSearchParams}
    />
  );
}