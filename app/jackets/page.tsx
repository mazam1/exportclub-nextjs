import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Jackets",
  description: "Discover outerwear including coats, trenches, and blazers.",
};

export default function JacketsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  return (
    <CategoryPage
      title="Jackets"
      slug="jackets"
      banner={{ src: "/winter.png", alt: "Outerwear banner" }}
      synonyms={["jacket", "coat", "trench", "outerwear", "blazer"]}
      searchParams={searchParams}
    />
  );
}