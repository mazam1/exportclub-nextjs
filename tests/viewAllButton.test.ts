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