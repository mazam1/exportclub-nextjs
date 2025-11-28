import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Footwear",
  description: "Shoes, sneakers, and boots.",
};

export default async function FootwearPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Footwear"
      slug="footwear"
      banner={{ src: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&q=80&auto=format&fit=crop", alt: "Footwear banner" }}
      synonyms={["shoe", "sneaker", "boots", "loafer", "footwear"]}
      searchParams={awaitedSearchParams}
    />
  );
}