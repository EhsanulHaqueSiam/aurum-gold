import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Radio } from "lucide-react";
import { cn, formatPrice, formatWeight } from "@/lib/utils";
import type { Product, GoldRate } from "@/types/product";

/* ─── Props ──────────────────────────────────────────────── */

interface PriceBreakdownProps {
  product: Product;
  goldRate: GoldRate;
  className?: string;
}

/* ─── Animation Variants ─────────────────────────────────── */

const contentVariants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Row Sub-Component ──────────────────────────────────── */

function BreakdownRow({
  label,
  value,
  detail,
  badge,
  muted = false,
}: {
  label: string;
  value: string;
  detail?: string;
  badge?: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between py-2.5",
        "border-b border-border-light last:border-b-0",
      )}
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm",
              muted ? "text-text-muted" : "text-text-body",
            )}
          >
            {label}
          </span>
          {badge}
        </div>
        {detail && (
          <span className="text-[11px] text-text-muted">{detail}</span>
        )}
      </div>
      <span
        className={cn(
          "text-sm tabular-nums font-medium shrink-0 ml-4",
          muted ? "text-text-muted" : "text-text-primary",
        )}
      >
        {value}
      </span>
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */

function PriceBreakdown({
  product,
  goldRate,
  className,
}: PriceBreakdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const goldValue = product.netWeight * goldRate.pricePerGram;

  return (
    <div className={cn("rounded-sm border border-border-light", className)}>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-bg-secondary/50 transition-colors duration-200"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-medium text-text-primary">
          View Price Breakdown
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronDown className="size-4 text-text-muted" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {/* Gold value */}
              <BreakdownRow
                label="Gold Value"
                value={formatPrice(goldValue)}
                detail={`${formatWeight(product.netWeight)} x ${formatPrice(goldRate.pricePerGram)}/g (${product.purity})`}
                badge={
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-success/10 text-[10px] font-semibold uppercase tracking-wider text-success">
                    <Radio className="size-2.5" />
                    Live Rate
                  </span>
                }
              />

              {/* Making charges */}
              <BreakdownRow
                label="Making Charges"
                value={formatPrice(product.makingCharges)}
                muted
              />

              {/* Stone charges (conditional) */}
              {product.stoneCharges != null && product.stoneCharges > 0 && (
                <BreakdownRow
                  label="Stone Charges"
                  value={formatPrice(product.stoneCharges)}
                  detail={
                    product.stoneType
                      ? `${product.stoneType}${product.stoneWeight ? ` (${formatWeight(product.stoneWeight)})` : ""}`
                      : undefined
                  }
                  muted
                />
              )}

              {/* GST */}
              <BreakdownRow
                label="GST (3%)"
                value={formatPrice(product.gst)}
                muted
              />

              {/* ── Total ──────────────────────────────────────── */}
              <div className="flex items-center justify-between pt-3 mt-1 border-t-2 border-gold">
                <span className="text-sm font-bold text-text-primary">
                  Total Price
                </span>
                <span className="text-base font-bold text-text-primary tabular-nums">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Savings note */}
              {product.originalPrice != null &&
                product.originalPrice > product.price && (
                  <div className="mt-2 px-3 py-2 rounded-sm bg-success/5 border border-success/15">
                    <p className="text-[11px] text-success font-medium">
                      You save{" "}
                      {formatPrice(product.originalPrice - product.price)} on
                      this purchase
                    </p>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

PriceBreakdown.displayName = "PriceBreakdown";

export { PriceBreakdown };
