"use client";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold">Thank you</h1>
        <p className="mt-3 text-sm">Your order has been received. A confirmation email will be sent shortly.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <form
        className="mt-6 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          clear();
          setSubmitted(true);
        }}
      >
        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className="text-base font-medium">Contact</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="text-sm">
              <span>Email</span>
              <input type="email" required className="mt-1 h-10 w-full rounded-md border border-line bg-background px-3 text-sm" />
            </label>
            <label className="text-sm">
              <span>Phone</span>
              <input type="tel" className="mt-1 h-10 w-full rounded-md border border-line bg-background px-3 text-sm" />
            </label>
          </div>
        </section>

        <section aria-labelledby="shipping-heading">
          <h2 id="shipping-heading" className="text-base font-medium">Shipping</h2>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="text-sm">
              <span>Full name</span>
              <input type="text" required className="mt-1 h-10 w-full rounded-md border border-line bg-background px-3 text-sm" />
            </label>
            <label className="text-sm">
              <span>Address</span>
              <input type="text" required className="mt-1 h-10 w-full rounded-md border border-line bg-background px-3 text-sm" />
            </label>
            <label className="text-sm">
              <span>City</span>
              <input type="text" required className="mt-1 h-10 w-full rounded-md border border-line bg-background px-3 text-sm" />
            </label>
            <label className="text-sm">
              <span>Postal code</span>
              <input type="text" required className="mt-1 h-10 w-full rounded-md border border-line bg-background px-3 text-sm" />
            </label>
          </div>
        </section>

        <section aria-labelledby="method-heading">
          <h2 id="method-heading" className="text-base font-medium">Method</h2>
          <div className="mt-3 space-y-2">
            <label className="flex items-center gap-3 text-sm">
              <input type="radio" name="method" defaultChecked className="h-4 w-4" />
              <span>Standard — Free</span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input type="radio" name="method" className="h-4 w-4" />
              <span>Express — USD 15</span>
            </label>
          </div>
        </section>

        <section aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="text-base font-medium">Summary</h2>
          <div className="mt-3 rounded-md border border-line p-4 text-sm">
            <p>Items: {items.length}</p>
            <p className="mt-1">Subtotal: USD {total.toFixed(2)}</p>
          </div>
        </section>

        <button type="submit" className="h-11 rounded-md btn-primary px-6 text-sm font-medium">Place order</button>
      </form>
    </div>
  );
}