import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Shirts",
  description: "Browse ExportClub shirts, tees, and tops.",
};

export default async function ShirtsPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Shirts"
      slug="shirts"
      banner={{ src: "/shirt1.png", alt: "Men’s shirts banner" }}
      synonyms={["shirt", "tee", "t-shirt", "top"]}
      searchParams={awaitedSearchParams}
    />
  );
}