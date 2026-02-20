import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { categories } from "@/data/products";

/* ═══════════════════════════════════════════════════════════════
   FEATURED CATEGORIES — "Magazine Grid"
   Photo-first category grid. Each card is dominated by its
   photograph with minimal text overlaid. Asymmetric layout
   where the first category commands attention with a large
   portrait-format image, like a magazine spread.
   ═══════════════════════════════════════════════════════════════ */

/* ─── Animation Variants ─────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Category Card (Photo-Forward) ──────────────────────── */

interface CategoryCardProps {
  category: (typeof categories)[0];
  className?: string;
  aspectClass?: string;
  /** Show larger text on featured (first) card */
  featured?: boolean;
}

function CategoryCard({
  category,
  className,
  aspectClass = "aspect-[3/4]",
  featured = false,
}: CategoryCardProps) {
  return (
    <motion.div variants={cardVariants} className={className}>
      <Link
        to="/shop"
        search={{ category: category.slug }}
        className="group relative block overflow-hidden"
      >
        {/* Full-bleed photo */}
        <div className={cn("relative w-full overflow-hidden", aspectClass)}>
          <OptimizedImage
            src={category.image}
            alt={category.name}
            fill
            darkBg
            aspect={aspectClass}
            shimmer
            fadeDuration={0.8}
            className={cn(
              "absolute inset-0 w-full h-full",
              "transition-transform duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
              "group-hover:scale-[1.06]",
            )}
          />

          {/* Dark gradient overlay -- heavier at bottom for text legibility */}
          <div
            className={cn(
              "absolute inset-0 z-[1]",
              "bg-gradient-to-t from-[rgba(26,20,18,0.88)] via-[rgba(26,20,18,0.2)] to-transparent",
              "transition-all duration-600",
              "group-hover:from-[rgba(26,20,18,0.94)]",
            )}
          />

          {/* Subtle gold edge on hover */}
          <div
            className={cn(
              "absolute inset-0 z-[2] border-2 border-transparent",
              "transition-all duration-500",
              "group-hover:border-gold/20",
            )}
          />

          {/* Content at bottom */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 md:p-6 lg:p-8">
            {/* Item count overline */}
            <p
              className={cn(
                "mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40",
                "transition-all duration-500",
                "group-hover:text-gold/70",
              )}
            >
              {category.count} pieces
            </p>

            {/* Category name */}
            <h3
              className={cn(
                "font-display font-semibold text-white",
                "transition-transform duration-500",
                "group-hover:-translate-y-0.5",
                featured
                  ? "text-2xl md:text-3xl lg:text-4xl"
                  : "text-lg md:text-xl lg:text-2xl",
              )}
            >
              {category.name}
            </h3>

            {/* Gold underline - expands on hover */}
            <div
              className={cn(
                "mt-3 h-px bg-gold",
                "transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]",
                "w-0 group-hover:w-full",
              )}
            />

            {/* Arrow icon - appears on hover */}
            <div
              className={cn(
                "absolute bottom-5 right-5 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8",
                "flex h-10 w-10 items-center justify-center",
                "border border-white/10 rounded-sm",
                "transition-all duration-500",
                "opacity-0 translate-y-2",
                "group-hover:opacity-100 group-hover:translate-y-0",
                "group-hover:border-gold/40 group-hover:bg-gold/10",
              )}
            >
              <ArrowUpRight className="size-4 text-gold" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────── */

export function FeaturedCategories() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const featured = categories.slice(0, 6);

  return (
    <section ref={sectionRef} className="bg-bg-dark py-20 md:py-28 lg:py-36">
      <Container>
        {/* Section Header -- minimal, letting photos speak */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 md:mb-16 lg:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-px bg-gold/50" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-gold/60">
              Curated for You
            </span>
          </div>
          <h2 className="font-display text-3xl font-light tracking-tight text-white md:text-4xl lg:text-5xl">
            Shop by Category
          </h2>
        </motion.div>

        {/* Asymmetric Magazine Grid
            Desktop layout:
            [   LARGE   ] [ med ] [ med ]
            [   LARGE   ] [ med ] [ med ]
            Mobile: 2 columns, stacked
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 lg:gap-5"
        >
          {/* Card 1: LARGE featured card -- spans 2 cols, 2 rows on desktop */}
          <CategoryCard
            category={featured[0]}
            featured
            className="col-span-2 md:row-span-2"
            aspectClass="aspect-[3/4]"
          />

          {/* Cards 2-5: Regular cards in the remaining grid space */}
          <CategoryCard
            category={featured[1]}
            className="col-span-1"
            aspectClass="aspect-[3/4]"
          />

          <CategoryCard
            category={featured[2]}
            className="col-span-1"
            aspectClass="aspect-[3/4]"
          />

          <CategoryCard
            category={featured[3]}
            className="col-span-1"
            aspectClass="aspect-[3/4]"
          />

          <CategoryCard
            category={featured[4]}
            className="col-span-1"
            aspectClass="aspect-[3/4]"
          />

          {/* Card 6: Wide banner card -- full width */}
          <CategoryCard
            category={featured[5]}
            className="col-span-2 md:col-span-4"
            aspectClass="aspect-[21/9] md:aspect-[3/1]"
          />
        </motion.div>
      </Container>
    </section>
  );
}
