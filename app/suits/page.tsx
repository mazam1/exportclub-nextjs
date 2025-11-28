import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Suits",
  description: "Tailored suits, blazers, and formalwear.",
};

export default async function SuitsPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Suits"
      slug="suits"
      banner={{ src: "/formal.png", alt: "Suits banner" }}
      synonyms={["suit", "blazer", "tailored"]}
      searchParams={awaitedSearchParams}
    />
  );
}