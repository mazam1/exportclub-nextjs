import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getProductBySlug } from "@/lib/products";
import ProductActions from "./product-actions";

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      type: "product",
      title: product.name,
      description: product.description,
      images: product.images.map((i) => ({ url: i.url, alt: i.alt })),
    },
  };
}

export default function ProductPage({ params }: { params: Params }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  const hero = product.images[0];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: product.images.map((i) => i.url),
            brand: { '@type': 'Brand', name: 'ExportClub' },
            offers: {
              '@type': 'Offer',
              priceCurrency: product.currency,
              price: product.price,
              availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            },
          }),
        }}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: product.name },
        ]}
        align="right"
      />
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
          {product.images.slice(1).length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3">
              {product.images.slice(1).map((img, idx) => (
                <Image
                  key={idx}
                  src={img.url}
                  alt={img.alt}
                  width={400}
                  height={500}
                  className="h-full w-full object-cover rounded-md border border-line"
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="mt-2 text-sm text-black">{product.category}</p>
          <p className="mt-4 text-xl">{product.currency} {product.price}</p>

          <ProductActions product={product} />

          <div className="mt-8 space-y-2 text-sm">
            <p><span className="font-medium">Color:</span> {product.color}</p>
            <p><span className="font-medium">Material:</span> {product.material}</p>
            <p><span className="font-medium">Fit:</span> {product.fit}</p>
            <p><span className="font-medium">Care:</span> {product.care}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-base font-medium">Details</h2>
            <p className="mt-2 text-sm text-black">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}