import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

/* ─── Props ──────────────────────────────────────────────── */

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  className?: string;
}

/* ─── Animation Variants ─────────────────────────────────── */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
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
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/* ─── Skeleton Card ──────────────────────────────────────── */

function SkeletonCard() {
  return (
    <div className="animate-pulse">
      {/* Image placeholder */}
      <div className="aspect-square rounded-sm bg-bg-tertiary" />
      {/* Info placeholder */}
      <div className="pt-3.5 space-y-2.5">
        <div className="h-2.5 w-16 rounded-sm bg-bg-tertiary" />
        <div className="h-4 w-3/4 rounded-sm bg-bg-tertiary" />
        <div className="h-3.5 w-20 rounded-sm bg-bg-tertiary" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="size-3 rounded-sm bg-bg-tertiary" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */

function ProductGrid({
  products,
  loading = false,
  className,
}: ProductGridProps) {
  if (loading) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
          "gap-4 md:gap-6 lg:gap-8",
          className,
        )}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-lg text-text-primary mb-1">
          No products found
        </p>
        <p className="text-sm text-text-muted">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        "gap-4 md:gap-6 lg:gap-8",
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}

ProductGrid.displayName = "ProductGrid";

export { ProductGrid };
