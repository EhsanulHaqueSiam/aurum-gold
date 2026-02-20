import { useEffect, useState, useRef, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Truck,
  Shield,
  Award,
  RotateCcw,
  Eye,
  ShoppingBag,
  Star,
  MapPin,
  CheckCircle,
  Share2,
  AlertTriangle,
} from "lucide-react";
import {
  cn,
  formatPrice,
  formatWeight,
  getDiscountPercent,
  getDeliveryDate,
} from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { PriceBreakdown } from "@/components/product/PriceBreakdown";
import { RatingStars } from "@/components/shared/RatingStars";
import { Badge } from "@/components/ui/Badge";
import { CompleteTheLook } from "@/components/recommendations/CompleteTheLook";
import { YouMightLike } from "@/components/recommendations/YouMightLike";
import { RecentlyViewed } from "@/components/recommendations/RecentlyViewed";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import {
  getProductBySlug,
  reviews,
  goldRates,
  categories,
} from "@/data/products";
import type { Product, Review } from "@/types/product";

/* ═══════════════════════════════════════════════════════════════════ */
/*  Animation Constants                                               */
/* ═══════════════════════════════════════════════════════════════════ */

const EASE_REVEAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Product Tabs                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

type TabId = "description" | "specifications" | "reviews";

function ProductTabs({
  product,
  productReviews,
  reviewsRef,
}: {
  product: Product;
  productReviews: Review[];
  reviewsRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews", count: productReviews.length },
  ];

  return (
    <div ref={reviewsRef}>
      {/* Tab Headers */}
      <div className="flex gap-0 border-b border-border-light">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative px-5 py-4 text-sm font-medium uppercase tracking-wide transition-colors duration-200 md:px-8",
              activeTab === tab.id
                ? "text-text-primary"
                : "text-text-muted hover:text-text-body",
            )}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span className="text-xs tabular-nums text-text-muted">
                  ({tab.count})
                </span>
              )}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="pdp-tab-indicator"
                className="absolute inset-x-0 bottom-0 h-0.5 bg-gold"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE_REVEAL }}
          className="py-8 md:py-10"
        >
          {/* -- Description -- */}
          {activeTab === "description" && (
            <div className="max-w-2xl">
              <p className="font-accent text-lg leading-relaxed text-text-body md:text-xl">
                {product.description}
              </p>
              {product.dimensions && (
                <p className="mt-6 text-sm text-text-muted">
                  <span className="font-medium text-text-primary">
                    Dimensions:
                  </span>{" "}
                  {product.dimensions}
                </p>
              )}
            </div>
          )}

          {/* -- Specifications -- */}
          {activeTab === "specifications" && (
            <div className="overflow-hidden rounded-sm border border-border-light">
              <table className="w-full">
                <tbody>
                  {[
                    {
                      label: "Metal",
                      value: product.metal.replace("-", " "),
                    },
                    { label: "Purity", value: product.purity },
                    {
                      label: "Gross Weight",
                      value: formatWeight(product.grossWeight),
                    },
                    {
                      label: "Net Weight",
                      value: formatWeight(product.netWeight),
                    },
                    ...(product.dimensions
                      ? [
                          {
                            label: "Dimensions",
                            value: product.dimensions,
                          },
                        ]
                      : []),
                    ...(product.stoneType
                      ? [
                          {
                            label: "Stone Type",
                            value: `${product.stoneType}${product.stoneWeight ? ` (${formatWeight(product.stoneWeight)})` : ""}`,
                          },
                        ]
                      : []),
                    { label: "SKU", value: product.sku },
                    ...(product.hallmarkNumber
                      ? [
                          {
                            label: "BIS Hallmark No.",
                            value: product.hallmarkNumber,
                          },
                        ]
                      : []),
                  ].map((row, i) => (
                    <tr
                      key={row.label}
                      className={cn(
                        i % 2 === 0 ? "bg-bg-secondary" : "bg-white",
                      )}
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-text-primary">
                        {row.label}
                      </td>
                      <td className="px-5 py-3.5 text-sm capitalize text-text-body">
                        {row.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* -- Reviews -- */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              {productReviews.length === 0 ? (
                <div className="py-16 text-center">
                  <Star
                    className="mx-auto mb-4 size-10 text-gold-muted"
                    strokeWidth={1}
                  />
                  <p className="font-display text-xl text-text-primary">
                    Be the first to review this piece
                  </p>
                  <p className="mt-2 font-accent text-base italic text-text-muted">
                    Share your experience with this exquisite creation
                  </p>
                </div>
              ) : (
                productReviews.map((review) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE_REVEAL }}
                    className="border-b border-border-light pb-6 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="mb-2.5 flex items-center gap-3">
                          <RatingStars rating={review.rating} size="sm" />
                          {review.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-success">
                              <CheckCircle className="size-3" />
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <p className="text-sm leading-relaxed text-text-body">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
                      <span className="font-medium text-text-primary">
                        {review.userName}
                      </span>
                      {review.location && (
                        <>
                          <span className="h-3 w-px bg-border-light" />
                          <span className="flex items-center gap-1">
                            <MapPin className="size-3" />
                            {review.location}
                          </span>
                        </>
                      )}
                      <span className="h-3 w-px bg-border-light" />
                      <span>
                        {new Date(review.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Product Detail Page                                               */
/* ═══════════════════════════════════════════════════════════════════ */

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle: toggleWishlist, has: hasWishlist } = useWishlistStore();
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed();

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined,
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const reviewsRef = useRef<HTMLDivElement>(null);

  /* -- Track recently viewed -------------------------------------------- */

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product, addToRecentlyViewed]);

  /* -- Gold rate for price breakdown ------------------------------------ */

  const relevantGoldRate = useMemo(() => {
    if (!product) return goldRates[1];
    return (
      goldRates.find((r) => r.purity === product.purity) ?? goldRates[1]
    );
  }, [product]);

  /* -- Reviews ---------------------------------------------------------- */

  const productReviews = useMemo(
    () => (product ? reviews.filter((r) => r.productId === product.id) : []),
    [product],
  );

  /* -- Set default size ------------------------------------------------- */

  useEffect(() => {
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  /* -- SEO title -------------------------------------------------------- */

  useEffect(() => {
    if (product) {
      document.title = `${product.name} | ${product.purity} ${product.metal.replace("-", " ")} | Aurum`;
    } else {
      document.title = "Product Not Found | Aurum";
    }
  }, [product]);

  /* -- Computed values -------------------------------------------------- */

  const isWishlisted = product ? hasWishlist(product.id) : false;
  const hasDiscount = product
    ? product.originalPrice != null && product.originalPrice > product.price
    : false;
  const discountPercent =
    product && hasDiscount
      ? getDiscountPercent(product.price, product.originalPrice!)
      : 0;
  const isLowStock =
    product &&
    product.inStock &&
    product.stockCount != null &&
    product.stockCount <= 5;

  const categoryData = product
    ? categories.find((c) => c.id === product.category)
    : undefined;

  /* -- Handlers --------------------------------------------------------- */

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (!product) return;
    toggleWishlist(product.id);
  };

  const scrollToReviews = () => {
    reviewsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: `Check out ${product?.name} on Aurum`,
          url: window.location.href,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  /* ═══════════════════════════════════════════════════════════════════ */
  /*  404 State                                                        */
  /* ═══════════════════════════════════════════════════════════════════ */

  if (!product) {
    return (
      <div className="bg-bg-secondary">
        <div className="mx-auto max-w-[1440px] px-4 py-24 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_REVEAL }}
            className="mx-auto max-w-lg text-center"
          >
            <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-full border border-border-light bg-white">
              <ShoppingBag
                className="size-10 text-text-light"
                strokeWidth={1}
              />
            </div>
            <h1 className="font-display text-3xl font-medium text-text-primary md:text-4xl">
              Piece Not Found
            </h1>
            <p className="mt-3 font-accent text-lg italic text-text-muted">
              This jewellery piece may have been moved or is no longer available
              in our collection.
            </p>
            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-2 bg-gold px-10 py-4 text-xs font-medium uppercase tracking-[0.15em] text-white transition-all duration-300 hover:bg-gold-dark hover:shadow-lg hover:shadow-gold/20"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════ */
  /*  Main Render                                                      */
  /* ═══════════════════════════════════════════════════════════════════ */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_REVEAL }}
    >
      {/* ================================================================= */}
      {/*  1. BREADCRUMB                                                    */}
      {/* ================================================================= */}

      <div className="border-b border-border-light bg-bg-secondary py-3">
        <nav className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 px-4 text-xs text-text-muted md:px-8 lg:px-16">
          <Link
            to="/"
            className="transition-colors duration-200 hover:text-gold"
          >
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link
            to="/shop"
            className="transition-colors duration-200 hover:text-gold"
          >
            Shop
          </Link>
          <ChevronRight className="size-3" />
          {categoryData && (
            <>
              <Link
                to="/shop"
                search={{ category: product.category }}
                className="capitalize transition-colors duration-200 hover:text-gold"
              >
                {categoryData.name}
              </Link>
              <ChevronRight className="size-3" />
            </>
          )}
          <span className="text-gold">{product.name}</span>
        </nav>
      </div>

      {/* ================================================================= */}
      {/*  2. MAIN PRODUCT SECTION                                          */}
      {/* ================================================================= */}

      <section className="bg-white py-6 md:py-10 lg:py-14">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 gap-6 md:gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            {/* ─── LEFT: Product Gallery (sticky, larger) ─────────── */}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_REVEAL }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <ProductGallery
                images={product.images}
                productName={product.name}
              />
            </motion.div>

            {/* ─── RIGHT: Product Info ──────────────────────────────── */}

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Category overline + Collection */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-2"
              >
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                  {product.category}
                </span>
                {product.collectionName && (
                  <>
                    <span className="h-3 w-px bg-border-light" />
                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-gold">
                      {product.collectionName}
                    </span>
                  </>
                )}
              </motion.div>

              {/* Product Name */}
              <motion.h1
                variants={fadeUp}
                className="font-display text-2xl font-medium leading-tight text-text-primary md:text-3xl lg:text-4xl"
              >
                {product.name}
              </motion.h1>

              {/* Rating + Reviews link */}
              <motion.button
                variants={fadeUp}
                onClick={scrollToReviews}
                className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-80"
              >
                <RatingStars
                  rating={product.rating}
                  count={product.reviewCount}
                  size="md"
                />
              </motion.button>

              {/* Badges */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                {product.isTrending && (
                  <Badge variant="trending">Trending</Badge>
                )}
                {product.isBestseller && (
                  <Badge variant="bestseller">Bestseller</Badge>
                )}
                {product.isNew && <Badge variant="new">New</Badge>}
              </motion.div>

              {/* ── PRICE BLOCK ───────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                className="border-y border-gold/20 py-5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-3xl font-semibold tabular-nums text-text-primary md:text-4xl">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-lg tabular-nums text-text-muted line-through">
                        {formatPrice(product.originalPrice!)}
                      </span>
                      <span className="rounded-sm bg-success/10 px-2 py-0.5 text-sm font-semibold text-success">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="mt-2 text-sm text-text-muted">
                  or 3 payments of{" "}
                  <span className="font-medium tabular-nums text-text-body">
                    {formatPrice(Math.round(product.price / 3))}
                  </span>
                </p>
              </motion.div>

              {/* ── PRICE BREAKDOWN (collapsible) ─────────────────── */}
              <motion.div variants={fadeUp}>
                <PriceBreakdown
                  product={product}
                  goldRate={relevantGoldRate}
                />
              </motion.div>

              {/* ── METAL / PURITY / WEIGHT ROW ──────────────────── */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 divide-x divide-border-light rounded-sm border border-border-light"
              >
                <div className="flex flex-col items-center px-4 py-3.5 text-center">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
                    Metal
                  </span>
                  <span className="mt-1 text-sm font-medium capitalize text-text-primary">
                    {product.metal.replace("-", " ")}
                  </span>
                </div>
                <div className="flex flex-col items-center px-4 py-3.5 text-center">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
                    Purity
                  </span>
                  <span className="mt-1 text-sm font-medium text-text-primary">
                    {product.purity}
                  </span>
                </div>
                <div className="flex flex-col items-center px-4 py-3.5 text-center">
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-text-muted">
                    Net Weight
                  </span>
                  <span className="mt-1 text-sm font-medium tabular-nums text-text-primary">
                    {formatWeight(product.netWeight)}
                  </span>
                </div>
              </motion.div>

              {/* ── SIZE SELECTOR ────────────────────────────────── */}
              {product.sizes && product.sizes.length > 0 && (
                <motion.div variants={fadeUp}>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-semibold text-text-primary">
                      Select Size
                    </span>
                    <button className="text-xs font-medium text-gold underline underline-offset-2 transition-colors duration-200 hover:text-gold-dark">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "rounded-sm border py-2.5 text-center text-sm font-medium transition-all duration-200",
                          selectedSize === size
                            ? "border-gold bg-gold/5 text-text-primary"
                            : "border-border-light text-text-body hover:border-gold-muted",
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── QUANTITY ─────────────────────────────────────── */}
              <motion.div variants={fadeUp}>
                <span className="mb-3 block text-sm font-semibold text-text-primary">
                  Quantity
                </span>
                <div className="inline-flex items-center rounded-sm border border-border-light">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                    className="flex size-10 items-center justify-center text-text-muted transition-colors duration-200 hover:text-text-primary disabled:opacity-40"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="flex w-12 items-center justify-center border-x border-border-light text-sm font-semibold tabular-nums text-text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) =>
                        Math.min(q + 1, product.stockCount ?? 10),
                      )
                    }
                    disabled={quantity >= (product.stockCount ?? 10)}
                    className="flex size-10 items-center justify-center text-text-muted transition-colors duration-200 hover:text-text-primary disabled:opacity-40"
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </motion.div>

              {/* ── URGENCY SIGNALS ──────────────────────────────── */}
              <motion.div variants={fadeUp} className="space-y-2">
                {isLowStock && (
                  <div
                    className="flex items-center gap-2 text-sm font-medium text-warning"
                    style={{
                      animation: "gentle-pulse 2s ease-in-out infinite",
                    }}
                  >
                    <AlertTriangle className="size-4" />
                    <span>
                      Only {product.stockCount} left in stock
                    </span>
                  </div>
                )}

                {product.viewerCount != null && product.viewerCount > 0 && (
                  <div className="flex items-center gap-2 text-xs text-text-muted">
                    <Eye className="size-3.5" />
                    <span>
                      <span className="font-medium tabular-nums text-text-primary">
                        {product.viewerCount}
                      </span>{" "}
                      people viewing this right now
                    </span>
                  </div>
                )}
              </motion.div>

              {/* ── ACTION BUTTONS ───────────────────────────────── */}
              <motion.div variants={fadeUp} className="space-y-3 pt-1">
                {/* Add to Cart */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={cn(
                    "relative flex h-14 w-full items-center justify-center gap-2 text-xs font-medium uppercase tracking-[0.15em] transition-all duration-300",
                    product.inStock
                      ? "bg-gold text-white hover:shadow-lg hover:shadow-gold/25"
                      : "cursor-not-allowed bg-text-muted text-white/80",
                  )}
                  whileTap={product.inStock ? { scale: 0.98 } : undefined}
                  whileHover={product.inStock ? { scale: 1.01 } : undefined}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  <AnimatePresence mode="wait">
                    {addedToCart ? (
                      <motion.span
                        key="added"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="size-4" />
                        Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-2"
                      >
                        <ShoppingBag className="size-4" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                {/* Wishlist + Share row */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleWishlistToggle}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-2 rounded-sm border py-3 text-xs font-medium uppercase tracking-wide transition-all duration-200",
                      isWishlisted
                        ? "border-gold bg-gold/5 text-gold"
                        : "border-border-light text-text-primary hover:border-gold-muted",
                    )}
                    whileTap={{ scale: 0.97 }}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    <motion.div
                      animate={
                        isWishlisted
                          ? { scale: [1, 1.3, 1] }
                          : { scale: 1 }
                      }
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <Heart
                        className={cn(
                          "size-4 transition-colors duration-200",
                          isWishlisted
                            ? "fill-gold text-gold"
                            : "fill-none text-current",
                        )}
                      />
                    </motion.div>
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </motion.button>

                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 rounded-sm border border-border-light px-5 py-3 text-xs font-medium uppercase tracking-wide text-text-primary transition-colors duration-200 hover:border-gold-muted"
                    aria-label="Share this product"
                  >
                    <Share2 className="size-4" />
                    Share
                  </button>
                </div>
              </motion.div>

              {/* ── DELIVERY INFO ────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 rounded-sm bg-bg-secondary px-4 py-3"
              >
                <Truck className="size-5 text-success" strokeWidth={1.5} />
                <p className="text-sm text-text-body">
                  Free delivery by{" "}
                  <span className="font-medium text-success">
                    {getDeliveryDate(5)}
                  </span>
                </p>
              </motion.div>

              {/* ── TRUST SIGNALS ────────────────────────────────── */}
              <motion.div
                variants={fadeUp}
                className="grid grid-cols-3 divide-x divide-border-light rounded-sm border border-border-light"
              >
                {[
                  {
                    icon: Shield,
                    label: "BIS Hallmarked",
                  },
                  {
                    icon: Award,
                    label: "Purity Guarantee",
                  },
                  {
                    icon: RotateCcw,
                    label: "30-Day Returns",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 px-3 py-4 text-center"
                  >
                    <item.icon
                      className="size-5 text-gold"
                      strokeWidth={1.5}
                    />
                    <span className="text-[10px] font-medium uppercase tracking-wider text-text-primary">
                      {item.label}
                    </span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/*  3. TABS SECTION                                                  */}
      {/* ================================================================= */}

      <section className="border-t border-border-light bg-white">
        <div className="mx-auto max-w-[1440px] px-4 pt-12 md:px-8 lg:px-16">
          <ProductTabs
            product={product}
            productReviews={productReviews}
            reviewsRef={reviewsRef}
          />
        </div>
      </section>

      {/* ================================================================= */}
      {/*  4. RECOMMENDATIONS                                               */}
      {/* ================================================================= */}

      <CompleteTheLook productId={product.id} />
      <YouMightLike productId={product.id} />
      <RecentlyViewed />

      {/* ================================================================= */}
      {/*  5. MOBILE STICKY BAR                                             */}
      {/* ================================================================= */}

      <div className="fixed inset-x-0 bottom-14 z-40 border-t border-border-light bg-white/95 shadow-lg backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">
              {product.name}
            </p>
            <p className="text-sm font-semibold tabular-nums text-text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
          <motion.button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              "shrink-0 px-6 py-3 text-xs font-medium uppercase tracking-wide",
              product.inStock
                ? "bg-gold text-white"
                : "cursor-not-allowed bg-text-muted text-white/80",
            )}
            whileTap={product.inStock ? { scale: 0.97 } : undefined}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="size-4" />
              {product.inStock ? "Add to Cart" : "Sold Out"}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Route Export                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/shop/$slug")({
  component: ProductDetailPage,
});
