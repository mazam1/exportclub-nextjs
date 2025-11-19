import HeroSection from '../components/HeroSection';

export const metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <>
      <HeroSection />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold">Shipping Information</h1>
        <p className="mt-3 text-sm">
          Standard delivery times and rates vary by region. This placeholder page can be replaced with your shipping policy.
        </p>
      </div>
    </>
  );
}