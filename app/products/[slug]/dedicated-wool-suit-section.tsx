"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import ZoomImage from "@/components/ZoomImage";
import ProductActions from "./product-actions";
import { getAllProducts } from "@/lib/products";
import type { Product, Size } from "@/lib/products";
import { trackEvent } from "@/lib/analytics";

interface Specification {
  label: string;
  value: string;
}

interface ColorVariant {
  name: string;
  hex: string;
  image: string;
  available: boolean;
}

interface TailoredWoolSuitJacketSectionProps {
  product: Product;
  specificationList: Specification[];
}

export default function TailoredWoolSuitJacketSection({
  product,
  specificationList,
}: TailoredWoolSuitJacketSectionProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.color);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Color variants for the tailored wool suit jacket
  const colorVariants: ColorVariant[] = [
    { name: "Stone Heather", hex: "#B0A999", image: product.images[0].url, available: true },
    { name: "Navy Blue", hex: "#1e3a8a", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80&auto=format&fit=crop", available: true },
    { name: "Charcoal Gray", hex: "#374151", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1600&q=80&auto=format&fit=crop", available: false },
    { name: "Burgundy", hex: "#7f1d1d", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600&q=80&auto=format&fit=crop", available: true },
  ];

  // Related products - filtering by category and excluding current product
  const relatedProducts = getAllProducts()
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Analytics tracking for product view
  useEffect(() => {
    trackEvent("product_view", {
      product_id: product.id,
      product_name: product.name,
      product_category: product.category,
      product_price: product.price,
    });
  }, [product]);

  const handleImageChange = useCallback((index: number) => {
    setSelectedImageIndex(index);
    trackEvent("product_image_view", {
      product_id: product.id,
      image_index: index,
    });
  }, [product.id]);

  const handleColorChange = useCallback((colorName: string) => {
    setSelectedColor(colorName);
    const variant = colorVariants.find(v => v.name === colorName);
    if (variant) {
      setSelectedImageIndex(0); // Reset to first image when color changes
    }
    trackEvent("product_color_change", {
      product_id: product.id,
      selected_color: colorName,
    });
  }, [product.id, colorVariants]);

  const handleSizeChange = useCallback((size: Size) => {
    setSelectedSize(size);
    trackEvent("product_size_change", {
      product_id: product.id,
      selected_size: size,
    });
  }, [product.id]);

  const handleQuantityChange = useCallback((qty: number) => {
    setQuantity(qty);
    trackEvent("product_quantity_change", {
      product_id: product.id,
      quantity: qty,
    });
  }, [product.id]);

  const handleWishlistToggle = useCallback(() => {
    setIsWishlisted(!isWishlisted);
    trackEvent("product_wishlist_toggle", {
      product_id: product.id,
      action: !isWishlisted ? "add" : "remove",
    });
  }, [isWishlisted, product.id]);

  const currentImage = product.images[selectedImageIndex] || product.images[0];

  // Schema.org structured data for SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images.map(img => img.url),
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "Export Club"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Export Club"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <div className="bg-[#f7f5f2] text-tertiary">
        <section className="relative isolate overflow-hidden py-12 sm:py-16 lg:py-20">
          {/* Background pattern */}
          <div
            className="pointer-events-none absolute inset-0 opacity-80 mix-blend-multiply"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(35,29,21,0.05), transparent 55%), radial-gradient(circle at 80% 0%, rgba(187,170,140,0.18), transparent 45%), linear-gradient(180deg, #f9f7f2 0%, #f1ebe1 80%)",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <header className="mb-8">
              <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-gray-600">
                <a href="/" className="hover:text-gray-900 transition-colors">Home</a>
                <span aria-hidden="true">/</span>
                <a href="/suits" className="hover:text-gray-900 transition-colors">Suits</a>
                <span aria-hidden="true">/</span>
                <span className="text-gray-900 font-medium" aria-current="page">{product.name}</span>
              </nav>
            </header>

            <div className="grid gap-12 lg:grid-cols-2">
              {/* Product Images Section */}
              <div className="space-y-6">
                {/* Main Image with Zoom */}
                <div className="aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#f8f4ee] to-[#ede7dd] shadow-[0_40px_120px_rgba(15,14,11,0.12)]">
                  <ZoomImage
                    src={currentImage.url}
                    alt={currentImage.alt}
                    width={800}
                    height={800}
                    zoom={2.2}
                  />
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageChange(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-black shadow-lg'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Information Section */}
              <div className="space-y-8">
                {/* Product Header */}
                <div>
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline space-x-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500 uppercase tracking-wide">
                    Complimentary express tailoring included
                  </span>
                </div>

                {/* Color Variants */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Color: {selectedColor}
                  </h3>
                  <div className="flex space-x-3" role="radiogroup" aria-label="Color selection">
                    {colorVariants.map((variant) => (
                      <button
                        key={variant.name}
                        onClick={() => handleColorChange(variant.name)}
                        disabled={!variant.available}
                        className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === variant.name
                            ? 'border-black ring-2 ring-black ring-offset-2'
                            : 'border-gray-300 hover:border-gray-400'
                        } ${!variant.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{ backgroundColor: variant.hex }}
                        aria-label={`Select ${variant.name} color${!variant.available ? ' (unavailable)' : ''}`}
                        title={`${variant.name}${!variant.available ? ' (Currently unavailable)' : ''}`}
                      >
                        {selectedColor === variant.name && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Size
                  </h3>
                  <div className="grid grid-cols-5 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`py-3 px-4 text-sm font-medium uppercase tracking-wide border-2 rounded-lg transition-all ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Size guide available • {product.stock} pieces available
                  </p>
                </div>

                {/* Quantity Selection */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-4">
                    Quantity
                  </h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border-2 border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
                        className="w-12 h-12 flex items-center justify-center text-xl font-medium hover:bg-gray-50 transition-colors"
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                      >
                        −
                      </button>
                      <span className="w-16 text-center font-medium" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(Math.min(product.stock, quantity + 1))}
                        className="w-12 h-12 flex items-center justify-center text-xl font-medium hover:bg-gray-50 transition-colors"
                        aria-label="Increase quantity"
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.stock} available
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <button
                    onClick={() => {
                      trackEvent("add_to_cart_click", {
                        product_id: product.id,
                        selected_size: selectedSize,
                        quantity: quantity,
                        selected_color: selectedColor,
                      });
                    }}
                    disabled={!selectedSize}
                    className="flex-1 bg-black text-white py-4 px-8 rounded-full font-semibold uppercase tracking-wide hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Add to cart"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlistToggle}
                    className={`p-4 rounded-full border-2 transition-all ${
                      isWishlisted
                        ? 'border-red-500 bg-red-50 text-red-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }`}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    aria-pressed={isWishlisted}
                  >
                    <svg className="w-6 h-6" fill={isWishlisted ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                {/* Product Specifications */}
                <div className="border-t pt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Product Details</h3>
                  <dl className="grid gap-4 sm:grid-cols-2">
                    {specificationList.map((spec) => (
                      <div key={spec.label} className="flex justify-between py-2 border-b border-gray-100">
                        <dt className="text-sm text-gray-600">{spec.label}:</dt>
                        <dd className="text-sm font-medium text-gray-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <p><strong>Material:</strong> {product.material}</p>
                    <p><strong>Fit:</strong> {product.fit}</p>
                    <p><strong>Care:</strong> {product.care}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                You Might Also Like
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="group">
                    <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
                      <Image
                        src={relatedProduct.images[0].url}
                        alt={relatedProduct.images[0].alt}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      ${relatedProduct.price}
                    </p>
                    <a
                      href={`/products/${relatedProduct.slug}`}
                      className="inline-block mt-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => trackEvent("related_product_click", {
                        product_id: relatedProduct.id,
                        from_product_id: product.id,
                      })}
                    >
                      View Product →
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
