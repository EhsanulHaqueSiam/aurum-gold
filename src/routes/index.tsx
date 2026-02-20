import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Award,
  ShoppingBag,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { CollectionSpotlight } from "@/components/home/CollectionSpotlight";
import { Testimonials } from "@/components/home/Testimonials";
import { NewsletterSignup } from "@/components/home/NewsletterSignup";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ProductCard } from "@/components/product/ProductCard";
import { GoldRateDisplay } from "@/components/shared/GoldRateDisplay";
import { Container } from "@/components/layout/Container";
import {
  products,
  getTrendingProducts,
  getNewArrivals,
  getCompleteTheLook,
} from "@/data/products";

/* ═══════════════════════════════════════════════════════════
   INLINE UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════ */

/* ─── Section Header ─────────────────────────────────────── */

function SectionHeader({
  overline,
  title,
  subtitle,
  light = false,
}: {
  overline: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-12 text-center md:mb-16"
    >
      <span
        className={cn(
          "overline mb-3 block tracking-[0.2em]",
          light ? "text-gold-light" : "text-gold",
        )}
      >
        {overline}
      </span>
      <h2
        className={cn(
          "font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl",
          light ? "text-white" : "text-text-primary",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-4 max-w-lg font-accent text-lg italic",
            light ? "text-text-light/70" : "text-text-muted",
          )}
        >
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-6 h-px w-16 bg-gold" />
    </motion.div>
  );
}

/* ─── Gold Ornamental Divider ────────────────────────────── */

function GoldDivider() {
  return (
    <div className="flex items-center justify-center py-6 md:py-8">
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gold/40 md:max-w-[200px]" />
      <div className="mx-4 h-2.5 w-2.5 rotate-45 border border-gold/50 bg-gold/10" />
      <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gold/40 md:max-w-[200px]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRUST STRIP
   ═══════════════════════════════════════════════════════════ */

const trustItems = [
  { icon: Shield, label: "BIS Hallmark Certified" },
  { icon: Truck, label: "Free Insured Shipping" },
  { icon: RotateCcw, label: "30-Day Free Returns" },
  { icon: Award, label: "Lifetime Warranty" },
];

function TrustStrip() {
  return (
    <div className="border-t border-gold/15 bg-bg-dark">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center justify-center py-5"
        >
          <div className="flex flex-wrap items-center justify-center gap-y-3">
            {trustItems.map((item, i) => (
              <div key={item.label} className="flex items-center">
                {i > 0 && (
                  <div className="mx-4 hidden h-4 w-px bg-gold/20 sm:block md:mx-6" />
                )}
                <div className="flex items-center gap-2.5 px-2">
                  <item.icon className="size-3.5 text-gold/70" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium tracking-[0.08em] text-white/45">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TRENDING SECTION (DARK)
   ═══════════════════════════════════════════════════════════ */

function TrendingSection({ products: trendingProducts }: { products: ReturnType<typeof getTrendingProducts> }) {
  return (
    <section className="relative overflow-hidden bg-bg-dark py-20 md:py-28">
      {/* Grain overlay */}
      <div className="grain-overlay absolute inset-0 pointer-events-none" />

      {/* Subtle ambient glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 h-[1px] w-2/3"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(201,160,80,0.3), transparent)",
        }}
      />

      <Container className="relative z-10">
        <SectionHeader
          overline="What Everyone's Loving"
          title="Trending Now"
          light
        />

        {/* Product Grid - 4 cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8"
        >
          {trendingProducts.slice(0, 4).map((product) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/shop"
            search={{ sort: "popularity" }}
            className="group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gold-light transition-colors duration-300 hover:text-gold-muted"
          >
            <span className="relative">
              View All Trending
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gold/30 transition-colors duration-300 group-hover:bg-gold" />
            </span>
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   COMPLETE THE LOOK SECTION
   ═══════════════════════════════════════════════════════════ */

function CompleteTheLookSection() {
  const heroProduct = products[0];
  const lookProducts = getCompleteTheLook(heroProduct.id);

  if (lookProducts.length === 0) return null;

  const pairedItems = lookProducts.slice(0, 3);

  return (
    <section className="bg-bg-secondary py-20 md:py-28">
      <Container>
        <SectionHeader
          overline="Style It Your Way"
          title="Complete the Look"
          subtitle="Curated sets designed to be worn together"
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-5 lg:gap-10">
          {/* Main Product - 60% */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <Link
              to="/shop/$slug"
              params={{ slug: heroProduct.slug }}
              className="group relative block overflow-hidden rounded-sm"
            >
              <div className="relative">
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/85 via-bg-dark/20 to-transparent" />

                {/* Product info */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p className="overline mb-2 text-gold-light">
                    {heroProduct.category}
                  </p>
                  <h3 className="font-display text-xl font-semibold text-white md:text-2xl lg:text-3xl">
                    {heroProduct.name}
                  </h3>
                  <p className="mt-2 text-sm font-semibold tabular-nums text-white/75">
                    {formatPrice(heroProduct.price)}
                  </p>

                  {/* Gold underline on hover */}
                  <div className="mt-4 h-px w-0 bg-gold transition-all duration-500 group-hover:w-24" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Matching pieces - stacked on right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            <p className="mb-2 text-sm text-text-muted">
              Pair with these curated pieces for a complete ensemble.
            </p>

            {/* Stacked product cards */}
            {pairedItems.map((product, i) => (
              <Link
                key={product.id}
                to="/shop/$slug"
                params={{ slug: product.slug }}
                className="group flex items-center gap-4 rounded-sm border border-border-light bg-white p-3 transition-all duration-300 hover:border-gold/30 hover:shadow-sm"
              >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-bg-tertiary">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="overline mb-0.5">{product.category}</p>
                  <h4 className="line-clamp-1 font-display text-sm font-medium text-text-primary">
                    {product.name}
                  </h4>
                  <p className="mt-0.5 text-sm font-semibold tabular-nums text-text-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <ArrowRight className="size-4 flex-shrink-0 text-text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-gold" />
              </Link>
            ))}

            {/* Add Set to Cart CTA */}
            <button
              className={cn(
                "mt-2 flex items-center justify-center gap-2.5",
                "h-12 w-full rounded-sm",
                "bg-gold text-white",
                "text-[13px] font-medium uppercase tracking-[0.12em]",
                "transition-all duration-400",
                "hover:bg-gold-dark hover:shadow-[0_0_24px_rgba(201,160,80,0.2)]",
              )}
            >
              <ShoppingBag className="size-4" />
              Add Set to Cart
            </button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   NEW ARRIVALS SECTION
   ═══════════════════════════════════════════════════════════ */

function NewArrivalsSection({ products: newProducts }: { products: ReturnType<typeof getNewArrivals> }) {
  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <SectionHeader overline="Just Landed" title="New Arrivals" />

        <ProductGrid products={newProducts.slice(0, 4)} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex justify-center"
        >
          <Link
            to="/shop"
            search={{ sort: "newest" }}
            className={cn(
              "group inline-flex items-center gap-2",
              "text-sm font-medium uppercase tracking-wider text-text-primary",
              "transition-colors duration-300 hover:text-gold",
            )}
          >
            View All New Arrivals
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   GOLD RATE SECTION
   ═══════════════════════════════════════════════════════════ */

function GoldRateSection() {
  return (
    <section className="bg-bg-secondary py-16 md:py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <GoldRateDisplay />
        </motion.div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE COMPOSITION
   ═══════════════════════════════════════════════════════════ */

function HomePage() {
  const trendingProducts = getTrendingProducts();
  const newArrivals = getNewArrivals();

  useEffect(() => {
    document.title =
      "Aurum | Where Gold Becomes Art - Premium BIS Hallmarked Jewellery";
  }, []);

  return (
    <>
      {/* 1. Hero (dark bg) */}
      <HeroSection />

      {/* 2. Trust strip (dark bg, thin, transitions from hero) */}
      <TrustStrip />

      {/* 3. Gold ornamental divider (dark-to-light transition) */}
      <GoldDivider />

      {/* 4. Featured Categories (warm bg) */}
      <FeaturedCategories />

      {/* 5. Trending Now (dark bg with grain) */}
      <TrendingSection products={trendingProducts} />

      {/* 6. Collection Spotlight (alternating warm/dark full-width spreads) */}
      <CollectionSpotlight />

      {/* 7. Complete the Look (warm bg) */}
      <CompleteTheLookSection />

      {/* Gold divider between light sections */}
      <GoldDivider />

      {/* 8. Testimonials (warm bg) */}
      <Testimonials />

      {/* Gold divider between light sections */}
      <GoldDivider />

      {/* 9. New Arrivals (white bg) */}
      <NewArrivalsSection products={newArrivals} />

      {/* Gold divider before gold rate */}
      <GoldDivider />

      {/* 10. Gold Rate Display */}
      <GoldRateSection />

      {/* 11. Newsletter (dark bg) */}
      <NewsletterSignup />
    </>
  );
}

/* ─── Route Export ───────────────────────────────────────── */

export const Route = createFileRoute("/")({
  component: HomePage,
});
