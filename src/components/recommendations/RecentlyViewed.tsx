import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/layout/Container";

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function RecentlyViewed() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { products } = useRecentlyViewed();

  // Only render if there are items to show
  if (products.length === 0) return null;

  return (
    <section ref={ref} className="py-12 md:py-16">
      <Container>
        {/* ── Section Heading ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">
            Recently Viewed
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Pick up where you left off
          </p>
        </motion.div>

        {/* ── Horizontal scrollable row ───────────────────────── */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="flex-shrink-0 w-[200px] md:w-[240px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

RecentlyViewed.displayName = "RecentlyViewed";

export { RecentlyViewed };
