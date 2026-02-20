# Jewellery Shop - Project Rules

## Project Overview
Premium gold-focused jewellery e-commerce site. Products include gold, diamond, silver, platinum jewellery - rings, chains, necklaces, earrings, bracelets, bangles, and complete sets.

## Technology Stack
- **Runtime**: Bun (NOT npm, NOT pnpm, NOT yarn)
- **Language**: TypeScript (strict mode)
- **Framework**: React 19 with TanStack Start (full-stack)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Routing**: TanStack Router (file-based)
- **State Management**: TanStack Store / React Context
- **Animations**: Framer Motion
- **3D/Interactive**: Spline (for hero/product showcases)
- **UI Components**: Custom premium components + 21st.dev components

## Package Manager Rules
- ALWAYS use `bun` for all package operations
- `bun install` - install dependencies
- `bun add <pkg>` - add a package
- `bun run <script>` - run scripts
- `bun dev` - start dev server
- NEVER use npm, pnpm, or yarn commands

## Git Rules
- Do NOT add `Co-Authored-By: Claude` to commit messages
- Keep commit messages clean and descriptive

## Worktree Setup
```json
{
  "setup-worktree": ["bun install", "cp $ROOT_WORKTREE_PATH/.env .env"]
}
```

## Hosting
- **Current**: Netlify free tier (static site with serverless functions)
- **Future**: VPS or premium hosting (Vercel, Railway, etc.)
- Build output optimized for Netlify deployment
- Use Netlify Forms, Netlify Functions, and Netlify Edge Functions where applicable
- Netlify redirects via `_redirects` or `netlify.toml`

## Key Documentation
- `PRD.md` - Product Requirements Document (features, user stories, business goals)
- `TRD.md` - Technical Requirements Document (architecture, tech decisions, API design)
- `DESIGN.md` - Design system, typography, colors, component specs, UX patterns
- `RESEARCH-PREMIUM-JEWELLERY-ECOMMERCE.md` - Market research and competitor analysis

## Code Style
- Functional components with hooks (no class components)
- Named exports preferred
- Descriptive variable names (no abbreviations)
- Co-locate styles with components
- Use Tailwind utility classes; extract components for repeated patterns
- Responsive-first: mobile breakpoints before desktop
- Accessibility: semantic HTML, ARIA labels, keyboard navigation

## File Structure
```
src/
  routes/          # TanStack Router file-based routes
  components/      # Reusable UI components
    ui/            # Base design system components
    layout/        # Layout components (Header, Footer, etc.)
    product/       # Product-related components
    cart/          # Cart components
    checkout/      # Checkout flow components
  hooks/           # Custom React hooks
  lib/             # Utilities and helpers
  stores/          # TanStack Store state
  types/           # TypeScript types/interfaces
  assets/          # Static assets (images, icons, fonts)
  styles/          # Global styles and Tailwind config
```

## Performance Targets
- Lighthouse Performance: 90+
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1
- Bundle size: < 200KB initial JS
