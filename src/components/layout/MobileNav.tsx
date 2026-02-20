import { Link, useMatchRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, Store, Search, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useUIStore } from "@/stores/uiStore";

const NAV_ITEMS = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Store, label: "Shop", href: "/shop" },
  { icon: Search, label: "Search", href: "__search__" },
  { icon: Heart, label: "Wishlist", href: "/wishlist" },
  { icon: User, label: "Account", href: "/account" },
] as const;

export function MobileNav() {
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const openSearch = useUIStore((s) => s.openSearch);
  const matchRoute = useMatchRoute();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 block border-t border-border-light bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <div className="flex h-14 items-center justify-around">
        {NAV_ITEMS.map((item) => {
          const isSearch = item.href === "__search__";
          const isActive =
            !isSearch &&
            matchRoute({
              to: item.href,
              fuzzy: item.href !== "/",
            });

          const content = (
            <div className="relative flex flex-col items-center gap-0.5">
              <div className="relative">
                <item.icon
                  className={cn(
                    "h-5 w-5 transition-colors duration-200",
                    isActive ? "text-gold" : "text-text-muted",
                  )}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {/* Wishlist count badge */}
                {item.label === "Wishlist" && wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 20,
                    }}
                    className="absolute -right-2 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white"
                  >
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </motion.span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors duration-200",
                  isActive ? "text-gold" : "text-text-muted",
                )}
              >
                {item.label}
              </span>
              {/* Active dot indicator */}
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-2.5 h-0.5 w-5 rounded-full bg-gold"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}
            </div>
          );

          if (isSearch) {
            return (
              <button
                key={item.label}
                onClick={openSearch}
                className="flex flex-1 items-center justify-center py-1"
                aria-label="Search"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.href}
              className="flex flex-1 items-center justify-center py-1"
              aria-label={item.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
