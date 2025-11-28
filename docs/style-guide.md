Style Guide — Color Specifications

- Core palette: `#000000` (Primary), `#FFFFFF` (Secondary), `#1A1A1A` (Tertiary), `#E5E5E5` (Line)
- Footer scheme: Background `#FFFFFF`, text `#000000`, links `#000000` across normal/hover/active/focus/visited. Footer icons use `currentColor` with default `#1A1A1A`, hover `#333333`, active `#000000`, with `transition: color 150ms ease`.
- Accessibility: Icon colors `#1A1A1A` and `#333333` on white meet WCAG AA (≥4.5:1). Black text on white provides a contrast ratio of 21:1.
- Implementation: Footer rules defined in `app/globals.css` and markup in `app/layout.tsx`