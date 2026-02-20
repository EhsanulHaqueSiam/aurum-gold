"use client";

import { motion } from "framer-motion";
import { Shield, Truck, RotateCcw, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

/* ─── Badge Data ─────────────────────────────────────────── */

const badges = [
  {
    icon: Shield,
    title: "BIS Hallmark Certified",
    description: "Every piece certified for purity & authenticity",
  },
  {
    icon: Truck,
    title: "Free Insured Shipping",
    description: "Complimentary shipping with full insurance cover",
  },
  {
    icon: RotateCcw,
    title: "30-Day Free Returns",
    description: "Hassle-free returns within 30 days of delivery",
  },
  {
    icon: Award,
    title: "Lifetime Warranty",
    description: "Free lifetime maintenance & polishing on all pieces",
  },
];

/* ─── Animation Variants ─────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Component ──────────────────────────────────────────── */

export function TrustBadges() {
  return (
    <section className="bg-bg-secondary py-10 md:py-14 border-y border-border-light">
      <Container>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.title}
              variants={itemVariants}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-12 h-12 mb-4",
                  "border border-gold/30 rounded-sm",
                  "transition-all duration-300",
                  "group-hover:border-gold group-hover:bg-gold/5",
                )}
              >
                <badge.icon
                  className="size-5 text-gold transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={1.5}
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-sm md:text-base font-semibold text-text-primary mb-1 tracking-wide">
                {badge.title}
              </h3>

              {/* Description */}
              <p className="text-xs text-text-muted leading-relaxed max-w-[200px]">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
