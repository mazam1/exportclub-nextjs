Icon Style Standardization

- Stroke width: 2px
- Color: #1A1A1A
- Size: 20px width/height
- Padding: `p-2` around all header icon buttons
- Rendering: `vector-effect: non-scaling-stroke`, `stroke-linecap: round`, `stroke-linejoin: round`

Locations

- Class and variable: `app/globals.css` at `app/globals.css:15` and `.header-icon` at `app/globals.css:104` and `app/globals.css:112`
- Header icons: `components/Header.tsx` at `components/Header.tsx:65`, `components/Header.tsx:71`, `components/Header.tsx:77`, `components/Header.tsx:84`, `components/Header.tsx:102`, `components/Header.tsx:144`

Before/After Comparison

- Search: 18px → 20px, stroke 1.5 → 2, color `text-tertiary` → `#1A1A1A`
- Wishlist: 18px → 20px, stroke 1.5 → 2, color `text-tertiary` → `#1A1A1A`
- Login: 18px → 20px, stroke 1.5 → 2, color `text-tertiary` → `#1A1A1A`
- Cart: 24px → 20px, stroke 1.5 → 2, color `text-tertiary` → `#1A1A1A`
- Hamburger: 24px → 20px, stroke 1.5 → 2, color `text-tertiary` → `#1A1A1A`
- Close: 20px unchanged, stroke 1.5 → 2, color `text-tertiary` → `#1A1A1A`

Testing

- Light background: `http://localhost:3005/` renders crisp icons at 20px
- Dark background: override `--background` and `--foreground` in `:root` then confirm icons remain legible with `#1A1A1A`