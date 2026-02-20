import { useRef, useCallback, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { heroImages } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════
   AURUM HERO — "Photo-Forward Editorial"
   A cinematic, photography-driven hero that showcases jewellery
   the way Tiffany, Cartier, and Bulgari do: with stunning
   imagery front and center. The CSS golden ring remains as a
   floating decorative accent, not the main visual.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Marquee Data ───────────────────────────────────────── */

const marqueeItems = [
  "BIS HALLMARKED",
  "FREE INSURED SHIPPING",
  "30-DAY RETURNS",
  "LIFETIME WARRANTY",
  "CERTIFIED PURITY",
  "22K & 18K GOLD",
  "HANDCRAFTED",
  "ETHICALLY SOURCED",
];

function MarqueeStrip() {
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 overflow-hidden border-t border-white/[0.06] bg-black/30 backdrop-blur-md">
      <motion.div
        className="flex whitespace-nowrap py-3"
        animate={{ x: [0, -(marqueeItems.length * 220)] }}
        transition={{
          x: { duration: 35, repeat: Infinity, ease: "linear" },
        }}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center mx-6 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mr-6" />
            <span
              className="text-[10px] font-medium tracking-[0.25em] text-white/40"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item}
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Decorative CSS Golden Ring (smaller, accent element) ─ */

function GoldenRingAccent() {
  return (
    <div className="relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px]">
      {/* Outer glow */}
      <div
        className="absolute inset-[-20%] rounded-full opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(201,160,80,0.2) 0%, transparent 70%)",
        }}
      />

      {/* Main ring - conic gradient for metallic look */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(
            from 0deg,
            #A07830 0deg,
            #E8D5A8 45deg,
            #C9A050 90deg,
            #D4B978 135deg,
            #A07830 180deg,
            #E8D5A8 225deg,
            #C9A050 270deg,
            #D4B978 315deg,
            #A07830 360deg
          )`,
          mask: "radial-gradient(circle, transparent 60%, black 61%, black 78%, transparent 79%)",
          WebkitMask: "radial-gradient(circle, transparent 60%, black 61%, black 78%, transparent 79%)",
        }}
      />

      {/* Light reflection streak */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255,255,255,0.2) 10deg,
            transparent 30deg,
            transparent 360deg
          )`,
          mask: "radial-gradient(circle, transparent 58%, black 59%, black 80%, transparent 81%)",
          WebkitMask: "radial-gradient(circle, transparent 58%, black 59%, black 80%, transparent 81%)",
        }}
      />

      {/* Center diamond */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-2 h-2 rotate-45 bg-gold/50"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

/* ─── Theatrical Entrance Variants ───────────────────────── */

const curtainVariants = {
  initial: { scaleY: 1 },
  animate: {
    scaleY: 0,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
  },
};

const imageReveal = {
  initial: { opacity: 0, scale: 1.05 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
  },
};

const textReveal = {
  initial: { opacity: 0, y: 60, skewY: 3 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: 1.0 + i * 0.15,
    },
  }),
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 1.6 + i * 0.1,
    },
  }),
};

const marqueeReveal = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 2.2 },
  },
};

const ringFloat = {
  initial: { opacity: 0, scale: 0.6, rotate: -20 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.8 },
  },
};

/* ─── Main Component ─────────────────────────────────────── */

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasMounted, setHasMounted] = useState(false);

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  /* Mouse spotlight */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const spotlightX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const spotlightY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <motion.section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className={cn(
        "relative min-h-[100svh] overflow-hidden",
        "bg-bg-dark",
      )}
      style={{ opacity: bgOpacity }}
    >
      {/* ── Theatrical curtain reveal ─────────────────────── */}
      <AnimatePresence>
        {hasMounted && (
          <>
            <motion.div
              className="absolute inset-0 z-50 bg-bg-dark origin-top"
              variants={curtainVariants}
              initial="initial"
              animate="animate"
              style={{ pointerEvents: "none" }}
            />
            <motion.div
              className="absolute inset-0 z-[49] bg-bg-dark origin-bottom"
              initial={{ scaleY: 1 }}
              animate={{
                scaleY: 0,
                transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1], delay: 0.4 },
              }}
              style={{ pointerEvents: "none" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* ── Full-bleed hero image (primary visual) ─────────── */}
      <motion.div
        className="absolute inset-0 z-[1]"
        variants={imageReveal}
        initial="initial"
        animate="animate"
        style={{ y: imageY }}
      >
        <OptimizedImage
          src={heroImages.main}
          alt="Gold jewellery editorial"
          fill
          darkBg
          shimmer
          fadeDuration={1.2}
          className="absolute inset-0 w-full h-[calc(100%+80px)]"
          style={{ objectPosition: "center 30%" }}
        />
      </motion.div>

      {/* ── Cinematic overlay gradients ─────────────────────── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: `
            linear-gradient(to right, rgba(26,20,18,0.92) 0%, rgba(26,20,18,0.6) 40%, rgba(26,20,18,0.15) 70%, rgba(26,20,18,0.05) 100%),
            linear-gradient(to top, rgba(26,20,18,0.8) 0%, transparent 40%)
          `,
        }}
      />

      {/* ── Subtle diagonal light rays ─────────────────────── */}
      <div
        className="absolute inset-0 z-[3] opacity-[0.02]"
        style={{
          background: `
            repeating-linear-gradient(
              -35deg,
              transparent,
              transparent 80px,
              rgba(201,160,80,0.15) 80px,
              rgba(201,160,80,0.15) 81px
            )
          `,
        }}
      />

      {/* ── Mouse spotlight ───────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]: number[]) =>
              `radial-gradient(600px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(201,160,80,0.06) 0%, transparent 60%)`,
          ),
        }}
      />

      {/* ── Grain overlay ─────────────────────────────────── */}
      <div className="grain-overlay absolute inset-0 z-[5] pointer-events-none" />

      {/* ── Content: editorial typography on left, photo right ── */}
      <div className="relative z-10 h-[100svh] flex items-center">
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-center">

            {/* ─── LEFT: Editorial typography ──────────── */}
            <motion.div
              className="relative lg:max-w-[600px]"
              style={{ y: textY }}
            >
              {/* Overline */}
              <motion.div
                className="flex items-center gap-3 mb-6 lg:mb-8"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                custom={0}
              >
                <div className="w-8 h-px bg-gold/50" />
                <span
                  className="text-[10px] font-medium tracking-[0.3em] text-gold/70 uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Est. 1947 — Master Goldsmiths
                </span>
              </motion.div>

              {/* Main heading - editorial scale */}
              <div className="relative mb-6 lg:mb-10">
                <div className="overflow-hidden">
                  <motion.div
                    variants={textReveal}
                    initial="initial"
                    animate="animate"
                    custom={0}
                  >
                    <span
                      className="block font-display text-white/90 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight"
                    >
                      Where Gold
                    </span>
                  </motion.div>
                </div>

                <div className="overflow-hidden">
                  <motion.div
                    variants={textReveal}
                    initial="initial"
                    animate="animate"
                    custom={1}
                  >
                    <span
                      className="block font-display text-white/90 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] tracking-tight"
                    >
                      Becomes
                    </span>
                  </motion.div>
                </div>

                {/* "Art" -- MASSIVE, overlapping, editorial */}
                <div className="overflow-hidden relative">
                  <motion.div
                    variants={textReveal}
                    initial="initial"
                    animate="animate"
                    custom={2}
                  >
                    <span
                      className={cn(
                        "block font-display italic font-bold",
                        "text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]",
                        "leading-[0.85] -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8",
                        "text-gold-shimmer",
                      )}
                    >
                      Art
                    </span>
                  </motion.div>

                  {/* Subtle reflected text effect */}
                  <motion.span
                    className={cn(
                      "absolute left-0 font-display italic font-bold",
                      "text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem]",
                      "leading-[0.85] top-0 -mt-2 sm:-mt-4 md:-mt-6 lg:-mt-8",
                      "text-transparent",
                      "pointer-events-none select-none",
                    )}
                    style={{
                      WebkitTextStroke: "1px rgba(201,160,80,0.12)",
                    }}
                    variants={textReveal}
                    initial="initial"
                    animate="animate"
                    custom={2.5}
                  >
                    Art
                  </motion.span>
                </div>
              </div>

              {/* Decorative line */}
              <motion.div
                className="w-16 h-px mb-6 lg:mb-8 origin-left"
                style={{
                  background: "linear-gradient(90deg, #C9A050 0%, transparent 100%)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.8,
                }}
              />

              {/* Subheading */}
              <motion.p
                className="font-accent italic text-white/40 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-md mb-8 lg:mb-12"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                custom={1}
              >
                Handcrafted in 22K gold by three generations
                of master artisans. Every piece hallmarked,
                every detail perfected.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                custom={2}
              >
                <Link
                  to="/shop"
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-3",
                    "h-14 px-10",
                    "bg-gold text-white",
                    "font-medium text-[13px] uppercase tracking-[0.15em]",
                    "rounded-none",
                    "transition-all duration-500",
                    "hover:bg-gold-light hover:shadow-[0_0_40px_rgba(201,160,80,0.25)]",
                    "hover:tracking-[0.2em]",
                  )}
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                  {/* Bottom shine */}
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>

                <Link
                  to="/shop"
                  search={{ sort: "bestseller" }}
                  className={cn(
                    "group inline-flex items-center gap-3",
                    "h-14 px-8",
                    "text-white/50 hover:text-white/90",
                    "font-medium text-[13px] uppercase tracking-[0.15em]",
                    "transition-all duration-500",
                  )}
                >
                  <span className="relative">
                    Shop Bestsellers
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-500" />
                  </span>
                  <ArrowRight className="size-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                </Link>
              </motion.div>

              {/* Stats strip */}
              <motion.div
                className="flex items-center gap-6 mt-12 lg:mt-16"
                variants={fadeUp}
                initial="initial"
                animate="animate"
                custom={3}
              >
                {[
                  { value: "50K+", label: "Happy Customers" },
                  { value: "7,000+", label: "Designs" },
                  { value: "99.9%", label: "Purity Certified" },
                ].map((stat, i) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-8 bg-white/10" />}
                    <div>
                      <div className="font-display text-gold text-lg md:text-xl font-semibold">
                        {stat.value}
                      </div>
                      <div className="text-[10px] tracking-[0.15em] uppercase text-white/30">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ─── RIGHT: Space for the hero photo to breathe ── */}
            {/* The full-bleed background image occupies this area */}
            {/* Floating golden ring accent overlaps the image */}
            <motion.div
              className="hidden lg:flex items-end justify-end relative"
              variants={ringFloat}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="absolute -bottom-8 -right-4 xl:bottom-4 xl:right-8"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <GoldenRingAccent />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Secondary image peek (bottom-right, editorial crop) ── */}
      <motion.div
        className="absolute bottom-20 right-0 z-[8] hidden xl:block"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 2.0 }}
      >
        <div className="relative w-[200px] h-[280px] overflow-hidden border-l-2 border-gold/20">
          <OptimizedImage
            src={heroImages.necklace}
            alt="Gold necklace detail"
            fill
            darkBg
            shimmer
            className="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-bg-dark/40" />
        </div>
      </motion.div>

      {/* ── Scroll indicator ──────────────────────────────── */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
          Scroll
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
        />
      </motion.div>

      {/* ── Marquee trust strip at bottom ─────────────────── */}
      <motion.div
        variants={marqueeReveal}
        initial="initial"
        animate="animate"
      >
        <MarqueeStrip />
      </motion.div>
    </motion.section>
  );
}
