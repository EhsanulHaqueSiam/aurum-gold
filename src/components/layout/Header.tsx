import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useUIStore } from "@/stores/uiStore";

const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "COLLECTIONS", href: "/collections" },
  { label: "NEW ARRIVALS", href: "/new-arrivals" },
  { label: "ABOUT", href: "/about" },
] as const;

const easing = [0.4, 0, 0.2, 1] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const cartItemCount = useCartStore((s) => s.getItemCount());
  const openCart = useCartStore((s) => s.openCart);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { openSearch, isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } =
    useUIStore();

  // Gold rate display data
  const goldRate = 7200;
  const goldRateChange = 1.2; // percentage change
  const isRateUp = goldRateChange > 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Announcement Bar */}
        <AnimatePresence>
          {showAnnouncement && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: easing }}
              className="overflow-hidden bg-bg-dark"
            >
              <div className="relative flex items-center justify-center px-4 py-2">
                <p className="text-center text-xs tracking-wide text-white/90">
                  Free Shipping on Orders Above{" "}
                  <span className="font-medium text-gold-light">
                    &#8377;10,000
                  </span>{" "}
                  | BIS Hallmarked Gold
                </p>
                <button
                  onClick={() => setShowAnnouncement(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm p-1 text-white/50 transition-colors duration-200 hover:text-white"
                  aria-label="Close announcement"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Header */}
        <motion.div
          animate={{
            height: isScrolled ? 64 : 80,
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(255, 255, 255, 1)",
          }}
          transition={{ duration: 0.3, ease: easing }}
          className={cn(
            "border-b border-border-light transition-shadow duration-300",
            isScrolled && "shadow-sm backdrop-blur-md",
          )}
        >
          <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-4 md:px-8 lg:px-16">
            {/* Left: Hamburger (mobile) */}
            <div className="flex items-center gap-4 lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="rounded-sm p-1 text-text-primary transition-colors hover:text-gold"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Left: Nav Links (desktop) */}
            <nav className="hidden items-center gap-8 lg:flex" role="navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="group relative text-[13px] font-medium tracking-[0.08em] text-text-primary transition-colors duration-300 hover:text-gold"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:w-full" />
                </Link>
              ))}
            </nav>

            {/* Center: Logo */}
            <Link
              to="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              <motion.span
                className="font-display text-2xl font-bold tracking-[0.2em] text-text-primary md:text-[28px]"
                whileHover={{ letterSpacing: "0.25em" }}
                transition={{ duration: 0.4, ease: easing }}
              >
                AURUM
              </motion.span>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Gold Rate Badge (desktop) */}
              <div className="hidden items-center gap-1.5 rounded-sm border border-border-light bg-bg-secondary px-3 py-1.5 xl:flex">
                <span className="text-[11px] font-medium tracking-wide text-text-muted">
                  22K:
                </span>
                <span className="tabular-nums text-[12px] font-semibold text-text-primary">
                  &#8377;{goldRate.toLocaleString("en-IN")}/g
                </span>
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-[10px] font-medium",
                    isRateUp ? "text-success" : "text-error",
                  )}
                >
                  {isRateUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(goldRateChange)}%
                </span>
              </div>

              {/* Search */}
              <button
                onClick={openSearch}
                className="rounded-sm p-1.5 text-text-primary transition-colors duration-200 hover:text-gold"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Wishlist (hidden on mobile, shown in bottom nav) */}
              <Link
                to="/wishlist"
                className="relative hidden rounded-sm p-1.5 text-text-primary transition-colors duration-200 hover:text-gold md:block"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-white"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative rounded-sm p-1.5 text-text-primary transition-colors duration-200 hover:text-gold"
                aria-label="Cart"
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-white"
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: easing }}
              className="fixed inset-0 z-[60] bg-bg-overlay"
              onClick={closeMobileMenu}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: easing }}
              className="fixed inset-y-0 left-0 z-[70] w-[85%] max-w-sm bg-white"
            >
              {/* Menu Header */}
              <div className="flex items-center justify-between border-b border-border-light px-6 py-5">
                <span className="font-display text-xl font-bold tracking-[0.2em] text-text-primary">
                  AURUM
                </span>
                <button
                  onClick={closeMobileMenu}
                  className="rounded-sm p-1 text-text-muted transition-colors hover:text-text-primary"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Gold Rate (mobile) */}
              <div className="mx-6 mt-4 flex items-center gap-2 rounded-sm border border-border-light bg-bg-secondary px-4 py-2.5">
                <span className="text-xs font-medium tracking-wide text-text-muted">
                  22K Gold
                </span>
                <span className="tabular-nums text-sm font-semibold text-text-primary">
                  &#8377;{goldRate.toLocaleString("en-IN")}/g
                </span>
                <span
                  className={cn(
                    "ml-auto flex items-center gap-0.5 text-[11px] font-medium",
                    isRateUp ? "text-success" : "text-error",
                  )}
                >
                  {isRateUp ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {Math.abs(goldRateChange)}%
                </span>
              </div>

              {/* Nav Links */}
              <nav className="mt-6 px-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.05,
                      duration: 0.3,
                      ease: easing,
                    }}
                  >
                    <Link
                      to={link.href}
                      onClick={closeMobileMenu}
                      className="group flex items-center justify-between border-b border-border-light py-4 text-[15px] font-medium tracking-[0.06em] text-text-primary transition-colors hover:text-gold"
                    >
                      {link.label}
                      <ChevronRight className="h-4 w-4 text-text-muted transition-transform duration-200 group-hover:translate-x-1 group-hover:text-gold" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom section */}
              <div className="absolute inset-x-0 bottom-0 border-t border-border-light px-6 py-5">
                <Link
                  to="/account"
                  onClick={closeMobileMenu}
                  className="block text-sm text-text-muted transition-colors hover:text-gold"
                >
                  My Account
                </Link>
                <Link
                  to="/wishlist"
                  onClick={closeMobileMenu}
                  className="mt-3 block text-sm text-text-muted transition-colors hover:text-gold"
                >
                  Wishlist ({wishlistCount})
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
