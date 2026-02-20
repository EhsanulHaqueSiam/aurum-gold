"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { testimonials } from "@/data/products";
import { RatingStars } from "@/components/shared/RatingStars";

/* ─── Constants ──────────────────────────────────────────── */

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 6000;

/* ─── Component ──────────────────────────────────────────── */

export function Testimonials() {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (newDirection: number) => {
      setCurrent(([prev]) => {
        const next =
          (prev + newDirection + testimonials.length) % testimonials.length;
        return [next, newDirection];
      });
    },
    [],
  );

  const goTo = useCallback(
    (index: number) => {
      setCurrent(([prev]) => [index, index > prev ? 1 : -1]);
    },
    [],
  );

  /* Auto-advance */
  useEffect(() => {
    const timer = setInterval(() => paginate(1), AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paginate, current]);

  const testimonial = testimonials[current];

  return (
    <section className="relative bg-bg-dark grain-overlay py-24 md:py-32 overflow-hidden">
      {/* Large Decorative Quotation Mark */}
      <div
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 select-none font-display text-gold/20"
        style={{ fontSize: "80px", lineHeight: 1 }}
        aria-hidden="true"
      >
        &#10077;
      </div>

      <Container className="relative z-10">
        {/* ── Section Header ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: REVEAL_EASE }}
          className="mb-16 text-center"
        >
          <span className="mb-4 block text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
            What Our Customers Say
          </span>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            Trusted by 50,000+ Customers
          </h2>
        </motion.div>

        {/* ── Testimonial Carousel ──────────────────────────── */}
        <div className="relative mx-auto max-w-3xl">
          {/* Navigation Arrows — Positioned on Sides */}
          <button
            onClick={() => paginate(-1)}
            className={cn(
              "absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex",
              "size-12 items-center justify-center",
              "border border-gold/40 text-gold",
              "transition-all duration-300",
              "hover:bg-gold hover:text-white",
            )}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            onClick={() => paginate(1)}
            className={cn(
              "absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 md:flex",
              "size-12 items-center justify-center",
              "border border-gold/40 text-gold",
              "transition-all duration-300",
              "hover:bg-gold hover:text-white",
            )}
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </button>

          {/* Content Area */}
          <div className="relative min-h-[320px] flex items-center justify-center px-4 md:px-16">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={testimonial.id}
                custom={direction}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.5, ease: REVEAL_EASE },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: REVEAL_EASE },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-16"
              >
                {/* Star Rating */}
                <div className="mb-6">
                  <RatingStars rating={testimonial.rating} size="md" />
                </div>

                {/* Quote Text */}
                <blockquote className="font-accent italic text-xl leading-relaxed text-white/80 md:text-2xl">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>

                {/* Customer Info */}
                <div className="mt-8">
                  <p className="font-display font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.15em] text-gold/60">
                    {testimonial.location}
                  </p>
                  <p className="mt-2 text-xs text-white/40">
                    Purchased: {testimonial.product}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="mt-6 flex items-center justify-center gap-6 md:hidden">
            <button
              onClick={() => paginate(-1)}
              className={cn(
                "flex size-10 items-center justify-center",
                "border border-gold/40 text-gold",
                "transition-all duration-300",
                "hover:bg-gold hover:text-white",
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              onClick={() => paginate(1)}
              className={cn(
                "flex size-10 items-center justify-center",
                "border border-gold/40 text-gold",
                "transition-all duration-300",
                "hover:bg-gold hover:text-white",
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="mt-10 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  "h-2 rounded-full transition-all duration-500",
                  i === current
                    ? "w-6 bg-gold"
                    : "w-2 bg-white/20 hover:bg-white/40",
                )}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
