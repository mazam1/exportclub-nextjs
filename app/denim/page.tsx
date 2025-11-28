import CategoryPage from "@/components/CategoryPage";

export const metadata = {
  title: "Denim",
  description: "Jeans and denim essentials.",
};

export default async function DenimPage({ searchParams }: { searchParams?: Promise<Record<string, string | undefined>> }) {
  const awaitedSearchParams = searchParams ? await searchParams : undefined;
  return (
    <CategoryPage
      title="Denim"
      slug="denim"
      banner={{ src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop", alt: "Denim banner" }}
      synonyms={["denim", "jeans"]}
      searchParams={awaitedSearchParams}
    />
  );
}