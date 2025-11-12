import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Pants",
  description: "Shop trousers, chinos, and tailored pants.",
};

export default function PantsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  return (
    <CategoryPage
      title="Pants"
      slug="pants"
      banner={{ src: "/trousers.png", alt: "Men’s pants banner" }}
      synonyms={["pants", "trousers", "chino", "jeans"]}
      searchParams={searchParams}
    />
  );
}