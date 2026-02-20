import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn, formatPrice } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";
import { searchProducts } from "@/data/products";
import type { Product } from "@/types/product";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const POPULAR_SEARCHES = [
  "Gold Ring",
  "Diamond Earrings",
  "Gold Chain",
  "Platinum Ring",
  "Bridal Set",
];

const MAX_VISIBLE_RESULTS = 8;

/* ------------------------------------------------------------------ */
/*  Overlay Variants                                                   */
/* ------------------------------------------------------------------ */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 30,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 1, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Search logic ───────────────────────────────────────────── */

  useEffect(() => {
    if (query.trim().length >= 2) {
      const matches = searchProducts(query.trim());
      setResults(matches);
    } else {
      setResults([]);
    }
  }, [query]);

  /* ── Auto-focus on open ─────────────────────────────────────── */

  useEffect(() => {
    if (isSearchOpen) {
      // Small delay to allow animation to start
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  /* ── Escape to close ────────────────────────────────────────── */

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    },
    [closeSearch],
  );

  useEffect(() => {
    if (!isSearchOpen) return;
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while overlay is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [isSearchOpen, handleKeyDown]);

  /* ── Popular search click ───────────────────────────────────── */

  const handlePopularClick = (term: string) => {
    setQuery(term);
  };

  /* ── Result click ───────────────────────────────────────────── */

  const handleResultClick = () => {
    closeSearch();
  };

  const visibleResults = results.slice(0, MAX_VISIBLE_RESULTS);
  const hasMore = results.length > MAX_VISIBLE_RESULTS;
  const showPopular = query.trim().length < 2;

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50">
          {/* ── Dark Backdrop ─────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 bg-bg-dark/60 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={closeSearch}
            aria-hidden
          />

          {/* ── Search Panel ──────────────────────────────────── */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-bg-primary shadow-2xl"
          >
            {/* ── Search Bar ─────────────────────────────────── */}
            <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16">
              <div className="flex items-center gap-4 border-b border-border-light py-5">
                <Search className="size-5 text-text-muted flex-shrink-0" />

                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for gold rings, diamond earrings, necklaces..."
                  className={cn(
                    "flex-1 bg-transparent text-lg md:text-xl font-display",
                    "text-text-primary placeholder:text-text-muted/40",
                    "focus:outline-none",
                  )}
                  aria-label="Search products"
                />

                <button
                  type="button"
                  onClick={closeSearch}
                  className="flex h-9 w-9 items-center justify-center rounded-sm text-text-muted transition-colors duration-200 hover:bg-bg-secondary hover:text-text-primary"
                  aria-label="Close search"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* ── Body ─────────────────────────────────────── */}
              <div className="py-6 max-h-[70vh] overflow-y-auto">
                {/* ── Popular Searches ────────────────────────── */}
                {showPopular && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.3 }}
                  >
                    <h3 className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-text-muted mb-4">
                      <TrendingUp className="size-3.5" />
                      Popular Searches
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => handlePopularClick(term)}
                          className={cn(
                            "rounded-sm border border-border-light px-4 py-2",
                            "text-sm text-text-primary",
                            "transition-all duration-200",
                            "hover:border-gold hover:text-gold hover:bg-gold/5",
                          )}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── No Results ──────────────────────────────── */}
                {!showPopular && results.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center"
                  >
                    <p className="font-display text-lg text-text-primary mb-1">
                      No results found
                    </p>
                    <p className="text-sm text-text-muted">
                      Try a different search term or browse our collections
                    </p>
                  </motion.div>
                )}

                {/* ── Results Grid ────────────────────────────── */}
                {visibleResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs text-text-muted mb-4">
                      {results.length} result{results.length !== 1 ? "s" : ""}{" "}
                      for &ldquo;{query}&rdquo;
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {visibleResults.map((product, i) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: i * 0.05,
                          }}
                        >
                          <Link
                            to="/shop/$slug"
                            params={{ slug: product.slug }}
                            onClick={handleResultClick}
                            className="group block"
                          >
                            <div className="relative aspect-square overflow-hidden rounded-sm bg-bg-secondary mb-2">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy"
                              />
                            </div>

                            <p className="overline text-[10px] mb-0.5">
                              {product.category}
                            </p>
                            <h4 className="font-display text-sm font-medium text-text-primary truncate group-hover:text-gold transition-colors duration-200">
                              {product.name}
                            </h4>
                            <p className="text-sm font-semibold text-text-primary tabular-nums mt-0.5">
                              {formatPrice(product.price)}
                            </p>
                          </Link>
                        </motion.div>
                      ))}
                    </div>

                    {/* ── View all link ────────────────────────── */}
                    {hasMore && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-center"
                      >
                        <Link
                          to="/shop"
                          search={{ q: query }}
                          onClick={handleResultClick}
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-dark transition-colors duration-200"
                        >
                          View all {results.length} results
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

SearchOverlay.displayName = "SearchOverlay";

export { SearchOverlay };
