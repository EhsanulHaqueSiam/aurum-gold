import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  Tag,
  X,
  Lock,
  Plus,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { getCompleteTheLook } from "@/data/products";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { CartItem } from "./CartItem";

/* ------------------------------------------------------------------ */
/*  Reservation Timer                                                  */
/* ------------------------------------------------------------------ */

function ReservationTimer() {
  const reservationExpiry = useCartStore((s) => s.reservationExpiry);
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!reservationExpiry) {
      setTimeLeft("");
      return;
    }

    const tick = () => {
      const diff = reservationExpiry - Date.now();
      if (diff <= 0) {
        setTimeLeft("0:00");
        setIsUrgent(true);
        return;
      }
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, "0")}`);
      setIsUrgent(minutes < 5);
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [reservationExpiry]);

  if (!timeLeft) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-sm px-3 py-2 text-xs",
        isUrgent
          ? "bg-amber-50 text-amber-700"
          : "bg-bg-secondary text-text-muted",
      )}
    >
      <Clock className="size-3.5 flex-shrink-0" />
      <span>
        Items reserved for{" "}
        <span className="font-semibold tabular-nums">{timeLeft}</span>
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Promo Code Section                                                 */
/* ------------------------------------------------------------------ */

function PromoSection() {
  const { promoCode, promoDiscount, applyPromo, removePromo } = useCartStore();
  const [isOpen, setIsOpen] = useState(!!promoCode);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleApply = () => {
    if (!input.trim()) return;
    const prevCode = promoCode;
    applyPromo(input.trim());
    // Check if apply worked by reading from store after call
    // Since zustand updates are sync, we check the store directly
    const current = useCartStore.getState().promoCode;
    if (current && current !== prevCode) {
      setInput("");
      setError("");
    } else {
      setError("Invalid promo code");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="border-t border-border-light pt-3">
      {promoCode ? (
        <div className="flex items-center justify-between rounded-sm bg-green-50 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Tag className="size-3.5 text-green-600" />
            <span className="text-xs font-medium text-green-700">
              {promoCode}
            </span>
            <span className="text-xs text-green-600">
              (-{promoDiscount}% off)
            </span>
          </div>
          <button
            type="button"
            onClick={removePromo}
            className="p-1 rounded-sm text-green-600 hover:bg-green-100 transition-colors duration-200"
            aria-label="Remove promo code"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between py-1 text-xs font-medium text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            <span className="flex items-center gap-1.5">
              <Tag className="size-3.5" />
              Have a promo code?
            </span>
            {isOpen ? (
              <ChevronUp className="size-3.5" />
            ) : (
              <ChevronDown className="size-3.5" />
            )}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === "Enter" && handleApply()}
                    placeholder="Enter code"
                    className={cn(
                      "flex-1 rounded-sm border px-3 py-2 text-xs uppercase tracking-wider",
                      "bg-transparent placeholder:text-text-muted/50 focus:outline-none",
                      error
                        ? "border-red-400 text-red-600"
                        : "border-border-light focus:border-gold",
                    )}
                  />
                  <button
                    type="button"
                    onClick={handleApply}
                    className="rounded-sm bg-bg-dark px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-bg-dark/90"
                  >
                    Apply
                  </button>
                </div>
                {error && (
                  <p className="mt-1 text-[10px] text-red-500">{error}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Upsell: Complete the Look                                          */
/* ------------------------------------------------------------------ */

function UpsellSection() {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);

  const recommendations = useMemo(() => {
    if (items.length === 0) return [];
    return getCompleteTheLook(items[0].product.id).slice(0, 3);
  }, [items]);

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-6 border-t border-border-light pt-4">
      <h4 className="font-display text-sm font-medium text-text-primary mb-1">
        Complete This Look
      </h4>
      <p className="text-[10px] text-text-muted mb-3">
        Pairs beautifully with your selection
      </p>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {recommendations.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-shrink-0 w-[140px] rounded-sm border border-border-light overflow-hidden bg-bg-primary"
          >
            <div className="relative aspect-square bg-bg-secondary">
              <img
                src={product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-2 space-y-1">
              <p className="text-[11px] font-display font-medium text-text-primary truncate">
                {product.name}
              </p>
              <p className="text-[11px] font-semibold tabular-nums text-text-primary">
                {formatPrice(product.price)}
              </p>
              <button
                type="button"
                onClick={() => addItem(product)}
                className="flex w-full items-center justify-center gap-1 rounded-sm bg-bg-secondary py-1.5 text-[10px] font-medium uppercase tracking-wider text-text-primary transition-colors duration-200 hover:bg-bg-dark hover:text-white"
              >
                <Plus className="size-3" />
                Add
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Empty Cart State                                                   */
/* ------------------------------------------------------------------ */

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-bg-secondary"
      >
        <ShoppingBag className="size-8 text-text-muted" />
      </motion.div>

      <h3 className="font-display text-lg font-medium text-text-primary mb-2">
        Your cart is empty
      </h3>
      <p className="text-sm text-text-muted mb-8 max-w-[240px]">
        Discover our exquisite collection of handcrafted jewellery
      </p>

      <Button asChild variant="primary" size="default">
        <Link to="/shop" onClick={onClose}>
          Start Shopping
        </Link>
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Cart Footer                                                        */
/* ------------------------------------------------------------------ */

function CartFooter({ onClose }: { onClose: () => void }) {
  const { getSubtotal, getTotal, promoDiscount } = useCartStore();

  const subtotal = getSubtotal();
  const total = getTotal();
  const hasDiscount = promoDiscount > 0;

  return (
    <div className="space-y-3">
      {/* ── Subtotal & discount ───────────────────────────────── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-sm text-text-muted">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        {hasDiscount && (
          <div className="flex items-center justify-between text-sm text-green-600">
            <span>Discount (-{promoDiscount}%)</span>
            <span className="tabular-nums">
              -{formatPrice(subtotal - total)}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border-light pt-2">
          <span className="text-sm font-semibold text-text-primary">
            Total
          </span>
          <span className="text-base font-bold text-gold tabular-nums">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* ── Checkout button ───────────────────────────────────── */}
      <Button asChild variant="primary" size="default" className="w-full">
        <Link to="/checkout" onClick={onClose}>
          Proceed to Checkout
        </Link>
      </Button>

      {/* ── Continue shopping ─────────────────────────────────── */}
      <button
        type="button"
        onClick={onClose}
        className="w-full py-1.5 text-center text-xs font-medium text-text-muted underline-offset-4 hover:underline transition-colors duration-200"
      >
        Continue Shopping
      </button>

      {/* ── Trust note ────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-1.5 pt-1">
        <Lock className="size-3 text-text-muted" />
        <p className="text-[10px] text-text-muted">
          Secure checkout &bull; Free shipping above {formatPrice(10000)}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main: CartDrawer                                                   */
/* ------------------------------------------------------------------ */

function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    getItemCount,
  } = useCartStore();

  const itemCount = getItemCount();
  const isEmpty = items.length === 0;

  /* ── Header ────────────────────────────────────────────────── */

  const drawerHeader = (
    <div className="flex items-center gap-2">
      <h2 className="font-display text-lg font-semibold text-text-primary">
        Your Cart
      </h2>
      {itemCount > 0 && (
        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-white">
          {itemCount}
        </span>
      )}
    </div>
  );

  /* ── Footer ────────────────────────────────────────────────── */

  const drawerFooter = isEmpty ? undefined : <CartFooter onClose={closeCart} />;

  /* ── Render ────────────────────────────────────────────────── */

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      side="right"
      header={drawerHeader}
      footer={drawerFooter}
    >
      {isEmpty ? (
        <EmptyCart onClose={closeCart} />
      ) : (
        <div className="space-y-0">
          {/* ── Reservation Timer ─────────────────────────────── */}
          <div className="mb-4">
            <ReservationTimer />
          </div>

          {/* ── Cart Items ────────────────────────────────────── */}
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </AnimatePresence>

          {/* ── Promo Code ────────────────────────────────────── */}
          <PromoSection />

          {/* ── Upsell ────────────────────────────────────────── */}
          <UpsellSection />
        </div>
      )}
    </Drawer>
  );
}

CartDrawer.displayName = "CartDrawer";

export { CartDrawer };
