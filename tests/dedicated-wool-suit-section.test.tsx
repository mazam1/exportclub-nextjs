import { test } from "node:test";
import { strict as assert } from "node:assert";
import { getAllProducts, getProductBySlug } from "../lib/products";
import type { Product } from "../lib/products";

test("tailored wool suit jacket product exists", () => {
  const p = getProductBySlug("tailored-wool-suit-jacket");
  assert.ok(p, "Product should be present");
  assert.equal(p?.name, "Tailored Wool Suit Jacket");
  assert.equal(p?.category, "men");
});

test("premium supima tee product exists", () => {
  const p = getProductBySlug("premium-supima-tee-unisex");
  assert.ok(p, "Product should be present");
  assert.equal(p?.name, "Premium Supima Tee");
  assert.equal(p?.category, "unisex");
});

test("cotton oxford shirt product exists", () => {
  const p = getProductBySlug("cotton-oxford-shirt-men");
  assert.ok(p, "Product should be present");
  assert.equal(p?.name, "Essential Cotton Oxford Shirt");
  assert.equal(p?.category, "men");
});

test("silk blend lounge shirt product exists", () => {
  const p = getProductBySlug("silk-blend-lounge-shirt");
  assert.ok(p, "Product should be present");
  assert.equal(p?.name, "Silk-Blend Lounge Shirt");
  assert.equal(p?.category, "women");
});