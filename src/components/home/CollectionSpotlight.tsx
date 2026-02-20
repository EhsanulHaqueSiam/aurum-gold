import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { collections } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════
   COLLECTION SPOTLIGHT — "Editorial Spreads"
   Each collection is presented as a full-width editorial
   spread -- a cinematic, full-bleed hero image with text
   overlaid for maximum visual impact. Parallax scrolling
   on the images creates a sense of depth. Alternating text
   placement (right, then left) keeps the rhythm dynamic,
   like turning pages in a luxury magazine.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Animation Variants ─────────────────────────────────── */

const textReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineGrow = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/* ─── Single Collection Spread (Full-Width Editorial) ───── */

interface SpreadProps {
  collection: (typeof collections)[0];
  /** Whether text is positioned on the left (true) or right (false) */
  textLeft?: boolean;
  index: number;
}

function CollectionSpread({ collection, textLeft = false, index }: SpreadProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-100px" });

  /* Parallax: image moves slower than scroll */
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.02, 1.08]);

  return (
    <div
      ref={rowRef}
      className="relative overflow-hidden"
      style={{ minHeight: "min(90vh, 800px)" }}
    >
      {/* ── Full-bleed parallax image ──────────────────────── */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={{ y: imageY, scale: imageScale }}
      >
        <OptimizedImage
          src={collection.image}
          alt={collection.name}
          fill
          darkBg
          shimmer
          fadeDuration={1}
          className="absolute inset-[-5%] w-[110%] h-[110%]"
        />
      </motion.div>

      {/* ── Cinematic gradient overlay ─────────────────────── */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: textLeft
            ? `
                linear-gradient(to right, rgba(26,20,18,0.88) 0%, rgba(26,20,18,0.55) 45%, rgba(26,20,18,0.1) 75%, transparent 100%),
                linear-gradient(to top, rgba(26,20,18,0.5) 0%, transparent 30%),
                linear-gradient(to bottom, rgba(26,20,18,0.3) 0%, transparent 20%)
              `
            : `
                linear-gradient(to left, rgba(26,20,18,0.88) 0%, rgba(26,20,18,0.55) 45%, rgba(26,20,18,0.1) 75%, transparent 100%),
                linear-gradient(to top, rgba(26,20,18,0.5) 0%, transparent 30%),
                linear-gradient(to bottom, rgba(26,20,18,0.3) 0%, transparent 20%)
              `,
        }}
      />

      {/* ── Grain texture ──────────────────────────────────── */}
      <div className="grain-overlay absolute inset-0 z-[3] pointer-events-none" />

      {/* ── Text content overlay ───────────────────────────── */}
      <div className="relative z-10 flex items-center" style={{ minHeight: "min(90vh, 800px)" }}>
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-8",
              "items-center",
            )}
          >
            {/* Spacer on the image side */}
            <div className={cn("hidden lg:block", textLeft ? "order-2" : "order-1")} />

            {/* Text content */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className={cn(
                "py-16 md:py-20 lg:py-24",
                textLeft ? "order-1" : "order-2 lg:order-2",
              )}
            >
              {/* Collection number / overline */}
              <motion.div
                variants={fadeUp}
                className="flex items-center gap-3 mb-6"
              >
                <span className="text-[11px] font-medium tracking-[0.3em] uppercase text-gold/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="w-8 h-px bg-gold/30" />
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/30">
                  Signature Collection
                </span>
              </motion.div>

              {/* Gold decorative line */}
              <motion.div
                variants={lineGrow}
                className="mb-8 h-px w-16 origin-left"
                style={{
                  background: "linear-gradient(90deg, #C9A050 0%, transparent 100%)",
                }}
              />

              {/* Collection Name -- large, editorial */}
              <motion.h3
                variants={fadeUp}
                className="font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-6xl xl:text-7xl"
              >
                {collection.name.replace(" Collection", "")}
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mt-6 font-accent text-xl italic leading-relaxed text-white/50 md:text-2xl max-w-lg"
              >
                {collection.description}
              </motion.p>

              {/* Product count */}
              <motion.p
                variants={fadeUp}
                className="mt-3 text-sm text-white/25 tracking-wide"
              >
                {collection.productCount} handcrafted pieces
              </motion.p>

              {/* CTA */}
              <motion.div variants={fadeUp}>
                <Link
                  to="/shop"
                  search={{ collection: collection.slug }}
                  className={cn(
                    "group mt-10 inline-flex items-center gap-4",
                    "text-[13px] font-medium uppercase tracking-[0.15em]",
                    "text-gold hover:text-gold-light",
                    "transition-colors duration-300",
                  )}
                >
                  <span className="relative">
                    Explore Collection
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-light group-hover:w-full transition-all duration-500" />
                  </span>
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  <div className="h-px w-12 bg-white/10 group-hover:bg-gold/30 transition-colors duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Gold edge accent (top) ─────────────────────────── */}
      <div className="absolute top-0 left-0 right-0 z-[4] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      {/* ── Gold edge accent (bottom) ──────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 z-[4] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */

export function CollectionSpotlight() {
  const featured = collections.slice(0, 4);

  return (
    <section>
      {featured.map((collection, i) => (
        <CollectionSpread
          key={collection.id}
          collection={collection}
          textLeft={i % 2 === 1}
          index={i}
        />
      ))}
    </section>
  );
}
