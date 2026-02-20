import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn, formatPrice, getDiscountPercent } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Badge } from "@/components/ui/Badge";
import { RatingStars } from "@/components/shared/RatingStars";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useUIStore } from "@/stores/uiStore";
import type { Product } from "@/types/product";

/* ─── Constants ──────────────────────────────────────────── */

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Props ──────────────────────────────────────────────── */

interface ProductCardProps {
  product: Product;
  index?: number;
}

/* ─── Component ──────────────────────────────────────────── */

function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { toggle, has } = useWishlistStore();
  const { openQuickView } = useUIStore();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = has(product.id);
  const hasDiscount =
    product.originalPrice != null && product.originalPrice > product.price;
  const discount = hasDiscount
    ? getDiscountPercent(product.price, product.originalPrice!)
    : 0;
  const isLowStock =
    product.inStock && product.stockCount != null && product.stockCount <= 5;
  const hasSecondImage = product.images.length > 1;

  /* ── Event Handlers ──────────────────────────────────── */

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product.id);
  };

  /* ── Badges ──────────────────────────────────────────── */

  const renderBadges = () => {
    const badges: React.ReactNode[] = [];

    if (hasDiscount) {
      badges.push(
        <Badge key="sale" variant="sale">
          Sale
        </Badge>,
      );
    }
    if (product.isNew && badges.length < 2) {
      badges.push(
        <Badge key="new" variant="new">
          New
        </Badge>,
      );
    }
    if (product.isTrending && badges.length < 2) {
      badges.push(
        <Badge key="trending" variant="trending">
          Trending
        </Badge>,
      );
    }
    if (product.isBestseller && badges.length < 2) {
      badges.push(
        <Badge key="bestseller" variant="bestseller">
          Bestseller
        </Badge>,
      );
    }

    return badges.slice(0, 2);
  };

  /* ── Render ──────────────────────────────────────────── */

  return (
    <motion.div
      className="group relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: REVEAL_EASE,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to="/shop/$slug"
        params={{ slug: product.slug }}
        className={cn(
          "block transition-all duration-500",
          "hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]",
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      >
        {/* ── Image Container ──────────────────────────────── */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {/* Primary Image */}
          <OptimizedImage
            src={product.images[0]}
            alt={product.name}
            aspect="aspect-[3/4]"
            darkBg
            shimmer
            fadeDuration={0.5}
            fill
            className={cn(
              "absolute inset-0 transition-transform duration-700",
              "group-hover:scale-[1.06]",
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Second Image — crossfade on hover */}
          {hasSecondImage && (
            <div
              className={cn(
                "absolute inset-0 z-[1]",
                "opacity-0 group-hover:opacity-100",
                "transition-opacity duration-700",
              )}
            >
              <OptimizedImage
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                aspect="aspect-[3/4]"
                darkBg
                shimmer={false}
                fadeDuration={0.3}
                fill
                className="absolute inset-0"
              />
            </div>
          )}

          {/* Badges — top-left, stacked */}
          <div className="absolute top-3 left-3 z-[3] flex flex-col gap-1.5">
            {renderBadges()}
          </div>

          {/* Wishlist Heart — top-right */}
          <motion.button
            onClick={handleWishlistToggle}
            className={cn(
              "absolute top-3 right-3 z-[3]",
              "flex items-center justify-center",
              "size-9 rounded-full shadow-sm",
              "transition-all duration-300",
              isWishlisted
                ? "bg-gold opacity-100"
                : "bg-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100",
            )}
            whileTap={{ scale: 0.9 }}
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isWishlisted ? "wishlisted" : "not-wishlisted"}
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                <Heart
                  className={cn(
                    "size-4",
                    isWishlisted
                      ? "fill-white text-white"
                      : "fill-none text-text-primary",
                  )}
                />
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* Quick View — slides up from bottom */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 z-[3]",
              "translate-y-full group-hover:translate-y-0",
              "transition-transform duration-500",
            )}
            style={{
              transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <button
              onClick={handleQuickView}
              className={cn(
                "flex w-full items-center justify-center gap-2",
                "bg-white/95 backdrop-blur-sm",
                "py-3 text-xs font-medium uppercase tracking-wider text-text-primary",
                "hover:bg-white transition-colors duration-200",
              )}
            >
              <Eye className="size-3.5" />
              Quick View
            </button>
          </div>

          {/* Low Stock Indicator */}
          {isLowStock && (
            <div
              className={cn(
                "absolute bottom-0 left-0 z-[2]",
                "bg-bg-dark/80 text-gold",
                "py-1 px-3 text-[11px] font-medium",
                "gentle-pulse",
              )}
            >
              Only {product.stockCount} left
            </div>
          )}
        </div>

        {/* ── Info Area ─────────────────────────────────────── */}
        <div className="bg-white p-4">
          {/* Category Overline */}
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="mt-1.5 font-display font-medium text-base leading-snug text-text-primary line-clamp-2">
            {product.name}
          </h3>

          {/* Price Row */}
          <div className="mt-2 flex items-baseline">
            <span className="font-medium text-base tabular-nums text-text-primary">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <>
                <span className="ml-2 text-sm tabular-nums text-text-muted line-through">
                  {formatPrice(product.originalPrice!)}
                </span>
                <span className="ml-2 text-[11px] font-medium text-emerald-600">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="mt-2">
            <RatingStars
              rating={product.rating}
              count={product.reviewCount}
              size="sm"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

ProductCard.displayName = "ProductCard";

export { ProductCard };
