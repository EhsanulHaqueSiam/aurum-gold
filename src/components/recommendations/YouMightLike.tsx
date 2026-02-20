import { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { getRelatedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/layout/Container";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface YouMightLikeProps {
  productId: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function YouMightLike({ productId }: YouMightLikeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const products = useMemo(
    () => getRelatedProducts(productId),
    [productId],
  );

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
            You Might Also Like
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Hand-picked pieces based on your taste
          </p>
        </motion.div>

        {/* ── Desktop: 4-column grid ─────────────────────────── */}
        <div className="hidden md:grid md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: horizontal scrollable row ──────────────── */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 md:hidden">
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
              className="flex-shrink-0 w-[200px]"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

YouMightLike.displayName = "YouMightLike";

export { YouMightLike };
