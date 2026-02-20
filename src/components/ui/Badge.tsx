import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─── Variant Styles ──────────────────────────────────────── */

const variantStyles = {
  trending:
    "bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white",
  new: "bg-bg-dark text-white",
  sale: "bg-error text-white",
  bestseller:
    "bg-transparent border border-gold text-gold",
} as const;

/* ─── Types ───────────────────────────────────────────────── */

export type BadgeVariant = keyof typeof variantStyles;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

/* ─── Component ───────────────────────────────────────────── */

function Badge({
  className,
  variant = "new",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5",
        "text-[10px] font-semibold uppercase tracking-wider leading-none",
        "rounded-sm select-none whitespace-nowrap",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

Badge.displayName = "Badge";

export { Badge };
