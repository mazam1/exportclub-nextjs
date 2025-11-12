"use client";
import type { Size } from "@/lib/products";

export default function SizeSelector({
  sizes,
  value,
  onChange,
}: {
  sizes: Size[];
  value?: Size;
  onChange?: (s: Size) => void;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Select size</legend>
      <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Size selector">
        {sizes.map((s) => {
          const selected = value === s;
          return (
            <label key={s} className="inline-flex items-center">
              <input
                type="radio"
                name="size"
                value={s}
                checked={selected}
                onChange={() => onChange?.(s)}
                className="peer sr-only"
              />
              <span
                className="px-3 py-2 rounded-md border border-line text-sm cursor-pointer peer-checked:border-primary peer-checked:bg-muted"
              >
                {s}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}