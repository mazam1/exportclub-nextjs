import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Pants",
  description: "Shop trousers, chinos, and tailored pants.",
};

export default async function PantsPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Pants"
      slug="pants"
      banner={{ src: "/trousers.png", alt: "Men’s pants banner" }}
      synonyms={["pants", "trousers", "chino", "jeans"]}
      searchParams={awaitedSearchParams}
    />
  );
}