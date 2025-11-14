import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductActions from "../product-actions";

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `Quick View: ${product.name}`,
    description: product.description,
  };
}

export default function QuickProductPage({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const hero = product.images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium">Quick View</h1>
        <div className="flex items-center gap-2">
          <Link href="/products" className="h-9 px-3 rounded-md btn-secondary text-xs inline-flex items-center justify-center">
            Back to Products
          </Link>
          <Link href={`/products/${product.slug}`} className="h-9 px-3 rounded-md btn-primary text-xs inline-flex items-center justify-center">
            View Full Details
          </Link>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="aspect-[4/5] overflow-hidden rounded-md border border-line">
            <Image
              src={hero.url}
              alt={hero.alt}
              width={1000}
              height={1250}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="mt-2 text-sm text-black">{product.category}</p>
          <p className="mt-4 text-lg">{product.currency} {product.price}</p>

          <ProductActions product={product} />

          <div className="mt-6 space-y-2 text-sm">
            <p><span className="font-medium">Color:</span> {product.color}</p>
            <p><span className="font-medium">Material:</span> {product.material}</p>
          </div>
        </div>
      </div>
    </div>
  );
}