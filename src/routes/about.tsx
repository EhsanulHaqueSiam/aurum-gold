import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Gem,
  HandMetal,
  ShieldCheck,
  Sparkles,
  Heart,
  Award,
  Eye,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

/* ─── Animation Variants ────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/* ─── Data ───────────────────────────────────────────────── */

const PILLARS = [
  {
    icon: Gem,
    title: "Purity",
    description:
      "Every piece carries the BIS hallmark -- your guarantee of gold purity and authenticity. We source our gold from certified refiners and maintain rigorous quality control at every step.",
  },
  {
    icon: HandMetal,
    title: "Craftsmanship",
    description:
      "Our artisans carry forward generations of goldsmithing tradition. Each piece is hand-finished with meticulous attention to detail, combining time-honoured techniques with modern precision.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "We believe in complete pricing clarity. Every listing shows the gold value, making charges, stone charges, and GST separately. No hidden costs, no surprises -- just honest pricing.",
  },
] as const;

const VALUE_PROPS = [
  {
    icon: ShieldCheck,
    title: "BIS Hallmarked",
    description: "Government-certified purity on every single piece we sell.",
  },
  {
    icon: Award,
    title: "Lifetime Warranty",
    description:
      "Free maintenance, polishing, and rhodium plating for the lifetime of your jewellery.",
  },
  {
    icon: Truck,
    title: "Insured Delivery",
    description:
      "Every order ships with full insurance and tamper-proof packaging for peace of mind.",
  },
  {
    icon: Heart,
    title: "Ethically Sourced",
    description:
      "We work only with responsible suppliers who uphold ethical mining and labour practices.",
  },
] as const;

/* ─── About Page Component ──────────────────────────────── */

function AboutPage() {
  useEffect(() => {
    document.title = "About Aurum | Our Story, Promise & Values";
  }, []);

  return (
    <>
      {/* ═══ Hero Section ═══ */}
      <section className="relative overflow-hidden bg-bg-dark grain-overlay">
        {/* Gold accent line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <Container className="relative z-10 py-24 md:py-32 lg:py-40">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
          >
            {/* Overline */}
            <motion.div
              variants={fadeIn}
              className="mb-6 flex items-center justify-center gap-2"
            >
              <Sparkles className="size-4 text-gold" />
              <span className="overline tracking-[0.2em] text-gold">
                Est. 1947
              </span>
              <Sparkles className="size-4 text-gold" />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
            >
              The Art of
              <br />
              <span className="text-gold-shimmer italic">
                Timeless Gold
              </span>
            </motion.h1>

            {/* Decorative Line */}
            <motion.div
              variants={fadeIn}
              className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent"
            />

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="font-accent text-lg italic leading-relaxed text-text-light md:text-xl lg:text-2xl"
            >
              Three generations of master goldsmiths. One unwavering
              commitment to purity, craftsmanship, and the belief that
              jewellery should tell a story.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ═══ Our Story Section ═══ */}
      <section className="bg-bg-primary py-20 md:py-28">
        <Container>
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16"
            >
              {/* Image */}
              <motion.div variants={scaleIn} className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop&auto=format&q=80"
                    alt="Aurum goldsmith at work"
                    className="aspect-[3/4] w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/30 to-transparent" />
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-3 lg:pl-4"
              >
                <span className="overline mb-4 block tracking-[0.2em] text-gold">
                  Our Heritage
                </span>
                <div className="mb-6 h-px w-12 bg-gold" />
                <h2 className="mb-6 font-display text-3xl font-bold text-text-primary md:text-4xl">
                  Our Story
                </h2>

                <div className="space-y-4 text-sm leading-relaxed text-text-body md:text-base">
                  <p>
                    Aurum was born in 1947 in the heart of Mumbai's legendary
                    Zaveri Bazaar -- a lane where the air carries the faint
                    sweetness of molten gold and the rhythmic tap of artisan
                    hammers echoes through narrow corridors.
                  </p>
                  <p>
                    Our founder, Shri Harilal Mehta, began with a single
                    workbench and a simple philosophy: gold jewellery should be
                    honest in its purity and extraordinary in its craft. Three
                    generations later, that philosophy remains our north star.
                  </p>
                  <p>
                    Today, Aurum bridges the heritage of traditional Indian
                    goldsmithing with contemporary design sensibilities. Every
                    ring, necklace, and bangle that leaves our workshop carries
                    the DNA of nearly eight decades of expertise -- and the BIS
                    hallmark that certifies its purity.
                  </p>
                  <p>
                    We believe that buying gold should be a joyful, transparent
                    experience. That is why every product on our site shows a
                    complete price breakdown: the gold value at today's rate,
                    making charges, stone charges, and GST. No ambiguity. No
                    hidden fees. Just honest, beautiful jewellery.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══ Our Promise / Three Pillars ═══ */}
      <section className="bg-bg-secondary py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-14 text-center md:mb-18"
          >
            <span className="overline mb-3 block tracking-[0.2em] text-gold">
              What We Stand For
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              Our Promise
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
          >
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="group relative rounded-sm border border-border-light bg-bg-primary p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-lg md:p-10"
              >
                {/* Gold top accent on hover */}
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />

                {/* Number */}
                <span className="mb-6 block font-display text-5xl font-bold text-bg-tertiary md:text-6xl">
                  0{i + 1}
                </span>

                {/* Icon */}
                <div className="mb-5 flex size-12 items-center justify-center rounded-sm border border-gold/30 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/5">
                  <pillar.icon
                    className="size-5 text-gold transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-3 font-display text-xl font-bold text-text-primary md:text-2xl">
                  {pillar.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-text-body">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ═══ Why Choose Aurum ═══ */}
      <section className="bg-bg-primary py-20 md:py-28">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            className="mb-14 text-center md:mb-18"
          >
            <span className="overline mb-3 block tracking-[0.2em] text-gold">
              The Aurum Difference
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
              Why Choose Aurum
            </h2>
            <div className="mx-auto mt-6 h-px w-16 bg-gold" />
            <p className="mx-auto mt-6 max-w-xl font-accent text-lg italic leading-relaxed text-text-body">
              We are more than a jewellery brand. We are custodians of a
              craft, committed to making fine gold jewellery accessible and
              trustworthy.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {VALUE_PROPS.map((prop) => (
              <motion.div
                key={prop.title}
                variants={fadeUp}
                className="group flex flex-col items-center rounded-sm p-6 text-center transition-all duration-300 hover:bg-bg-secondary md:p-8"
              >
                {/* Icon */}
                <div className="mb-5 flex size-14 items-center justify-center rounded-sm border border-gold/30 transition-all duration-300 group-hover:border-gold group-hover:bg-gold/5">
                  <prop.icon
                    className="size-6 text-gold transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="mb-2 font-display text-base font-semibold tracking-wide text-text-primary md:text-lg">
                  {prop.title}
                </h3>

                {/* Description */}
                <p className="text-xs leading-relaxed text-text-muted md:text-sm">
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* ═══ CTA Banner ═══ */}
      <section className="relative overflow-hidden bg-bg-dark grain-overlay">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <Container className="relative z-10 py-20 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="overline mb-4 block tracking-[0.2em] text-gold">
              Begin Your Journey
            </span>
            <h2 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">
              Discover Our Collections
            </h2>
            <p className="mb-10 font-accent text-lg italic text-text-light">
              From everyday elegance to once-in-a-lifetime pieces, find the
              gold that speaks to you.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/shop"
                className={cn(
                  "group inline-flex items-center justify-center gap-2",
                  "h-14 px-10",
                  "bg-gold text-white font-medium text-sm uppercase tracking-wide",
                  "rounded-sm",
                  "transition-all duration-300",
                  "hover:bg-gold-dark hover:shadow-[0_0_30px_rgba(201,160,80,0.3)]",
                )}
              >
                Explore the Shop
                <ChevronRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}

/* ─── Route Export ───────────────────────────────────────── */

export const Route = createFileRoute("/about")({
  component: AboutPage,
});
