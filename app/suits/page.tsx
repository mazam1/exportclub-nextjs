import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Suits",
  description: "Tailored suits, blazers, and formalwear.",
};

export default function SuitsPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  return (
    <CategoryPage
      title="Suits"
      slug="suits"
      banner={{ src: "/formal.png", alt: "Suits banner" }}
      synonyms={["suit", "blazer", "tailored"]}
      searchParams={searchParams}
    />
  );
}