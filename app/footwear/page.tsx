import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Footwear",
  description: "Shoes, sneakers, and boots.",
};

export default function FootwearPage({ searchParams }: { searchParams?: Record<string, string | undefined> }) {
  return (
    <CategoryPage
      title="Footwear"
      slug="footwear"
      banner={{ src: "/banner-image.png", alt: "Footwear banner" }}
      synonyms={["shoe", "sneaker", "boots", "loafer", "footwear"]}
      searchParams={searchParams}
    />
  );
}