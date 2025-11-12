import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Knitwear",
  description: "Sweaters, cardigans, and knit essentials.",
};

export default function KnitwearPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  return (
    <CategoryPage
      title="Knitwear"
      slug="knitwear"
      banner={{ src: "/banner-image.png", alt: "Knitwear banner" }}
      synonyms={["knit", "sweater", "cardigan", "wool"]}
      searchParams={searchParams}
    />
  );
}