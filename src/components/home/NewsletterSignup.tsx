"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

/* ─── Constants ──────────────────────────────────────────── */

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Component ──────────────────────────────────────────── */

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <section className="relative bg-bg-dark grain-overlay overflow-hidden">
      {/* Gold Top Border — gradient line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      <Container className="relative z-10 py-24 md:py-32">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* ── Left Side (60%) — Text Content ─────────────── */}
          <motion.div
            className="w-full lg:w-[60%]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: REVEAL_EASE }}
          >
            {/* Overline */}
            <span className="mb-5 block text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              The Aurum Circle
            </span>

            {/* Heading */}
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Be First to Know
            </h2>

            {/* Subtext */}
            <p className="mt-5 max-w-lg font-accent text-lg italic leading-relaxed text-white/50">
              Get 10% off your first order, early access to new collections, and
              exclusive member-only offers.
            </p>

            {/* Form / Success State */}
            <div className="mt-10">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: REVEAL_EASE }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle
                      className="size-6 shrink-0 text-gold"
                      strokeWidth={1.5}
                    />
                    <p className="font-accent text-base italic text-gold">
                      Welcome to the Circle. Check your inbox for your 10% code.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className={cn(
                        "h-14 flex-1 px-5",
                        "bg-white/5 border border-white/10",
                        "text-white text-sm placeholder:text-white/30",
                        "outline-none transition-all duration-300",
                        "focus:border-gold focus:ring-1 focus:ring-gold/20",
                      )}
                    />

                    <button
                      type="submit"
                      disabled={isLoading}
                      className={cn(
                        "inline-flex h-14 items-center justify-center gap-2 px-8",
                        "bg-gold text-white font-medium text-sm uppercase tracking-wider",
                        "transition-all duration-300",
                        "hover:bg-gold-light",
                        "disabled:opacity-50 disabled:pointer-events-none",
                      )}
                    >
                      {isLoading ? (
                        <div className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      ) : (
                        <>
                          Subscribe
                          <Send className="size-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Privacy Note */}
              {!isSubmitted && (
                <p className="mt-3 text-[11px] text-white/20">
                  By subscribing you agree to our Privacy Policy. Unsubscribe
                  anytime.
                </p>
              )}
            </div>
          </motion.div>

          {/* ── Right Side (40%) — Decorative Element ──────── */}
          <motion.div
            className="pointer-events-none relative hidden w-full select-none lg:block lg:w-[40%]"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: REVEAL_EASE }}
            aria-hidden="true"
          >
            <div className="relative flex flex-col items-end">
              {/* Giant "10%" watermark */}
              <span
                className="font-display font-bold leading-none text-white/[0.03]"
                style={{ fontSize: "clamp(140px, 12vw, 180px)" }}
              >
                10%
              </span>

              {/* Overline below */}
              <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-gold/30">
                Off Your First Order
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
