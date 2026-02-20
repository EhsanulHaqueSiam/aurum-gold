import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  Truck,
  RotateCcw,
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

// Pinterest icon — Lucide doesn't ship one, so we inline a tiny SVG
function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 12a4 4 0 1 1 8 0c0 2.5-1.5 5-3 6.5" />
      <path d="M9.5 15.5 8 21" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Rings", slug: "rings" },
  { label: "Necklaces", slug: "necklaces" },
  { label: "Earrings", slug: "earrings" },
  { label: "Bracelets", slug: "bracelets" },
  { label: "Bangles", slug: "bangles" },
  { label: "Chains", slug: "chains" },
  { label: "Pendants", slug: "pendants" },
  { label: "Sets", slug: "sets" },
] as const;

const CUSTOMER_SERVICE = [
  { label: "Contact Us", href: "#" },
  { label: "Shipping & Delivery", href: "#" },
  { label: "Returns & Exchanges", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Size Guide", href: "#" },
  { label: "Care Instructions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
] as const;

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: PinterestIcon, href: "https://pinterest.com", label: "Pinterest" },
] as const;

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "BIS Hallmark" },
  { icon: Lock, label: "Secure Payments" },
  { icon: Truck, label: "Free Shipping" },
  { icon: RotateCcw, label: "Easy Returns" },
] as const;

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    content: "Zaveri Bazaar, Mumbai 400002, India",
  },
  {
    icon: Phone,
    content: "+91 22 2342 5678",
    href: "tel:+912223425678",
  },
  {
    icon: Mail,
    content: "hello@aurum.co.in",
    href: "mailto:hello@aurum.co.in",
  },
  {
    icon: Clock,
    content: "Mon\u2013Sat: 10am \u2013 8pm IST",
  },
] as const;

const PAYMENT_METHODS = ["Visa", "Mastercard", "UPI", "COD"] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const columnVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Column heading                                                     */
/* ------------------------------------------------------------------ */

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-gold/60">
      {children}
    </h4>
  );
}

/* ================================================================== */
/*  Footer                                                             */
/* ================================================================== */

export function Footer() {
  return (
    <footer className="grain-overlay relative bg-bg-dark text-white">
      {/* ── Top gold gradient line ─────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

      {/* ── Main footer ────────────────────────────────────────── */}
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1 — Brand */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={0}
          >
            <Link to="/">
              <span className="font-display text-2xl tracking-[0.2em] text-white">
                AURUM
              </span>
            </Link>

            <p className="mt-2 font-accent text-lg italic text-white/30">
              Where Gold Becomes Art
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/20">
              Rooted in India's timeless goldsmithing tradition, Aurum crafts
              BIS-hallmarked jewellery where heritage meets modern luxury.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full",
                    "border border-white/10 text-white/30",
                    "transition-all duration-300",
                    "hover:border-gold hover:text-gold",
                  )}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
          >
            <ColumnHeading>Quick Links</ColumnHeading>
            <ul>
              {QUICK_LINKS.map((link) => (
                <li key={link.slug}>
                  <Link
                    to="/shop"
                    search={{ category: link.slug }}
                    className="block py-1.5 text-sm text-white/30 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Customer Service */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
          >
            <ColumnHeading>Customer Service</ColumnHeading>
            <ul>
              {CUSTOMER_SERVICE.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="block py-1.5 text-sm text-white/30 transition-colors duration-200 hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={3}
          >
            <ColumnHeading>Get in Touch</ColumnHeading>
            <ul className="space-y-4">
              {CONTACT_DETAILS.map((item) => {
                const inner = (
                  <>
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold/40" />
                    <span className="text-sm leading-relaxed text-white/30">
                      {item.content}
                    </span>
                  </>
                );

                return (
                  <li key={item.content} className="flex items-start gap-3">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-3 transition-colors duration-200 hover:text-gold [&>span]:hover:text-gold"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </Container>

      {/* ── Trust strip ────────────────────────────────────────── */}
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-0 border-t border-white/[0.06] pt-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_ITEMS.map((item, idx) => (
              <div key={item.label} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="mr-4 hidden text-gold/40 sm:inline">
                    &bull;
                  </span>
                )}
                <item.icon className="h-3.5 w-3.5 text-gold/50" />
                <span className="text-[11px] uppercase tracking-[0.1em] text-white/20">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <Container>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="mt-8 border-t border-white/[0.06] pt-6 pb-8"
        >
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-white/15">
              &copy; 2026 Aurum Jewellery. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              {PAYMENT_METHODS.map((method) => (
                <span
                  key={method}
                  className="text-xs text-white/15"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
}
