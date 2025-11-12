import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Denim",
  description: "Jeans and denim essentials.",
};

export default function DenimPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  return (
    <CategoryPage
      title="Denim"
      slug="denim"
      banner={{ src: "/banner-image.png", alt: "Denim banner" }}
      synonyms={["denim", "jeans"]}
      searchParams={searchParams}
    />
  );
}