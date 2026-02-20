"use client";

import { TrendingUp, TrendingDown, Clock } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { timeAgo } from "@/lib/utils";
import { goldRates } from "@/data/products";

/* ─── Types ──────────────────────────────────────────────── */

interface GoldRateDisplayProps {
  compact?: boolean;
  className?: string;
}

/* ─── Component ──────────────────────────────────────────── */

export function GoldRateDisplay({
  compact = false,
  className,
}: GoldRateDisplayProps) {
  // Filter rates for compact mode (22K, 18K, 14K) or show all
  const displayRates = compact
    ? goldRates.filter((r) => r.purity !== "24K")
    : goldRates;

  const lastUpdated = goldRates[0]?.lastUpdated;

  /* ── Compact Mode (Header) ──────────────────────────── */
  if (compact) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {displayRates.map((rate) => (
          <div
            key={rate.purity}
            className="flex items-center gap-1.5 text-xs"
          >
            <span className="text-text-muted font-medium">{rate.purity}:</span>
            <span className="tabular-nums text-text-primary font-semibold">
              {formatPrice(rate.pricePerGram)}
            </span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5",
                "text-[10px] tabular-nums",
                rate.change24h >= 0 ? "text-success" : "text-error",
              )}
            >
              {rate.change24h >= 0 ? (
                <TrendingUp className="size-2.5" />
              ) : (
                <TrendingDown className="size-2.5" />
              )}
              {rate.change24h >= 0 ? "+" : ""}
              {rate.change24h.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    );
  }

  /* ── Full Mode (Standalone Section) ─────────────────── */
  return (
    <div
      className={cn(
        "bg-bg-secondary border border-border-light rounded-sm p-5 md:p-6",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-text-primary">
            Today&apos;s Gold Rate
          </h3>
          <p className="text-xs text-text-muted mt-0.5">
            Price per gram (incl. GST)
          </p>
        </div>

        {lastUpdated && (
          <div className="flex items-center gap-1.5 text-xs text-text-light">
            <Clock className="size-3" />
            <span>Updated {timeAgo(lastUpdated)}</span>
          </div>
        )}
      </div>

      {/* Rate Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayRates.map((rate) => (
          <div
            key={rate.purity}
            className={cn(
              "flex flex-col items-center p-4",
              "bg-white border border-border-light rounded-sm",
              "transition-all duration-300",
              "hover:border-gold/40 hover:shadow-sm",
            )}
          >
            {/* Purity Label */}
            <span
              className={cn(
                "text-[10px] font-semibold uppercase tracking-wider",
                "text-gold bg-gold/10 px-2 py-0.5 rounded-sm mb-3",
              )}
            >
              {rate.purity}
            </span>

            {/* Price */}
            <span className="font-display text-lg font-bold text-text-primary tabular-nums">
              {formatPrice(rate.pricePerGram)}
            </span>
            <span className="text-[10px] text-text-muted mt-0.5">/gram</span>

            {/* 24h Change */}
            <div
              className={cn(
                "flex items-center gap-1 mt-2",
                "text-xs font-medium tabular-nums",
                rate.change24h >= 0 ? "text-success" : "text-error",
              )}
            >
              {rate.change24h >= 0 ? (
                <TrendingUp className="size-3" />
              ) : (
                <TrendingDown className="size-3" />
              )}
              <span>
                {rate.change24h >= 0 ? "+" : ""}
                {rate.change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
