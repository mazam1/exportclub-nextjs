import { strict as assert } from "node:assert";
import { test } from "node:test";
import { getAllProducts, getProductBySlug } from "../lib/products";

test("new essential product exists", () => {
  const p = getProductBySlug("cotton-oxford-shirt-men");
  assert.ok(p, "Product should be present");
});

test("description length is 150–200 words", () => {
  const p = getProductBySlug("cotton-oxford-shirt-men")!;
  const words = p.description.trim().split(/\s+/);
  assert.ok(words.length >= 150 && words.length <= 200, `Expected 150–200 words, got ${words.length}`);
});

test("images are high‑quality with alt text", () => {
  const p = getProductBySlug("cotton-oxford-shirt-men")!;
  assert.ok(p.images.length >= 2, "Expected at least two images");
  for (const img of p.images) {
    assert.ok(img.alt && img.alt.length > 0, "Image alt text must be present");
    const match = img.url.match(/\bw=(\d+)/);
    assert.ok(match && Number(match[1]) >= 1000, "Image width should be >= 1000px");
  }
});

test("categorized and tagged for essentials", () => {
  const all = getAllProducts();
  const menAll = all.filter((p) => p.category === "men" || p.category === "unisex");
  const essentialTags = ["basics", "tee", "denim", "jeans", "coat", "trench"];
  const essentials = menAll.filter((p) => p.tags.some((t) => essentialTags.includes(t)));
  assert.ok(essentials.some((p) => p.slug === "cotton-oxford-shirt-men"), "Product should appear in Essentials");
});

test("appears on Shirts page by synonyms logic", () => {
  const p = getProductBySlug("cotton-oxford-shirt-men")!;
  const synonyms = ["shirt", "tee", "t-shirt", "top"]; // mirrors app/shirts/page.tsx
  const v = (p.name + " " + p.description).toLowerCase();
  const nameOrDescHit = synonyms.some((s) => v.includes(s.toLowerCase()));
  const tagHit = p.tags.some((t) => synonyms.map((s) => s.toLowerCase()).includes(t.toLowerCase()));
  assert.ok(nameOrDescHit || tagHit, "Product should match Shirts synonyms");
});

test("pricing and stock set", () => {
  const p = getProductBySlug("cotton-oxford-shirt-men")!;
  assert.ok(p.price > 0 && p.stock > 0, "Price and stock should be positive");
});