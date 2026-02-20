import { motion } from "framer-motion";
import { Star, ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn, formatPrice, getDiscountPercent } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useUIStore } from "@/stores/uiStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { getProductById } from "@/data/products";

/* ─── Component ──────────────────────────────────────────── */

function QuickView() {
  const { isQuickViewOpen, quickViewProductId, closeQuickView } = useUIStore();
  const { addItem } = useCartStore();
  const { toggle, has } = useWishlistStore();

  const product = quickViewProductId
    ? getProductById(quickViewProductId)
    : null;

  if (!product) {
    return (
      <Modal isOpen={isQuickViewOpen} onClose={closeQuickView} size="md">
        <div className="flex items-center justify-center p-12">
          <p className="text-sm text-text-muted">Product not found.</p>
        </div>
      </Modal>
    );
  }

  const isWishlisted = has(product.id);
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.originalPrice!)
    : 0;

  const handleAddToCart = () => {
    addItem(product);
    closeQuickView();
  };

  const handleWishlistToggle = () => {
    toggle(product.id);
  };

  /* ── Star rating ───────────────────────────────────────── */

  const renderStars = () => {
    const fullStars = Math.floor(product.rating);
    const hasHalf = product.rating - fullStars >= 0.5;

    return (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < fullStars
                  ? "fill-gold text-gold"
                  : i === fullStars && hasHalf
                    ? "fill-gold/50 text-gold"
                    : "fill-none text-border-medium",
              )}
            />
          ))}
        </div>
        <span className="text-xs text-text-muted">
          {product.rating} ({product.reviewCount} reviews)
        </span>
      </div>
    );
  };

  /* ── Render ────────────────────────────────────────────── */

  return (
    <Modal isOpen={isQuickViewOpen} onClose={closeQuickView} size="lg">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* ── Left: Product Image ──────────────────────────── */}
        <div className="relative aspect-square md:aspect-auto bg-bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="size-full object-cover"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {hasDiscount && (
              <Badge variant="sale">
                Sale &minus;{discount}%
              </Badge>
            )}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isTrending && (
              <Badge variant="trending">Trending</Badge>
            )}
            {product.isBestseller && (
              <Badge variant="bestseller">Bestseller</Badge>
            )}
          </div>
        </div>

        {/* ── Right: Product Info ──────────────────────────── */}
        <div className="flex flex-col justify-between p-6 md:p-8">
          <div className="space-y-4">
            {/* Category */}
            <p className="overline">{product.category}</p>

            {/* Name */}
            <h2 className="font-display font-medium text-xl md:text-2xl text-text-primary leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            {renderStars()}

            {/* Price */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-2xl font-bold text-text-primary tabular-nums">
                {formatPrice(product.price)}
              </span>
              {hasDiscount && (
                <span className="text-sm text-text-muted line-through tabular-nums">
                  {formatPrice(product.originalPrice!)}
                </span>
              )}
              {hasDiscount && (
                <span className="text-xs font-semibold text-success">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-sm text-text-body leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Metal & Purity info */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span className="capitalize">
                {product.metal.replace("-", " ")}
              </span>
              <span className="w-px h-3 bg-border-light" />
              <span>{product.purity}</span>
              <span className="w-px h-3 bg-border-light" />
              <span>{product.netWeight}g</span>
            </div>

            {/* Stock scarcity */}
            {product.inStock &&
              product.stockCount != null &&
              product.stockCount <= 5 && (
                <p
                  className="text-xs font-medium text-warning"
                  style={{
                    animation: "gentle-pulse 2s ease-in-out infinite",
                  }}
                >
                  Only {product.stockCount} left in stock
                </p>
              )}
          </div>

          {/* ── Actions ────────────────────────────────────── */}
          <div className="space-y-3 pt-6 mt-6 border-t border-border-light">
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="default"
                className="flex-1"
                disabled={!product.inStock}
              >
                <ShoppingBag className="size-4" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>

              <motion.button
                onClick={handleWishlistToggle}
                className={cn(
                  "flex items-center justify-center size-12 rounded-sm border transition-colors duration-200",
                  isWishlisted
                    ? "border-gold bg-gold/5"
                    : "border-border-light hover:border-gold-muted",
                )}
                whileTap={{ scale: 0.92 }}
                aria-label={
                  isWishlisted
                    ? "Remove from wishlist"
                    : "Add to wishlist"
                }
              >
                <motion.div
                  animate={
                    isWishlisted ? { scale: [1, 1.25, 1] } : { scale: 1 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                  }}
                >
                  <Heart
                    className={cn(
                      "size-5 transition-colors duration-200",
                      isWishlisted
                        ? "fill-gold text-gold"
                        : "fill-none text-text-primary",
                    )}
                  />
                </motion.div>
              </motion.button>
            </div>

            <Link
              to="/shop/$slug"
              params={{ slug: product.slug }}
              onClick={closeQuickView}
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-medium uppercase tracking-wider text-text-primary hover:text-gold transition-colors duration-200"
            >
              View Full Details
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}

QuickView.displayName = "QuickView";

export { QuickView };
