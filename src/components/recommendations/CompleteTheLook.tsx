import { useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, ShoppingBag, Sparkles } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { getCompleteTheLook } from "@/data/products";
import { useCartStore } from "@/stores/cartStore";
import { Container } from "@/components/layout/Container";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface CompleteTheLookProps {
  productId: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function CompleteTheLook({ productId }: CompleteTheLookProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const addItem = useCartStore((s) => s.addItem);

  const products = useMemo(
    () => getCompleteTheLook(productId),
    [productId],
  );

  /* ── Set savings calculation ──────────────────────────────── */

  const totalIndividual = useMemo(
    () => products.reduce((sum, p) => sum + p.price, 0),
    [products],
  );

  // Simulate a 5% set discount for "buy together" incentive
  const setDiscount = 5;
  const setPrice = Math.round(totalIndividual * (1 - setDiscount / 100));
  const savings = totalIndividual - setPrice;

  const handleAddAll = () => {
    products.forEach((p) => addItem(p, 1));
  };

  if (products.length === 0) return null;

  /* ── Animation variants ────────────────────────────────────── */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section ref={ref} className="py-12 md:py-16 bg-bg-secondary/50">
      <Container>
        {/* ── Section Heading ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-text-primary">
            Complete the Look
          </h2>
          <p className="mt-1 text-sm text-text-muted">
            Matching pieces from this collection
          </p>
        </motion.div>

        {/* ── Product Row ─────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="flex-shrink-0 w-[200px] md:w-[240px] rounded-sm border border-border-light bg-bg-primary overflow-hidden group"
            >
              {/* Image */}
              <OptimizedImage
                src={product.images[0]}
                alt={product.name}
                aspect="aspect-square"
                darkBg
                shimmer
                fadeDuration={0.5}
                className="transition-transform duration-500 group-hover:scale-105"
              />

              {/* Info */}
              <div className="p-3 space-y-2">
                <p className="overline text-[10px]">
                  {product.category}
                </p>
                <h4 className="font-display text-sm font-medium text-text-primary truncate">
                  {product.name}
                </h4>
                <p className="text-sm font-semibold text-text-primary tabular-nums">
                  {formatPrice(product.price)}
                </p>

                <button
                  type="button"
                  onClick={() => addItem(product, 1)}
                  className={cn(
                    "flex w-full items-center justify-center gap-1.5 rounded-sm py-2.5",
                    "bg-bg-dark text-white text-xs font-medium uppercase tracking-wider",
                    "transition-colors duration-200 hover:bg-gold",
                  )}
                >
                  <Plus className="size-3.5" />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}

          {/* ── Add All Card ──────────────────────────────────── */}
          <motion.div
            variants={itemVariants}
            className="flex-shrink-0 w-[200px] md:w-[240px] rounded-sm border border-dashed border-gold/40 bg-gold/5 overflow-hidden flex flex-col items-center justify-center px-4 py-8 text-center"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
              <Sparkles className="size-5 text-gold" />
            </div>

            <p className="font-display text-sm font-medium text-text-primary mb-1">
              Buy the set
            </p>

            {savings > 0 && (
              <p className="text-xs text-green-600 font-medium mb-4">
                Save {setDiscount}% ({formatPrice(savings)})
              </p>
            )}

            <button
              type="button"
              onClick={handleAddAll}
              className={cn(
                "flex items-center justify-center gap-1.5 rounded-sm px-5 py-2.5",
                "bg-gold text-white text-xs font-medium uppercase tracking-wider",
                "transition-colors duration-200 hover:bg-gold-dark",
              )}
            >
              <ShoppingBag className="size-3.5" />
              Add All to Cart
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

CompleteTheLook.displayName = "CompleteTheLook";

export { CompleteTheLook };
