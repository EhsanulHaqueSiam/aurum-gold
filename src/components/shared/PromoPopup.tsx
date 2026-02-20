"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";

/* ─── Animation Variants ─────────────────────────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.1 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Component ──────────────────────────────────────────── */

export function PromoPopup() {
  const { showPromoPopup, dismissPromoPopup } = useUIStore();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  /* Show popup after 5 seconds on first visit */
  useEffect(() => {
    if (!showPromoPopup) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [showPromoPopup]);

  const handleClose = () => {
    setIsVisible(false);
    dismissPromoPopup();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsUnlocked(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText("WELCOME10");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  /* Prevent background scrolling */
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        /* Overlay */
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-bg-dark/70 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "relative w-full max-w-md",
              "bg-bg-dark border border-white/10 rounded-sm",
              "overflow-hidden",
            )}
          >
            {/* Gold top accent */}
            <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-dark" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className={cn(
                "absolute top-4 right-4 z-10",
                "flex items-center justify-center",
                "w-8 h-8",
                "text-white/40 transition-colors duration-200",
                "hover:text-white",
              )}
              aria-label="Close popup"
            >
              <X className="size-5" />
            </button>

            {/* Content */}
            <div className="px-8 py-10 text-center">
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 flex items-center justify-center border border-gold/30 rounded-sm">
                  <Gift className="size-7 text-gold" strokeWidth={1.5} />
                </div>
              </div>

              {/* Heading */}
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
                Welcome to Aurum
              </h2>

              {/* Decorative Line */}
              <div className="w-12 h-px bg-gold mx-auto my-4" />

              {/* Offer */}
              <p className="font-display text-xl md:text-2xl font-bold text-gold mb-2">
                Get 10% Off Your First Order
              </p>

              {/* Sub-text */}
              <p className="text-sm text-text-light mb-8">
                Use code{" "}
                <span className="font-semibold text-gold">WELCOME10</span> at
                checkout
              </p>

              {isUnlocked ? (
                /* Unlocked State */
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Code Display */}
                  <div
                    className={cn(
                      "flex items-center justify-between",
                      "bg-white/5 border border-gold/40 rounded-sm",
                      "px-5 py-3",
                    )}
                  >
                    <span className="font-mono text-lg font-bold text-gold tracking-widest">
                      WELCOME10
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className={cn(
                        "flex items-center gap-1.5",
                        "text-xs uppercase tracking-wide text-white/60",
                        "transition-colors duration-200 hover:text-white",
                      )}
                    >
                      {isCopied ? (
                        <>
                          <Check className="size-3.5 text-success" />
                          <span className="text-success">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <a
                    href="/shop"
                    className={cn(
                      "inline-flex items-center justify-center",
                      "w-full h-12",
                      "bg-gold text-white font-medium text-sm uppercase tracking-wide",
                      "rounded-sm",
                      "transition-all duration-300",
                      "hover:bg-gold-dark",
                    )}
                    onClick={handleClose}
                  >
                    Start Shopping
                  </a>
                </motion.div>
              ) : (
                /* Email Form */
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className={cn(
                      "w-full h-12 px-5",
                      "bg-white/5 border border-white/15 rounded-sm",
                      "text-white text-sm placeholder:text-text-light/50",
                      "outline-none",
                      "transition-all duration-300",
                      "focus:border-gold/60 focus:bg-white/10",
                      "focus:ring-1 focus:ring-gold/30",
                    )}
                  />

                  <button
                    type="submit"
                    className={cn(
                      "inline-flex items-center justify-center",
                      "w-full h-12",
                      "bg-gold text-white font-medium text-sm uppercase tracking-wide",
                      "rounded-sm",
                      "transition-all duration-300",
                      "hover:bg-gold-dark hover:shadow-[0_0_20px_rgba(201,160,80,0.25)]",
                    )}
                  >
                    Unlock My 10% Off
                  </button>
                </form>
              )}

              {/* Privacy */}
              <p className="text-[10px] text-text-light/30 mt-6">
                By signing up you agree to our Terms & Privacy Policy.
                Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
