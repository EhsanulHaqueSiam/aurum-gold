import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types/product";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  reservationExpiry: number | null;
  promoCode: string;
  promoDiscount: number;
  addItem: (product: Product, quantity?: number, size?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => void;
  removePromo: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
}

const RESERVATION_MINUTES = 30;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      reservationExpiry: null,
      promoCode: "",
      promoDiscount: 0,

      addItem: (product, quantity = 1, size) => {
        set((state) => {
          const existing = state.items.find(
            (item) => item.product.id === product.id,
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
              isOpen: true,
              reservationExpiry:
                Date.now() + RESERVATION_MINUTES * 60 * 1000,
            };
          }
          return {
            items: [
              ...state.items,
              { product, quantity, selectedSize: size },
            ],
            isOpen: true,
            reservationExpiry:
              Date.now() + RESERVATION_MINUTES * 60 * 1000,
          };
        });
      },

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter(
            (item) => item.product.id !== productId,
          ),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter(
                  (item) => item.product.id !== productId,
                )
              : state.items.map((item) =>
                  item.product.id === productId
                    ? { ...item, quantity }
                    : item,
                ),
        })),

      clearCart: () =>
        set({ items: [], reservationExpiry: null, promoCode: "", promoDiscount: 0 }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      applyPromo: (code) => {
        const codes: Record<string, number> = {
          WELCOME10: 10,
          GOLD15: 15,
          AURUM20: 20,
        };
        const discount = codes[code.toUpperCase()];
        if (discount) {
          set({ promoCode: code.toUpperCase(), promoDiscount: discount });
        }
      },

      removePromo: () => set({ promoCode: "", promoDiscount: 0 }),

      getSubtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = (subtotal * get().promoDiscount) / 100;
        return subtotal - discount;
      },

      getItemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "aurum-cart",
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
      }),
    },
  ),
);
