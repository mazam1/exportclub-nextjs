import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductActions from "./product-actions";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import type { Product } from "@/lib/products";
import { trackEvent } from "@/lib/analytics";
import DedicatedWoolSuitSection from "./dedicated-wool-suit-section";
import DedicatedTrenchSection from "./dedicated-trench-section";
import DedicatedDenimSection from "./dedicated-denim-section";
import DedicatedDressSection from "./dedicated-dress-section";
import DedicatedSupimaTeeSection from "./dedicated-supima-tee-section";
import DedicatedOxfordShirtSection from "./dedicated-oxford-shirt-section";
import DedicatedLoungeShirtSection from "./dedicated-lounge-shirt-section";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: `${product.name} | ExportClub`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({ url: img.url, alt: img.alt })),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images[0]?.url,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  const heroImage = product.images[0];
  const specificationList = [
    { label: "Collar Style", value: "Mock Neck" },
    { label: "Color", value: "Beige" },
    { label: "Cuff Style", value: "Rib" },
    { label: "Fabric", value: "52% Polyester, 48% Cotton" },
    { label: "Fit", value: "Regular Fit" },
    { label: "Pattern", value: "Texture" },
    { label: "Sleeve", value: "Full Sleeves" },
    { label: "Style", value: "Basic" },
  ];
  const panelSizes = ["S", "M", "L", "XL", "XXL"] as const;

  // Apply 700px height styling only for Tailored Wool Suit Jacket
  const isTailoredWoolSuitJacket = slug === "tailored-wool-suit-jacket";
  const sectionHeightClass = isTailoredWoolSuitJacket ? "product-detail-section-700" : "";

  // Check for products that use dedicated sections
  const isClassicCottonTrench = slug === "classic-cotton-trench-men";
  const isSelvedgeStraightDenim = slug === "selvedge-straight-denim-men";
  const isSilkBlendLoungeShirt = slug === "silk-blend-lounge-shirt";
  const isPremiumSupimaTee = slug === "premium-supima-tee-unisex";
  const isCottonOxfordShirt = slug === "cotton-oxford-shirt-men";

  if (isTailoredWoolSuitJacket) {
    return (
      <DedicatedWoolSuitSection
        product={product}
        specificationList={specificationList}
      />
    );
  }

  if (isClassicCottonTrench) {
    return (
      <DedicatedTrenchSection
        product={product}
        specificationList={specificationList}
      />
    );
  }

  if (isSelvedgeStraightDenim) {
    return (
      <DedicatedDenimSection
        product={product}
        specificationList={specificationList}
      />
    );
  }

  if (isSilkBlendLoungeShirt) {
    return (
      <DedicatedLoungeShirtSection
        product={product}
        specificationList={specificationList}
      />
    );
  }

  if (isPremiumSupimaTee) {
    return (
      <DedicatedSupimaTeeSection
        product={product}
        specificationList={specificationList}
      />
    );
  }

  if (isCottonOxfordShirt) {
    return (
      <DedicatedOxfordShirtSection
        product={product}
        specificationList={specificationList}
      />
    );
  }

  return (
    <div className="bg-[#f7f5f2] text-tertiary">
      <section className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-80 mix-blend-multiply"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(35,29,21,0.05), transparent 55%), radial-gradient(circle at 80% 0%, rgba(187,170,140,0.18), transparent 45%), linear-gradient(180deg, #f9f7f2 0%, #f1ebe1 80%)",
          }}
        />
        <div className="absolute inset-y-12 inset-x-6 rounded-[48px] border border-black/5 opacity-50" aria-hidden />
        <div className={`relative ${isTailoredWoolSuitJacket ? 'product-detail-left-aligned' : 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'}`}>
          <header className="flex flex-col gap-2">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: product.category === "men" ? "Men" : product.category === "women" ? "Women" : "Accessories", href: product.category === "men" ? "/mens" : product.category === "women" ? "/collections" : "/accessories" },
                { label: product.name },
              ]}
            />
            <p className="text-xs uppercase tracking-[0.32em] text-black/50">
              {product.name}
            </p>
          </header>
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(260px,0.7fr)] xl:grid-cols-[594px_minmax(0,1fr)_320px]">
            <figure className={`${sectionHeightClass} product-images-section max-w-[594px] rounded-[40px] bg-gradient-to-br from-white via-[#f8f4ee] to-[#ede7dd] p-5 shadow-[0_40px_120px_rgba(15,14,11,0.12)]`}>
              <div
                className="relative w-full flex-1 overflow-hidden rounded-[32px]"
                style={{ minHeight: 0 }}
              >
                {heroImage && (
                  <Image
                    src={heroImage.url}
                    alt={heroImage.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 594px"
                    className="h-full w-full object-cover object-center"
                    priority
                    quality={85}
                  />
                )}
              </div>
              <figcaption className="mt-4 text-sm text-black/60 flex-shrink-0">
                Man wearing the Tailored Wool Suit Jacket in a modern apartment.
              </figcaption>
            </figure>
            <article className={`${sectionHeightClass} product-description-section rounded-[36px] border border-black/5 bg-white/95 p-8 shadow-[0_30px_80px_rgba(15,14,11,0.1)] backdrop-blur`} aria-labelledby="product-title">
              <div className="flex flex-col min-h-full">
                <h1 id="product-title" className="text-3xl font-semibold tracking-tight text-black lg:text-4xl">
                  {product.name}
                </h1>
                <p className="mt-4 text-base leading-relaxed text-black/75">
                  {product.description}
                </p>
                <div className="mt-6 flex flex-wrap items-baseline gap-4">
                  <span className="text-4xl font-semibold tracking-tight text-black">
                    {product.currency} {product.price}
                  </span>
                  <span className="text-sm font-medium uppercase tracking-[0.24em] text-black/50">
                    Complimentary express tailoring
                  </span>
                </div>
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {specificationList.map((spec) => (
                    <div key={spec.label} className="rounded-2xl border border-black/5 bg-[#f7f5f0] p-4">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.3em] text-black/50">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 text-sm text-black/80">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8">
                  <ProductActions product={product} />
                </div>
              </div>
            </article>
            <aside className={`${sectionHeightClass} product-purchase-section rounded-[32px] border border-black/10 bg-white/90 p-6 shadow-[0_25px_70px_rgba(15,14,11,0.14)] backdrop-blur-lg`} aria-labelledby="purchase-panel-title">
              <h2 id="purchase-panel-title" className="text-sm font-semibold uppercase tracking-[0.3em] text-black/50">
                Purchase options
              </h2>
              <div className="mt-4 space-y-6">
                <div>
                  <p className="text-sm text-black/50 line-through">Rs. 6,495.00</p>
                  <p className="text-3xl font-semibold text-black">Rs. 5,196.00</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-600">20% off</p>
                </div>
                <button
                  type="button"
                  className="w-full rounded-full border border-black/15 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:border-black hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
                  aria-label="Open size chart"
                >
                  Size chart
                </button>
                <form className="space-y-4" aria-label="Quick size selection">
                  <fieldset>
                    <legend className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                      Size
                    </legend>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {panelSizes.map((panelSize) => (
                        <label key={panelSize} className="inline-flex items-center">
                          <input
                            type="radio"
                            name="panel-size"
                            defaultChecked={panelSize === "M"}
                            className="peer sr-only"
                          />
                          <span className="rounded-full border border-black/15 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-black/70 transition-colors peer-checked:border-black peer-checked:bg-black peer-checked:text-white">
                            {panelSize}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="panel-qty" className="text-xs font-semibold uppercase tracking-[0.3em] text-black/50">
                      Quantity
                    </label>
                    <input
                      id="panel-qty"
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="mt-2 w-full rounded-2xl border border-black/15 px-4 py-3 text-center text-base font-semibold text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black/40"
                      aria-label="Select quantity"
                    />
                  </div>
                </form>
                <section className="rounded-2xl border border-black/10 bg-[#0f172a] p-5 text-white">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                    Need Help?
                  </p>
                  <p className="mt-3 text-base font-medium text-white">
                    +92 42 111 789 456
                  </p>
                  <p className="mt-1 text-sm text-white/80">Mon–Sat (10:00 AM to 06:00 PM)</p>
                </section>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}


