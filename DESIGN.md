# Design System - Aurum
## Premium Gold Jewellery E-Commerce

### 1. Design Philosophy

**"Let the gold speak."**

The design serves as a stage for the jewellery - never competing, always elevating. Every pixel should whisper luxury while shouting trustworthiness. The aesthetic draws from high-end fashion editorial layouts, blending minimalism with warmth.

**Core Principles:**
1. **Product is hero** - White space and neutral tones frame the jewellery
2. **Trust through transparency** - Clear pricing, visible certifications, honest presentation
3. **Effortless elegance** - Smooth animations, refined typography, no visual clutter
4. **Sales through desire** - Lifestyle imagery, social proof, urgency cues that feel natural
5. **Mobile-first luxury** - Premium experience scales down flawlessly

### 2. Typography

#### Font Stack
| Usage | Font | Weight | Fallback |
|-------|------|--------|----------|
| **Brand / Headings** | Playfair Display | 400, 500, 600, 700 | Georgia, serif |
| **Body / UI** | Inter | 300, 400, 500, 600 | system-ui, sans-serif |
| **Accent / Quotes** | Cormorant Garamond | 300i, 400i | Georgia, serif |

#### Type Scale
```
Display:    48px / 56px line-height / -0.02em tracking  (Hero headlines)
H1:         36px / 44px line-height / -0.01em tracking  (Page titles)
H2:         28px / 36px line-height / 0 tracking        (Section titles)
H3:         22px / 30px line-height / 0 tracking        (Subsections)
H4:         18px / 26px line-height / 0.01em tracking   (Card titles)
Body:       16px / 26px line-height / 0 tracking        (Paragraph text)
Body SM:    14px / 22px line-height / 0 tracking        (Secondary text)
Caption:    12px / 18px line-height / 0.02em tracking   (Labels, hints)
Overline:   11px / 16px line-height / 0.1em tracking    (Category labels, uppercase)
```

#### Typography Rules
- Headings: Playfair Display, sentence case (not ALL CAPS except overline)
- Navigation: Inter Medium, uppercase, wide tracking (0.08em)
- Product names: Playfair Display 500
- Prices: Inter 600 (tabular numbers)
- Buttons: Inter 500, uppercase, tracking 0.05em
- Body text color: `#4A4A4A` (never pure black)

### 3. Color System

#### Primary Palette - "Classic Gold"
```
Background:
  --bg-primary:    #FFFFFF      White (main background)
  --bg-secondary:  #FAF8F5      Warm off-white (section alternation)
  --bg-tertiary:   #F5F0EB      Warm cream (cards, hover states)
  --bg-dark:       #1A1412      Deep espresso (hero sections, footer)
  --bg-overlay:    rgba(26,20,18,0.6)  Dark overlay for modals

Accent:
  --gold-primary:  #C9A050      Rich gold (primary CTA, highlights)
  --gold-light:    #D4B978      Light gold (hover states)
  --gold-dark:     #A07830      Dark gold (active states)
  --gold-muted:    #E8D5A8      Muted gold (backgrounds, badges)
  --gold-gradient: linear-gradient(135deg, #C9A050 0%, #E8D5A8 50%, #C9A050 100%)

Text:
  --text-primary:  #1A1412      Near-black (headings)
  --text-body:     #4A4A4A      Dark grey (body text)
  --text-muted:    #8A8A8A      Medium grey (secondary text)
  --text-light:    #B8B0A4      Warm grey (placeholders)
  --text-inverse:  #FFFFFF      White (on dark backgrounds)

Semantic:
  --success:       #2D7D46      Green (in stock, success)
  --warning:       #D4A017      Amber (low stock, alerts)
  --error:         #C53030      Red (errors, validation)
  --info:          #2B6CB0      Blue (informational)

Border:
  --border-light:  #E8E4DF      Light border
  --border-medium: #D4CFC8      Medium border
  --border-gold:   #C9A050      Gold border (emphasis)
```

### 4. Spacing & Layout

#### Spacing Scale (8px base)
```
--space-1:   4px    (tight internal padding)
--space-2:   8px    (icon gaps, tight spacing)
--space-3:   12px   (compact padding)
--space-4:   16px   (standard padding)
--space-5:   20px   (comfortable padding)
--space-6:   24px   (card padding)
--space-8:   32px   (section internal spacing)
--space-10:  40px   (component gaps)
--space-12:  48px   (section gaps mobile)
--space-16:  64px   (section gaps tablet)
--space-20:  80px   (section gaps desktop)
--space-24:  96px   (hero section padding)
--space-32:  128px  (major section dividers)
```

#### Layout Grid
```
Max content width:  1440px
Content padding:    16px (mobile) | 32px (tablet) | 64px (desktop)
Column gap:         16px (mobile) | 24px (tablet) | 32px (desktop)

Product grid:
  Mobile:  2 columns
  Tablet:  3 columns
  Desktop: 4 columns
  Wide:    4 columns (larger cards)

Image aspect ratios:
  Product cards:     1:1 (square)
  Hero images:       16:9 (desktop) | 4:5 (mobile)
  Lifestyle shots:   4:5 or 3:4
  Collection covers: 16:9
  Category cards:    3:4
```

#### Breakpoints
```
sm:   640px   (large phone landscape)
md:   768px   (tablet portrait)
lg:   1024px  (tablet landscape / small desktop)
xl:   1280px  (desktop)
2xl:  1536px  (wide desktop)
```

### 5. Component Design Specs

#### Buttons
```
Primary (Gold):
  Background: var(--gold-primary)
  Text: white
  Hover: var(--gold-dark) + slight scale(1.02)
  Active: var(--gold-dark) + scale(0.98)
  Height: 48px (default) | 40px (small) | 56px (large)
  Padding: 16px 32px
  Border-radius: 2px (sharp, luxury feel)
  Font: Inter 500, 14px, uppercase, tracking 0.05em
  Transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)

Secondary (Outline):
  Background: transparent
  Border: 1px solid var(--text-primary)
  Text: var(--text-primary)
  Hover: var(--text-primary) bg + white text
  Same sizing as primary

Ghost (Text):
  Background: transparent
  Text: var(--text-primary)
  Hover: underline
  No border
```

#### Product Cards
```
Container:
  Background: white
  Border: none (or 1px solid var(--border-light) on hover)
  Border-radius: 0 (sharp edges for premium feel)
  Overflow: hidden
  Transition: box-shadow 300ms ease

Hover state:
  Box-shadow: 0 8px 30px rgba(0,0,0,0.08)
  Image scale: 1.05 (smooth 500ms transition)
  "Quick View" button fades in over image
  Wishlist heart icon becomes visible

Image area:
  Aspect ratio: 1:1
  Object-fit: cover
  Background: var(--bg-secondary) (loading placeholder)

Info area:
  Padding: 16px
  Product name: Playfair Display 500, 16px
  Price: Inter 600, 16px, var(--text-primary)
  Original price (if discounted): Inter 400, 14px, line-through, var(--text-muted)
  Rating: 5 stars (filled gold, empty grey), 12px
  Category label: Overline style, var(--text-muted)
```

#### Navigation Header
```
Desktop:
  Height: 80px (scrolled: 64px with backdrop blur)
  Background: white (scrolled: rgba(255,255,255,0.95) + backdrop-blur)
  Position: sticky top
  Layout: Logo (left) | Nav links (center) | Actions (right)
  Nav links: Inter 500, 13px, uppercase, tracking 0.08em
  Gold rate display: Small badge in header with live rate
  Shadow on scroll: 0 1px 3px rgba(0,0,0,0.05)

Mobile:
  Height: 64px
  Logo centered
  Hamburger left, Cart + Search right
  Bottom nav bar: 56px fixed, 5 icons (Home, Shop, Search, Wishlist, Account)
```

#### Cart Drawer
```
Width: 420px (desktop) | 100vw (mobile)
Slide in from right
Backdrop: var(--bg-overlay)
Background: white
Header: "Your Cart (3 items)" + close button
Footer: Subtotal + "Checkout" button (sticky)
Item layout: Image (80x80) | Name + variant + price | Quantity controls
Upsell section: "Complete This Look" carousel at bottom
```

### 6. Animation Specifications

#### Page Transitions
```css
/* Route transitions */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 400ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Scroll Animations
```
Reveal on scroll:
  - Elements fade in + slide up 20px
  - Duration: 600ms
  - Easing: cubic-bezier(0.4, 0, 0.2, 1)
  - Stagger: 100ms between siblings
  - Trigger: When element enters 80% of viewport

Parallax:
  - Hero background: 0.5x scroll speed
  - Decorative elements: 0.3x scroll speed
  - Keep subtle; no jarring movement
```

#### Micro-interactions
```
Button hover:    scale(1.02), 200ms ease-out
Button press:    scale(0.98), 100ms ease-in
Card hover:      translateY(-4px) + shadow, 300ms ease
Image hover:     scale(1.05), 500ms ease
Heart toggle:    scale(1.3) → scale(1), 400ms spring
Add to cart:     Item flies to cart icon, 600ms cubic-bezier
Toast appear:    slideUp + fadeIn, 300ms ease-out
Modal open:      scaleY(0.95) → scaleY(1) + fadeIn, 250ms ease
Skeleton pulse:  opacity 0.4 → 1, 1.5s infinite ease-in-out
```

#### Performance Rules
```
- ONLY animate: transform, opacity, filter
- NEVER animate: width, height, top, left, margin, padding
- Use will-change sparingly (only during animation)
- Respect prefers-reduced-motion: disable all non-essential animations
- 60fps target: keep animations under 16ms per frame
```

### 7. Spline 3D Integration

#### Hero Section 3D Scene
```
Concept: Floating gold ring slowly rotating with particle effects
- Metallic gold material with realistic reflections
- Soft ambient lighting (warm tone)
- Subtle particle system (gold dust floating)
- Mouse parallax: ring tilts slightly following cursor
- Mobile: Static rendered image fallback (performance)
- Lazy load: Show hero image first, load Spline after interaction

Performance budget:
- Spline scene: < 2MB compressed
- Load only on desktop/tablet (> 768px)
- Intersection Observer: load when hero is in viewport
- Fallback: High-quality static image for mobile & slow connections
```

### 8. Page Layouts (Topology)

#### Homepage Layout
```
┌──────────────────────────────────────────┐
│  HEADER (Announcement bar + Nav)          │
├──────────────────────────────────────────┤
│  HERO (Full-screen Spline 3D / Video)     │
│  CTA: "Explore Collection" + "Shop Now"   │
├──────────────────────────────────────────┤
│  TRUST BAR (Hallmark | Free Shipping |    │
│  30-Day Returns | Lifetime Warranty)      │
├──────────────────────────────────────────┤
│  FEATURED CATEGORIES (4 cards grid)       │
│  [Rings] [Necklaces] [Earrings] [Bangles]│
├──────────────────────────────────────────┤
│  TRENDING NOW (Product carousel)          │
│  "What Everyone's Loving"                 │
├──────────────────────────────────────────┤
│  COLLECTION SPOTLIGHT (Editorial layout)  │
│  Image 60% | Text + CTA 40%              │
├──────────────────────────────────────────┤
│  COMPLETE THE LOOK (Set showcase)         │
│  Lifestyle image with shoppable hotspots  │
├──────────────────────────────────────────┤
│  TESTIMONIALS (Customer reviews carousel) │
│  Photo reviews with star ratings          │
├──────────────────────────────────────────┤
│  NEW ARRIVALS (Product grid 4-col)        │
├──────────────────────────────────────────┤
│  GOLD RATE + CALCULATOR (Interactive)     │
├──────────────────────────────────────────┤
│  NEWSLETTER (Email capture + 10% off)     │
├──────────────────────────────────────────┤
│  INSTAGRAM FEED (Shoppable gallery)       │
├──────────────────────────────────────────┤
│  FOOTER (Links, Contact, Social, Legal)   │
└──────────────────────────────────────────┘
```

#### Product Listing Page Layout
```
┌──────────────────────────────────────────┐
│  HEADER                                   │
├──────────────────────────────────────────┤
│  BREADCRUMB (Home > Category > Sub)       │
├──────────────────────────────────────────┤
│  CATEGORY HERO (Banner image + title)     │
├────────────┬─────────────────────────────┤
│  FILTERS   │  SORT BAR (count + sort)    │
│  (sidebar) ├─────────────────────────────┤
│            │  PRODUCT GRID               │
│  Metal     │  ┌────┬────┬────┬────┐      │
│  Purity    │  │    │    │    │    │      │
│  Price     │  ├────┼────┼────┼────┤      │
│  Weight    │  │    │    │    │    │      │
│  Occasion  │  ├────┼────┼────┼────┤      │
│  Style     │  │    │    │    │    │      │
│  Stone     │  └────┴────┴────┴────┘      │
│            │  LOAD MORE / Infinite scroll │
├────────────┴─────────────────────────────┤
│  RECENTLY VIEWED (Carousel)               │
├──────────────────────────────────────────┤
│  FOOTER                                   │
└──────────────────────────────────────────┘
```

#### Product Detail Page Layout
```
┌──────────────────────────────────────────┐
│  HEADER                                   │
├──────────────────────────────────────────┤
│  BREADCRUMB                               │
├────────────────────┬─────────────────────┤
│  IMAGE GALLERY     │  PRODUCT INFO        │
│                    │  Category overline    │
│  [Main image]      │  Product Name (H1)   │
│                    │  Rating + Reviews     │
│  [Thumbnails row]  │  Price + Breakdown    │
│                    │  Metal selector       │
│                    │  Size selector        │
│                    │  Quantity             │
│                    │  [ADD TO CART]        │
│                    │  [ADD TO WISHLIST]    │
│                    │  Stock status         │
│                    │  Delivery estimate    │
│                    │  Trust badges row     │
├────────────────────┴─────────────────────┤
│  TABS: Description | Specs | Reviews      │
├──────────────────────────────────────────┤
│  COMPLETE THE LOOK (Matching pieces)      │
├──────────────────────────────────────────┤
│  YOU MIGHT ALSO LIKE (Recommendations)    │
├──────────────────────────────────────────┤
│  CUSTOMERS ALSO BOUGHT                    │
├──────────────────────────────────────────┤
│  RECENTLY VIEWED                          │
├──────────────────────────────────────────┤
│  FOOTER                                   │
└──────────────────────────────────────────┘
```

### 9. Responsive Strategy

#### Mobile Adaptations
```
Header:    Simplified - logo center, hamburger left, cart right
           Sticky bottom nav replaces desktop nav
           Gold rate moves to announcement bar

Hero:      Vertical layout, 4:5 image ratio
           Static image instead of Spline 3D
           Single CTA button

Products:  2-column grid (equal width cards)
           Horizontal scroll for carousels
           Bottom sheet for filters
           Sticky "Add to Cart" at screen bottom

Cart:      Full-screen drawer
           Simplified upsell (horizontal scroll)

Checkout:  Single column, full width
           Digital wallets at top
           Large touch targets (48px min)
```

### 10. Iconography

```
Style: Line icons, 1.5px stroke, rounded caps
Size: 24px (default) | 20px (small) | 32px (large)
Color: Inherits text color
Library: Lucide React (consistent, tree-shakeable)

Custom icons needed:
- Gold hallmark badge
- Purity certificate
- Ring size guide
- Gold bar (for gold rate)
- Gift box
- Delivery truck
```

### 11. Image Guidelines

```
Product photography:
- White/off-white background (#FAF8F5)
- Consistent lighting (soft, warm)
- 5+ angles: front, side, back, detail, on-model
- Resolution: minimum 1600x1600px
- Format: WebP primary, JPEG fallback
- File size: < 200KB per image (optimized)

Lifestyle photography:
- Diverse models wearing pieces
- Natural settings (not studio)
- Warm, golden-hour lighting preferred
- Show scale and context

Hero/banner images:
- 2400x1200px (desktop)
- 1200x1500px (mobile)
- Dramatic lighting, cinematic feel
- Minimal text overlay area
```

### 12. Dark Mode Considerations

```
Not implementing for MVP.
Gold jewellery looks best on light backgrounds.
Dark sections used strategically (hero, footer, special collections).
Full dark mode is Phase 3+ consideration.
```
