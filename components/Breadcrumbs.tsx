import Link from "next/link";

export default function Breadcrumbs({
  items,
  align = "left",
}: {
  items: { label: string; href?: string }[];
  align?: "left" | "center" | "right";
}) {
  const justifyClass =
    align === "right" ? "justify-end" : align === "center" ? "justify-center" : "justify-start";
  const textClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

  return (
    <nav aria-label="Breadcrumb" className={`text-sm w-full ${textClass}`}>
      <ol className={`flex flex-wrap items-center gap-1 text-tertiary ${justifyClass}`}>
        {items.map((item, idx) => (
          <li key={idx} className="inline-flex items-center gap-1">
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && <span aria-hidden>›</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}