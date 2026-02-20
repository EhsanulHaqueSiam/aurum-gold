# Technical Requirements Document (TRD)
## Aurum - Premium Gold Jewellery E-Commerce

### 1. Technology Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Runtime** | Bun | Fast JS runtime, built-in bundler, native TypeScript |
| **Language** | TypeScript (strict) | Type safety, better DX, fewer runtime errors |
| **Framework** | React 19 | Latest features, server components ready |
| **Meta-Framework** | TanStack Start | Full-stack React, file-based routing, SSR/SSG |
| **Build Tool** | Vite | Fast HMR, optimized builds, plugin ecosystem |
| **Router** | TanStack Router | Type-safe routing, file-based, search params |
| **Styling** | Tailwind CSS v4 | Utility-first, design tokens, JIT compilation |
| **Animations** | Framer Motion | Declarative animations, gestures, layout animations |
| **3D/Interactive** | Spline | 3D product showcases, interactive hero scenes |
| **Icons** | Lucide React | Consistent, tree-shakeable icon set |
| **Forms** | TanStack Form | Type-safe form handling with validation |
| **Data Fetching** | TanStack Query | Caching, background updates, optimistic UI |
| **State** | Zustand | Lightweight global state (cart, auth, preferences) |
| **Image Optimization** | Sharp + WebP | Server-side image processing |
| **Linting** | ESLint + Prettier | Code quality and formatting |
| **Testing** | Vitest + Playwright | Unit/integration + E2E testing |

### 2. Architecture

#### 2.1 Application Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │ React   │  │ TanStack │  │ Zustand  │  │ Framer      │  │
│  │ 19      │  │ Router   │  │ Store    │  │ Motion      │  │
│  └─────────┘  └──────────┘  └──────────┘  └─────────────┘  │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌─────────────┐  │
│  │TanStack │  │ Tailwind │  │ Spline   │  │ Service     │  │
│  │ Query   │  │ CSS v4   │  │ Runtime  │  │ Worker      │  │
│  └─────────┘  └──────────┘  └──────────┘  └─────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS / API Calls
┌────────────────────────┴────────────────────────────────────┐
│                   TanStack Start Server                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Server       │  │ API Routes   │  │ Server Functions  │  │
│  │ Rendering    │  │ (REST)       │  │ (RPC)            │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Netlify Infrastructure                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Static   │  │ Netlify  │  │ Edge     │  │ Netlify    │ │
│  │ Assets   │  │ Functions│  │ Functions│  │ Forms      │ │
│  │ (CDN)    │  │ (Lambda) │  │          │  │            │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   External Services                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐ │
│  │ Payment  │  │ Email    │  │ CDN      │  │ Analytics  │ │
│  │ Gateway  │  │ Service  │  │ (Images) │  │            │ │
│  └──────────┘  └──────────┘  └──────────┘  └────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### 2.2 Data Flow
```
User Action → React Component → TanStack Query/Zustand
    → Server Function (TanStack Start) → External API/DB
    → Response → Cache Update → UI Re-render
```

#### 2.3 State Management Strategy
| State Type | Solution | Examples |
|-----------|----------|----------|
| Server state | TanStack Query | Products, reviews, gold rates |
| Client global | Zustand | Cart, auth, user preferences |
| URL state | TanStack Router search params | Filters, sort, pagination |
| Form state | TanStack Form | Checkout, contact, review forms |
| UI state | React useState/useReducer | Modals, dropdowns, tabs |

### 3. Project Structure
```
jewellery-shop/
├── CLAUDE.md                    # Project rules & conventions
├── PRD.md                       # Product requirements
├── TRD.md                       # Technical requirements
├── DESIGN.md                    # Design system & specs
├── RESEARCH-PREMIUM-JEWELLERY-ECOMMERCE.md
├── package.json
├── bun.lock
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── netlify.toml                 # Netlify deployment config
├── public/
│   ├── fonts/                   # Self-hosted premium fonts
│   ├── images/                  # Static images
│   ├── _redirects               # Netlify redirects
│   └── favicon.ico
├── src/
│   ├── entry-client.tsx         # Client entry point
│   ├── entry-server.tsx         # Server entry point
│   ├── router.tsx               # TanStack Router config
│   ├── routeTree.gen.ts         # Auto-generated route tree
│   ├── routes/
│   │   ├── __root.tsx           # Root layout
│   │   ├── index.tsx            # Homepage
│   │   ├── shop/
│   │   │   ├── index.tsx        # All products
│   │   │   ├── $category.tsx    # Category page
│   │   │   └── $productSlug.tsx # Product detail page
│   │   ├── collections/
│   │   │   ├── index.tsx        # All collections
│   │   │   └── $collectionSlug.tsx
│   │   ├── sets/
│   │   │   └── index.tsx        # Sets & bundles
│   │   ├── search.tsx           # Search results
│   │   ├── cart.tsx             # Cart page
│   │   ├── checkout/
│   │   │   ├── index.tsx        # Checkout flow
│   │   │   └── confirmation.tsx # Order confirmation
│   │   ├── account/
│   │   │   ├── index.tsx        # Account dashboard
│   │   │   ├── orders.tsx       # Order history
│   │   │   ├── wishlist.tsx     # Wishlist
│   │   │   └── settings.tsx     # Account settings
│   │   ├── about.tsx            # About us
│   │   ├── contact.tsx          # Contact page
│   │   ├── blog/
│   │   │   ├── index.tsx        # Blog listing
│   │   │   └── $slug.tsx        # Blog post
│   │   └── pages/
│   │       ├── faq.tsx          # FAQ
│   │       ├── shipping.tsx     # Shipping policy
│   │       ├── returns.tsx      # Returns policy
│   │       └── privacy.tsx      # Privacy policy
│   ├── components/
│   │   ├── ui/                  # Base design system
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Drawer.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Nav, search, gold rate, cart
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx    # Bottom navigation bar
│   │   │   ├── Sidebar.tsx
│   │   │   └── Container.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   ├── ProductInfo.tsx
│   │   │   ├── PriceBreakdown.tsx
│   │   │   ├── SizeGuide.tsx
│   │   │   ├── QuickView.tsx
│   │   │   └── ProductReviews.tsx
│   │   ├── recommendations/
│   │   │   ├── CompleteTheLook.tsx
│   │   │   ├── YouMightLike.tsx
│   │   │   ├── TrendingNow.tsx
│   │   │   ├── RecentlyViewed.tsx
│   │   │   └── CustomersAlsoBought.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   └── CartUpsell.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── PaymentMethods.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   └── GiftOptions.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturedCollections.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── NewsletterSignup.tsx
│   │   │   └── InstagramFeed.tsx
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── FilterPanel.tsx
│   │   └── shared/
│   │       ├── GoldRateDisplay.tsx
│   │       ├── WishlistButton.tsx
│   │       ├── ShareButton.tsx
│   │       ├── StockStatus.tsx
│   │       ├── RatingStars.tsx
│   │       └── SocialProof.tsx
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useWishlist.ts
│   │   ├── useSearch.ts
│   │   ├── useGoldRate.ts
│   │   ├── useRecentlyViewed.ts
│   │   ├── useMediaQuery.ts
│   │   └── useScrollAnimation.ts
│   ├── stores/
│   │   ├── cartStore.ts
│   │   ├── authStore.ts
│   │   ├── wishlistStore.ts
│   │   └── uiStore.ts
│   ├── lib/
│   │   ├── utils.ts             # Utility functions
│   │   ├── formatters.ts        # Price, weight formatters
│   │   ├── validators.ts        # Form validation
│   │   ├── constants.ts         # App constants
│   │   ├── api.ts               # API client
│   │   └── seo.ts               # SEO helpers
│   ├── types/
│   │   ├── product.ts
│   │   ├── cart.ts
│   │   ├── user.ts
│   │   ├── order.ts
│   │   └── common.ts
│   ├── data/
│   │   ├── products.ts          # Mock product data (MVP)
│   │   ├── collections.ts       # Collection data
│   │   ├── categories.ts        # Category definitions
│   │   ├── testimonials.ts      # Customer testimonials
│   │   └── navigation.ts        # Nav menu structure
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   └── styles/
│       └── globals.css          # Global styles, font imports
├── netlify/
│   └── functions/               # Netlify serverless functions
│       ├── contact.ts           # Contact form handler
│       └── newsletter.ts        # Newsletter signup
└── tests/
    ├── unit/
    ├── integration/
    └── e2e/
```

### 4. Routing Strategy

| Route | Page | SSR/SSG |
|-------|------|---------|
| `/` | Homepage | SSG (revalidate hourly) |
| `/shop` | All products listing | SSR |
| `/shop/:category` | Category listing | SSR |
| `/shop/:category/:productSlug` | Product detail | SSR |
| `/collections` | Collections overview | SSG |
| `/collections/:slug` | Collection detail | SSR |
| `/sets` | Sets & bundles | SSR |
| `/search?q=` | Search results | SSR |
| `/cart` | Shopping cart | CSR |
| `/checkout` | Checkout flow | CSR |
| `/checkout/confirmation` | Order confirmation | CSR |
| `/account` | Account dashboard | CSR (auth required) |
| `/account/orders` | Order history | CSR (auth required) |
| `/account/wishlist` | Wishlist | CSR (auth required) |
| `/about` | About us | SSG |
| `/contact` | Contact | SSG |
| `/blog` | Blog listing | SSG |
| `/blog/:slug` | Blog post | SSG |
| `/faq` | FAQ | SSG |

### 5. Netlify Deployment Configuration

```toml
# netlify.toml
[build]
  command = "bun run build"
  publish = ".output/public"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"
  BUN_VERSION = "1"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  conditions = {Role = ["admin"]}

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 6. Performance Strategy

#### Image Optimization
- WebP format with JPEG fallback
- Responsive images via `srcset` and `sizes`
- Lazy loading below the fold
- Blur placeholder (LQIP) for progressive loading
- Product images: 800px (mobile), 1200px (tablet), 1600px (desktop)

#### Bundle Optimization
- Code splitting per route (automatic with TanStack Router)
- Dynamic imports for heavy components (Spline, modals)
- Tree shaking unused code
- Preload critical routes
- Font subsetting for custom fonts

#### Caching Strategy
- Static assets: 1 year cache with content hash
- HTML: no-cache, must-revalidate
- API responses: SWR with TanStack Query (stale: 5min, cache: 30min)
- Product data: Cache with revalidation on gold rate change
- Images: CDN with long cache

### 7. SEO Implementation

- Server-side rendering for product and category pages
- Structured data (JSON-LD): Product, BreadcrumbList, Organization, Review
- Open Graph and Twitter Card meta tags
- Dynamic sitemap generation
- Canonical URLs
- robots.txt
- Image alt tags with product descriptions
- Schema markup for gold price, availability, ratings

### 8. Security

- HTTPS everywhere (Netlify default)
- Content Security Policy headers
- XSS protection via React's built-in escaping
- CSRF tokens for forms
- Input sanitization on server functions
- Rate limiting on API endpoints (Netlify Edge)
- Secure payment gateway integration (no card data stored)
- Environment variables for secrets (Netlify env vars)

### 9. Accessibility (WCAG 2.1 AA)

- Semantic HTML structure
- Keyboard navigation support
- Focus management for modals and drawers
- ARIA labels for interactive elements
- Color contrast ratios meeting AA standards
- Screen reader compatible
- `prefers-reduced-motion` support
- Skip navigation link
- Alt text for all images

### 10. Third-Party Integrations (Future)

| Service | Purpose | Phase |
|---------|---------|-------|
| Stripe/Razorpay | Payment processing | Phase 1 |
| SendGrid/Resend | Transactional emails | Phase 1 |
| Google Analytics 4 | Analytics | Phase 1 |
| Algolia/Meilisearch | Search | Phase 2 |
| Cloudinary | Image CDN & optimization | Phase 2 |
| Intercom/Crisp | Live chat | Phase 2 |
| Judge.me | Product reviews | Phase 2 |
| Gold API | Live gold rates | Phase 2 |
