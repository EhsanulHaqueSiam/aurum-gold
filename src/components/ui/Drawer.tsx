import {
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
  type HTMLAttributes,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Types ───────────────────────────────────────────────── */

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** Slide direction — defaults to "right" */
  side?: "right" | "bottom";
  /** Optional header content */
  header?: ReactNode;
  /** Optional sticky footer content */
  footer?: ReactNode;
  /** Scrollable body content */
  children: ReactNode;
  className?: string;
}

/* ─── Animation Variants ──────────────────────────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  right: {
    hidden: { x: "100%" },
    visible: { x: 0 },
  },
  bottom: {
    hidden: { y: "100%" },
    visible: { y: 0 },
  },
} as const;

const transition = {
  type: "spring" as const,
  damping: 30,
  stiffness: 300,
};

/* ─── Component ───────────────────────────────────────────── */

function Drawer({
  open,
  onClose,
  side = "right",
  header,
  footer,
  children,
  className,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /* ── Escape key ────────────────────────────────────────── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while drawer is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, handleKeyDown]);

  /* ── Focus panel on open ───────────────────────────────── */
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  const variants = panelVariants[side];

  const positionClasses =
    side === "right"
      ? "right-0 top-0 h-full w-full sm:w-[420px]"
      : "bottom-0 left-0 w-full max-h-[85vh] rounded-t-lg";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          {/* ── Backdrop ──────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 bg-bg-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden
          />

          {/* ── Panel ─────────────────────────────────────── */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
            className={cn(
              "absolute flex flex-col bg-bg-primary shadow-2xl outline-none",
              positionClasses,
              className,
            )}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
          >
            {/* ── Header ──────────────────────────────────── */}
            <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
              <div className="flex-1">{header}</div>
              <button
                type="button"
                onClick={onClose}
                className={cn(
                  "ml-4 inline-flex size-9 items-center justify-center rounded-sm",
                  "text-text-muted transition-colors duration-200",
                  "hover:bg-bg-tertiary hover:text-text-primary",
                )}
                aria-label="Close drawer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* ── Body (scrollable) ───────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-4">
              {children}
            </div>

            {/* ── Footer (sticky) ─────────────────────────── */}
            {footer && (
              <div className="sticky bottom-0 border-t border-border-light bg-bg-primary px-6 py-4">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

Drawer.displayName = "Drawer";

export { Drawer };
