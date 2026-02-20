import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slot } from "./Slot";

/* ─── Variant & Size Maps ─────────────────────────────────── */

const variantStyles = {
  primary:
    "bg-gold text-white hover:bg-gold-dark active:bg-gold-dark shadow-sm",
  secondary:
    "bg-transparent border border-text-primary text-text-primary hover:bg-bg-dark hover:text-white hover:border-bg-dark",
  ghost:
    "bg-transparent border-none text-text-primary hover:underline underline-offset-4",
} as const;

const sizeStyles = {
  sm: "h-10 px-4 text-xs",
  default: "h-12 px-8 text-sm",
  lg: "h-14 px-10 text-sm",
} as const;

/* ─── Types ───────────────────────────────────────────────── */

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
  children: ReactNode;
}

/* ─── Slot helper (minimal asChild) ──────────────────────── */
// The real Slot is a separate tiny component (see below).
// When asChild is true we render the child element directly
// with merged props; otherwise we render a motion.button.

/* ─── Component ───────────────────────────────────────────── */

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      loading = false,
      disabled = false,
      asChild = false,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const classes = cn(
      // base
      "relative inline-flex items-center justify-center gap-2",
      "uppercase tracking-wide font-medium rounded-sm",
      "transition-colors duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
      "select-none whitespace-nowrap",
      // variant + size
      variantStyles[variant],
      sizeStyles[size],
      // disabled
      isDisabled && "pointer-events-none opacity-50",
      className,
    );

    /* ── asChild: render child element with merged classes ── */
    if (asChild) {
      return (
        <Slot ref={ref} className={classes} {...props}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {children}
            </>
          ) : (
            children
          )}
        </Slot>
      );
    }

    /* ── Standard motion.button ──────────────────────────── */
    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        whileTap={isDisabled ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        {...(props as Omit<HTMLMotionProps<"button">, "ref">)}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";

export { Button };
