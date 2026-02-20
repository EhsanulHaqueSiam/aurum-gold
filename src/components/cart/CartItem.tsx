import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem as CartItemType } from "@/types/product";

/* ------------------------------------------------------------------ */
/*  Props                                                              */
/* ------------------------------------------------------------------ */

interface CartItemProps {
  item: CartItemType;
}

/* ------------------------------------------------------------------ */
/*  Metal label helper                                                 */
/* ------------------------------------------------------------------ */

function metalLabel(metal: string, purity: string): string {
  const metalNames: Record<string, string> = {
    gold: "Gold",
    silver: "Silver",
    platinum: "Platinum",
    "rose-gold": "Rose Gold",
    "white-gold": "White Gold",
  };
  return `${metalNames[metal] ?? metal} - ${purity}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore();
  const [confirmRemove, setConfirmRemove] = useState(false);

  const { product, quantity, selectedSize } = item;
  const lineTotal = product.price * quantity;

  /* ── Remove handler with confirmation ─────────────────────────── */

  const handleRemove = () => {
    if (confirmRemove) {
      removeItem(product.id);
    } else {
      setConfirmRemove(true);
      setTimeout(() => setConfirmRemove(false), 3000);
    }
  };

  /* ── Quantity handlers ────────────────────────────────────────── */

  const decrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const increment = () => {
    updateQuantity(product.id, quantity + 1);
  };

  /* ── Render ───────────────────────────────────────────────────── */

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="mb-4 overflow-hidden"
    >
      <div className="flex gap-4">
        {/* ── Product Image ──────────────────────────────────── */}
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* ── Product Details ────────────────────────────────── */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div className="space-y-0.5">
            {/* Name */}
            <h4 className="font-display text-sm font-medium text-text-primary truncate">
              {product.name}
            </h4>

            {/* Metal + Purity */}
            <p className="overline text-[10px]">
              {metalLabel(product.metal, product.purity)}
            </p>

            {/* Size */}
            {selectedSize && (
              <p className="text-[11px] text-text-muted">
                Size: {selectedSize}
              </p>
            )}
          </div>

          {/* ── Bottom row: quantity + price ──────────────────── */}
          <div className="mt-2 flex items-center justify-between">
            {/* Quantity controls */}
            <div className="flex items-center gap-0 border border-border-light rounded-sm">
              <button
                type="button"
                onClick={decrement}
                disabled={quantity <= 1}
                className={cn(
                  "flex h-7 w-7 items-center justify-center text-text-muted transition-colors duration-200",
                  "hover:bg-bg-secondary hover:text-text-primary",
                  "disabled:opacity-30 disabled:cursor-not-allowed",
                )}
                aria-label="Decrease quantity"
              >
                <Minus className="size-3" />
              </button>

              <span className="flex h-7 w-8 items-center justify-center text-xs font-medium tabular-nums text-text-primary border-x border-border-light">
                {quantity}
              </span>

              <button
                type="button"
                onClick={increment}
                className={cn(
                  "flex h-7 w-7 items-center justify-center text-text-muted transition-colors duration-200",
                  "hover:bg-bg-secondary hover:text-text-primary",
                )}
                aria-label="Increase quantity"
              >
                <Plus className="size-3" />
              </button>
            </div>

            {/* Price */}
            <span className="text-sm font-semibold text-text-primary tabular-nums">
              {formatPrice(lineTotal)}
            </span>
          </div>
        </div>

        {/* ── Remove button ──────────────────────────────────── */}
        <button
          type="button"
          onClick={handleRemove}
          className={cn(
            "flex-shrink-0 self-start mt-0.5 p-1.5 rounded-sm transition-colors duration-200",
            confirmRemove
              ? "bg-red-50 text-red-600"
              : "text-text-muted hover:text-red-500 hover:bg-red-50",
          )}
          aria-label={confirmRemove ? "Confirm remove" : "Remove item"}
          title={confirmRemove ? "Click again to remove" : "Remove item"}
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      {/* ── Confirm remove hint ──────────────────────────────── */}
      <AnimatePresence>
        {confirmRemove && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1 text-[10px] text-red-500 text-right"
          >
            Tap again to remove
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

CartItem.displayName = "CartItem";

export { CartItem };
