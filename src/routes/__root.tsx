import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
  useRouterState,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickView } from "@/components/product/QuickView";
import { SocialProofNotification } from "@/components/shared/SocialProofNotification";
import { PromoPopup } from "@/components/shared/PromoPopup";

/* ─── Page Transition Variants ──────────────────────────── */

const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

/* ─── Root Layout ───────────────────────────────────────── */

function RootLayout() {
  const routerState = useRouterState();
  const locationKey = routerState.location.pathname;

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollRestoration />

      {/* Fixed overlays */}
      <Header />
      <MobileNav />
      <CartDrawer />
      <QuickView />
      <SocialProofNotification />
      <PromoPopup />

      {/* Main content — offset for fixed header + mobile nav */}
      <main className="flex-1 pt-[120px] pb-14 lg:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={locationKey}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

/* ─── Route Export ───────────────────────────────────────── */

export const Route = createRootRoute({
  component: RootLayout,
});
