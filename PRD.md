# Product Requirements Document (PRD)
## Aurum - Premium Gold Jewellery E-Commerce

### 1. Vision & Mission

**Vision**: Become the most trusted online destination for premium gold jewellery, where customers feel the luxury of a high-end boutique from their screens.

**Mission**: Solve the problems of physical jewellery shopping - limited inventory, price opacity, sales pressure - while eliminating online hesitations through exceptional product visualization, transparent pricing, and trust-building UX.

### 2. Business Goals

1. **Drive rapid sales** through urgency, social proof, and frictionless checkout
2. **Increase AOV by 25-40%** through "Complete the Look" set selling and smart recommendations
3. **Reduce cart abandonment** below 70% (industry average: 82.84%)
4. **Build trust** equivalent to in-store experience through certifications, guarantees, and transparency
5. **Capture repeat customers** through loyalty programs, wishlists, and personalized experiences

### 3. Target Audience

| Segment | Description | Key Needs |
|---------|-------------|-----------|
| **Primary** | Women 25-45, urban, middle-to-upper income | Daily wear gold, gifting, self-purchase |
| **Secondary** | Men 28-50 buying gifts | Easy selection, gift packaging, confidence in choice |
| **Tertiary** | Wedding/occasion shoppers | Complete sets, bridal collections, bulk value |
| **Aspirational** | Young professionals 22-30 | Lightweight/affordable gold, trendy designs |

### 4. Core Features (MVP - Phase 1)

#### 4.1 Homepage
- **Hero section**: Full-screen cinematic video/3D showcase with Spline integration
- **Value proposition**: Trust badges (BIS Hallmark, Purity Guarantee, Free Returns)
- **Featured collections**: Curated category cards with hover animations
- **Trending products**: Bestsellers carousel with "Trending" badges
- **Live gold rate**: Real-time gold price display in header
- **Social proof**: Customer testimonials with photo reviews
- **Newsletter signup**: First-purchase discount (10% off) for email capture
- **Instagram feed**: Shoppable social gallery

#### 4.2 Product Listing Pages (Category/Search)
- **Smart filters**: Metal type, purity, price range, weight, occasion, style, stone type
- **Sort options**: Price (low/high), popularity, newest, rating, weight
- **Product cards**: Image, name, price, rating, "Add to Wishlist" heart icon
- **Quick view**: Modal preview without leaving the page
- **Infinite scroll**: With skeleton loading states
- **"X products found"** counter with active filter chips

#### 4.3 Product Detail Pages
- **Image gallery**: 5+ high-res images with zoom, lifestyle shots
- **Price breakdown**: Gold weight x rate + making charges + GST (transparent)
- **Trust signals**: BIS Hallmark, Certificate of Authenticity, Purity Guarantee
- **Size guide**: Interactive ring/bangle size selector
- **"Complete the Look"**: Matching pieces from the same collection
- **"You Might Also Like"**: AI-powered similar product recommendations
- **"Customers Also Bought"**: Social proof recommendations
- **Customer reviews**: With photo uploads, star ratings, verified purchase badge
- **Share button**: WhatsApp, social media sharing
- **Sticky "Add to Cart"**: Always visible on mobile
- **Stock status**: "In Stock", "Only 3 left", "Made to Order"
- **Delivery estimate**: "Estimated delivery by [date]"

#### 4.4 Shopping Cart
- **Cart drawer**: Slide-out cart (no page navigation)
- **Quantity controls**: Update/remove items inline
- **"Complete This Look"**: Upsell matching pieces in cart
- **"Customers Also Bought"**: Cross-sell in cart
- **Price summary**: Subtotal, discount, shipping, total with breakdown
- **Promo code field**: Apply coupon codes
- **Cart reservation timer**: "Items reserved for 30 minutes"
- **Save for later**: Move items between cart and wishlist

#### 4.5 Checkout
- **Guest checkout**: No forced account creation
- **Progress indicator**: 3-step visual (Address > Payment > Confirmation)
- **Address auto-fill**: From browser/device
- **Multiple payment options**: Credit/Debit, UPI, Digital Wallets, EMI/BNPL, COD, Net Banking
- **EMI calculator**: Show monthly payment alongside full price
- **Order summary**: Persistent sidebar with product images
- **Trust badges**: SSL, secure payment, money-back guarantee near payment
- **Gift options**: Gift wrapping, personalized message card

#### 4.6 User Account
- **Order history**: Track all past orders with status
- **Wishlist**: Persistent wishlist with "Move to Cart" option
- **Recently viewed**: Last 15 items browsed
- **Saved addresses**: Multiple delivery addresses
- **Profile management**: Personal details, preferences
- **Price drop alerts**: Notifications for wishlisted items on sale

#### 4.7 Search
- **Instant search**: Results as you type with product thumbnails
- **Search suggestions**: Popular searches, trending items
- **Filters within search results**: Same filtering as category pages
- **"Did you mean?"**: Typo correction
- **Voice search**: Mobile voice input support
- **Visual search** (future): Upload an image to find similar pieces

### 5. Sales-Driving Features (Phase 2)

#### 5.1 Recommendation Engine
- "You Might Also Like" (similar style/price/category)
- "Complete the Look" (matching collection pieces)
- "Pair With" (complementary pieces from any collection)
- "Customers Also Bought" (purchase pattern-based)
- "Recently Viewed" (persistent across sessions)
- "Trending Now" (real-time popularity-based)
- "New Arrivals for You" (based on browsing history)

#### 5.2 Set & Collection Selling
- Dedicated "Sets & Collections" navigation category
- Bundle pricing with visible savings ("Save 15% as a set")
- "Shop the Look" shoppable lifestyle images with hotspots
- Interactive bundle builder tool
- Cart-page upselling for matching pieces
- Collection landing pages with artisan stories

#### 5.3 Urgency & Scarcity
- Stock countdown ("Only 3 left in stock")
- Viewer count ("15 people viewing this right now")
- Purchase history ("Bought 23 times this week")
- Flash sale countdown timer
- Cart reservation timer ("Reserved for 30 minutes")
- Seasonal urgency ("Order by [date] for [occasion] delivery")

#### 5.4 Social Proof
- Photo & video reviews from verified customers
- Real-time purchase notifications ("Sarah from Mumbai just bought...")
- Star ratings with review count on product cards
- Press mentions ("As featured in...")
- Purchase counter ("500+ happy customers")
- Staff picks and stylist recommendations

#### 5.5 Loyalty & Retention
- Points-based loyalty program
- Birthday rewards
- Referral program ("Give Rs 500, Get Rs 500")
- Early access to new collections for members
- Milestone rewards (3rd, 5th, 10th purchase)
- Free care services (cleaning, polishing)

### 6. Gold-Specific Features (Phase 2-3)

- **Live gold rate** in header (22K, 18K, 14K) updated every 30 minutes
- **Gold price calculator** tool
- **Price lock**: Lock price for 30 minutes after adding to cart
- **Price breakdown**: Gold value + making charges + stones + GST
- **BIS Hallmark** verification per product
- **Certificate of Authenticity** downloadable PDF
- **Gold exchange program** (future): Trade old gold for new
- **Digital gold** (future): Buy gold by value, convert to jewellery later

### 7. Content & SEO

- **Blog**: Jewellery care guides, styling tips, trend reports, gold investment guides
- **Gift guide**: Filterable by occasion, recipient, budget
- **Jewellery education**: Gold purity guide, diamond 4Cs, ring sizing
- **About us**: Brand story, craftsmanship, sourcing ethics
- **FAQ**: Comprehensive with search
- **SEO**: Schema markup, meta tags, sitemap, Open Graph tags

### 8. Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Page load time | < 3 seconds on 4G |
| Mobile responsiveness | All features work on 320px+ |
| Browser support | Chrome, Safari, Firefox, Edge (last 2 versions) |
| Accessibility | WCAG 2.1 AA compliance |
| Security | HTTPS, PCI-DSS for payments, XSS/CSRF protection |
| Uptime | 99.9% |
| Image optimization | WebP with JPEG fallback, lazy loading |
| SEO | Lighthouse SEO score 90+ |

### 9. Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Conversion Rate | 2-4% | Orders / Visitors |
| Cart Abandonment | < 70% | Abandoned / Started checkouts |
| Average Order Value | +25% YoY | Revenue / Orders |
| Repeat Purchase Rate | 30%+ | Returning / Total customers |
| Mobile Conversion | 80% of desktop rate | Mobile orders / Mobile visitors |
| NPS Score | 60+ | Customer surveys |
| Page Load Time | < 3s | Lighthouse / Core Web Vitals |

### 10. Phases & Timeline

| Phase | Focus | Key Deliverables |
|-------|-------|-----------------|
| **Phase 1: MVP** | Core shopping experience | Homepage, PLP, PDP, Cart, Checkout, Search, Account |
| **Phase 2: Growth** | Sales acceleration | Recommendations, Sets, Reviews, Cart Recovery, Loyalty |
| **Phase 3: Scale** | Advanced features | 360 views, AR try-on, AI recommendations, Gold calculator |
| **Phase 4: Ecosystem** | Platform features | Digital gold, Exchange program, Custom design, International |
