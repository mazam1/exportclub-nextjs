import { strict as assert } from "node:assert";
import { test } from "node:test";
import { buildTargetUrl } from "../components/ViewAllButton";

test("buildTargetUrl preserves query params", () => {
  const params = new URLSearchParams({ sort: "price-asc", q: "denim", size: "M" });
  const out = buildTargetUrl("/best-sellers", params);
  assert.equal(out, "/best-sellers?sort=price-asc&q=denim&size=M");
});

test("buildTargetUrl with empty params returns base href", () => {
  const params = new URLSearchParams("");
  const out = buildTargetUrl("/featured", params);
  assert.equal(out, "/featured");
});

test("New Arrivals: merges current params with target query", () => {
  const params = new URLSearchParams({ utm_source: "newsletter", size: "M" });
  const out = buildTargetUrl("/products?category=men", params);
  assert.equal(out, "/products?category=men&utm_source=newsletter&size=M");
});

test("Essentials: target query takes precedence over current", () => {
  const params = new URLSearchParams({ q: "summer", ref: "abc" });
  const out = buildTargetUrl("/products?category=men&q=basics", params);
  assert.equal(out, "/products?category=men&q=basics&ref=abc");
});