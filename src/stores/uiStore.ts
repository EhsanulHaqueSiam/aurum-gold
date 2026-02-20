import { create } from "zustand";

interface UIState {
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  isQuickViewOpen: boolean;
  quickViewProductId: string | null;
  showPromoPopup: boolean;
  socialProofNotification: { name: string; product: string; location: string } | null;
  openSearch: () => void;
  closeSearch: () => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openQuickView: (productId: string) => void;
  closeQuickView: () => void;
  dismissPromoPopup: () => void;
  showSocialProof: (data: { name: string; product: string; location: string }) => void;
  hideSocialProof: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isMobileMenuOpen: false,
  isQuickViewOpen: false,
  quickViewProductId: null,
  showPromoPopup: typeof window !== "undefined" ? !localStorage.getItem("aurum_promo_dismissed") : false,
  socialProofNotification: null,
  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  openQuickView: (productId) =>
    set({ isQuickViewOpen: true, quickViewProductId: productId }),
  closeQuickView: () =>
    set({ isQuickViewOpen: false, quickViewProductId: null }),
  dismissPromoPopup: () => {
    if (typeof window !== "undefined") localStorage.setItem("aurum_promo_dismissed", "1");
    set({ showPromoPopup: false });
  },
  showSocialProof: (data) => set({ socialProofNotification: data }),
  hideSocialProof: () => set({ socialProofNotification: null }),
}));
