import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Jackets",
  description: "Discover outerwear including coats, trenches, and blazers.",
};

export default async function JacketsPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Jackets"
      slug="jackets"
      banner={{ src: "/winter.png", alt: "Outerwear banner" }}
      synonyms={["jacket", "coat", "trench", "outerwear", "blazer"]}
      searchParams={awaitedSearchParams}
    />
  );
}