import { useState, useEffect, useCallback } from "react";
import { getProductById } from "@/data/products";
import type { Product } from "@/types/product";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "aurum-recently-viewed";
const MAX_ITEMS = 10;

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

export function useRecentlyViewed() {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  /* ── Sync state to localStorage ─────────────────────────────── */

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      // Silently ignore localStorage errors (quota, SSR, etc.)
    }
  }, [ids]);

  /* ── Add a product to recently viewed ───────────────────────── */

  const addProduct = useCallback((productId: string) => {
    setIds((prev) => {
      // Move to front if already present, otherwise prepend
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  /* ── Clear all ──────────────────────────────────────────────── */

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  /* ── Resolve IDs to products ────────────────────────────────── */

  const products: Product[] = ids
    .map((id) => getProductById(id))
    .filter(Boolean) as Product[];

  return {
    ids,
    products,
    addProduct,
    clear,
  };
}
