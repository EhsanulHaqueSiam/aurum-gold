"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { socialProofData } from "@/data/products";

/* ─── Animation Variants ─────────────────────────────────── */

const notificationVariants = {
  initial: { opacity: 0, x: -100, y: 20 },
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Helpers ────────────────────────────────────────────── */

function getRandomInterval(): number {
  return Math.floor(Math.random() * (30000 - 15000 + 1)) + 15000;
}

function getRandomMinutes(): string {
  const mins = Math.floor(Math.random() * 15) + 1;
  return `${mins} minute${mins === 1 ? "" : "s"} ago`;
}

/* ─── Component ──────────────────────────────────────────── */

export function SocialProofNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);
  const [timeAgoText, setTimeAgoText] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = useCallback(() => {
    if (isDismissed) return;

    setCurrentIndex((prev) => (prev + 1) % socialProofData.length);
    setTimeAgoText(getRandomMinutes());
    setIsVisible(true);

    // Auto-hide after 4 seconds
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delay before first notification (8s)
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 8000);

    return () => clearTimeout(initialTimer);
  }, [isDismissed, showNotification]);

  useEffect(() => {
    if (isDismissed) return;

    if (!isVisible) {
      // Schedule next notification after random interval
      timerRef.current = setTimeout(showNotification, getRandomInterval());
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isVisible, isDismissed, showNotification]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  };

  const current = socialProofData[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          variants={notificationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={cn(
            "fixed bottom-6 left-4 md:left-6 z-50",
            "max-w-sm",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-3",
              "bg-white border border-border-light rounded-sm",
              "px-4 py-3",
              "shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
            )}
          >
            {/* Product Thumbnail */}
            <div
              className={cn(
                "flex-shrink-0 flex items-center justify-center",
                "w-10 h-10 bg-bg-secondary rounded-sm",
              )}
            >
              <ShoppingBag className="size-5 text-gold" strokeWidth={1.5} />
            </div>

            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary leading-snug">
                <span className="font-semibold">{current.name}</span>{" "}
                <span className="text-text-body">from {current.location}</span>
              </p>
              <p className="text-xs text-text-muted mt-0.5">
                just purchased{" "}
                <span className="text-gold font-medium">{current.product}</span>
              </p>
              <p className="text-[10px] text-text-light mt-1">{timeAgoText}</p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              className={cn(
                "flex-shrink-0 flex items-center justify-center",
                "w-6 h-6 -mr-1 -mt-1",
                "text-text-light transition-colors duration-200",
                "hover:text-text-muted",
              )}
              aria-label="Dismiss notification"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
