# projekt-lp

## What This Is

_Describe what this project does and who it's for._

<!-- Update this as the project evolves -->

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Components:** ShadCN UI (all components pre-installed)
- **Forms:** React Hook Form + Zod
- **Charts:** Recharts

## Project Structure

```
src/
├── components/
│   ├── ui/           # ShadCN primitives (don't edit directly)
│   └── ...           # Your components
├── lib/
│   └── utils.ts      # Utilities (cn helper, etc.)
├── styles/
│   └── globals.css   # Tailwind + CSS variables
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## Conventions

- **Components:** Use ShadCN primitives from `src/components/ui/`
- **Styling:** Tailwind classes, CSS variables for theming
- **Imports:** Use `@/` alias (e.g., `@/components/ui/button`)

## Semantic Naming (Important for Visual Editing)

Blend's visual editor identifies elements by their component names. Follow these conventions for the best editing experience:

### Component Names
- **Always use meaningful PascalCase names:** `ProductCard`, `HeroSection`, `NavigationBar`
- **Never use generic names:** Avoid `Container`, `Wrapper`, `Box`, `Div`
- **Be specific:** `CheckoutButton` not `Button`, `UserAvatar` not `Avatar`

### Structural Elements
Add `data-blend-name` to key structural divs that aren't components:

```tsx
// Good - named structural elements
<div data-blend-name="ProductGrid" className="grid grid-cols-3 gap-4">
  <ProductCard />
</div>

// Bad - anonymous div
<div className="grid grid-cols-3 gap-4">
  <ProductCard />
</div>
```

### Naming Priority
The visual editor shows names in this priority:
1. React component name (best)
2. `data-blend-name` attribute
3. Semantic HTML (`<nav>`, `<header>`, `<main>`, `<button>`)
4. `aria-label` or `id`

### Examples

```tsx
// Good component naming
function HeroSection() { ... }
function ProductCard({ product }) { ... }
function CheckoutForm() { ... }
function UserProfileDropdown() { ... }

// Good structural naming
<main data-blend-name="MainContent">
  <section data-blend-name="FeaturedProducts">
    {products.map(p => <ProductCard key={p.id} product={p} />)}
  </section>
</main>
```

This ensures every element in the visual editor has a human-readable name instead of "div" or class names.

## Principles

See `.blend/tenets/` for product, design, and engineering principles that guide this project.

## Current State

_Keep this updated as you build. What's working? What's next?_

### Working
- [ ] Initial setup

### In Progress
- [ ] ...

### Next Up
- [ ] ...
