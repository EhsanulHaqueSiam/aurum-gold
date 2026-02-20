import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  SlidersHorizontal,
  X,
  ChevronDown,
  Grid3X3,
  Grid2X2,
  Search,
  Sparkles,
} from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/product/ProductCard";
import { OptimizedImage } from "@/components/ui/OptimizedImage";
import { Drawer } from "@/components/ui/Drawer";
import { products, categories, heroImages } from "@/data/products";
import type { Product, MetalType, Purity, Occasion } from "@/types/product";

/* ═══════════════════════════════════════════════════════════════════ */
/*  Search Params                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

interface ShopSearchParams {
  category?: string;
  metal?: string;
  purity?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  occasion?: string;
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Constants                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

const METAL_OPTIONS: { value: MetalType; label: string }[] = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "platinum", label: "Platinum" },
  { value: "rose-gold", label: "Rose Gold" },
  { value: "white-gold", label: "White Gold" },
];

const PURITY_OPTIONS: { value: Purity; label: string }[] = [
  { value: "24K", label: "24K" },
  { value: "22K", label: "22K" },
  { value: "18K", label: "18K" },
  { value: "14K", label: "14K" },
  { value: "950", label: "950 Platinum" },
  { value: "925", label: "925 Sterling" },
];

const OCCASION_OPTIONS: { value: Occasion; label: string }[] = [
  { value: "daily", label: "Daily Wear" },
  { value: "wedding", label: "Wedding" },
  { value: "party", label: "Party" },
  { value: "office", label: "Office" },
  { value: "festive", label: "Festive" },
  { value: "gifting", label: "Gifting" },
];

const SORT_OPTIONS = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Rating" },
] as const;

const EASE_REVEAL: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ═══════════════════════════════════════════════════════════════════ */
/*  Filter Helpers                                                    */
/* ═══════════════════════════════════════════════════════════════════ */

function parseMulti(val: string | undefined): string[] {
  if (!val) return [];
  return val.split(",").filter(Boolean);
}

function toggleInList(list: string[], item: string): string {
  const next = list.includes(item)
    ? list.filter((v) => v !== item)
    : [...list, item];
  return next.join(",") || "";
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Inline Filter Dropdown (Desktop)                                  */
/* ═══════════════════════════════════════════════════════════════════ */

function FilterDropdown({
  label,
  options,
  selected,
  onToggle,
}: {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1.5 rounded-sm border px-3.5 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-200",
          selected.length > 0
            ? "border-gold bg-gold/5 text-gold"
            : "border-border-light text-text-body hover:border-gold-muted hover:text-text-primary",
        )}
      >
        {label}
        {selected.length > 0 && (
          <span className="flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
            {selected.length}
          </span>
        )}
        <ChevronDown
          className={cn(
            "size-3 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE_REVEAL }}
            className="absolute left-0 top-full z-50 mt-2 w-56 origin-top-left rounded-sm border border-border-light bg-white py-2 shadow-xl shadow-black/5"
          >
            {options.map((option) => {
              const isActive = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => onToggle(option.value)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors duration-150",
                    isActive
                      ? "bg-gold/5 font-medium text-text-primary"
                      : "text-text-body hover:bg-bg-secondary hover:text-text-primary",
                  )}
                >
                  <span>{option.label}</span>
                  {isActive && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="size-4 text-gold"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 8l4 4 6-6" />
                    </motion.svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Sort Dropdown                                                     */
/* ═══════════════════════════════════════════════════════════════════ */

function SortDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (sort: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLabel =
    SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Popularity";

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-sm border border-border-light px-3.5 py-2 text-sm text-text-primary transition-colors duration-200 hover:border-gold-muted"
      >
        <span className="hidden text-xs text-text-muted sm:inline">
          Sort by:
        </span>
        <span className="text-xs font-medium">{currentLabel}</span>
        <ChevronDown
          className={cn(
            "size-3 text-text-muted transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18, ease: EASE_REVEAL }}
            className="absolute right-0 top-full z-50 mt-2 w-52 origin-top-right rounded-sm border border-border-light bg-white py-1 shadow-xl shadow-black/5"
          >
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors duration-150",
                  value === option.value
                    ? "bg-gold/5 font-medium text-gold"
                    : "text-text-body hover:bg-bg-secondary hover:text-text-primary",
                )}
              >
                {option.label}
                {value === option.value && (
                  <svg
                    className="size-4 text-gold"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8l4 4 6-6" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Mobile Filter Panel Content                                       */
/* ═══════════════════════════════════════════════════════════════════ */

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border-b border-border-light pb-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-2"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-text-primary">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-4 text-text-muted" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-1.5 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
  count,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
}) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 py-1.5">
      <div
        className={cn(
          "flex size-[18px] items-center justify-center rounded-[3px] border transition-all duration-200",
          checked
            ? "border-gold bg-gold"
            : "border-border-medium group-hover:border-gold-muted",
        )}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="size-3 text-white"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M2 6l3 3 5-5" />
          </motion.svg>
        )}
      </div>
      <span
        className={cn(
          "text-sm transition-colors duration-200",
          checked ? "font-medium text-text-primary" : "text-text-body",
        )}
      >
        {label}
      </span>
      {count !== undefined && (
        <span className="ml-auto text-xs tabular-nums text-text-muted">
          ({count})
        </span>
      )}
    </label>
  );
}

function FilterPanelContent({
  search,
  onFilterChange,
  onClearAll,
  hasActiveFilters,
}: {
  search: ShopSearchParams;
  onFilterChange: (key: string, value: string | number | undefined) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}) {
  const activeCategories = parseMulti(search.category);
  const activeMetals = parseMulti(search.metal);
  const activePurities = parseMulti(search.purity);
  const activeOccasions = parseMulti(search.occasion);

  const [minPriceInput, setMinPriceInput] = useState(
    search.minPrice?.toString() ?? "",
  );
  const [maxPriceInput, setMaxPriceInput] = useState(
    search.maxPrice?.toString() ?? "",
  );

  const handlePriceApply = () => {
    const min = minPriceInput ? parseInt(minPriceInput, 10) : undefined;
    const max = maxPriceInput ? parseInt(maxPriceInput, 10) : undefined;
    onFilterChange("minPrice", min);
    onFilterChange("maxPrice", max);
  };

  return (
    <div className="space-y-5">
      {hasActiveFilters && (
        <button
          onClick={onClearAll}
          className="text-xs font-medium uppercase tracking-wider text-gold transition-colors duration-200 hover:text-gold-dark"
        >
          Clear All Filters
        </button>
      )}

      <FilterSection title="Category">
        {categories.map((cat) => (
          <CheckboxItem
            key={cat.id}
            label={cat.name}
            checked={activeCategories.includes(cat.id)}
            onChange={() =>
              onFilterChange(
                "category",
                toggleInList(activeCategories, cat.id) || undefined,
              )
            }
            count={cat.count}
          />
        ))}
      </FilterSection>

      <FilterSection title="Metal Type">
        {METAL_OPTIONS.map((metal) => (
          <CheckboxItem
            key={metal.value}
            label={metal.label}
            checked={activeMetals.includes(metal.value)}
            onChange={() =>
              onFilterChange(
                "metal",
                toggleInList(activeMetals, metal.value) || undefined,
              )
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Purity">
        {PURITY_OPTIONS.map((purity) => (
          <CheckboxItem
            key={purity.value}
            label={purity.label}
            checked={activePurities.includes(purity.value)}
            onChange={() =>
              onFilterChange(
                "purity",
                toggleInList(activePurities, purity.value) || undefined,
              )
            }
          />
        ))}
      </FilterSection>

      <FilterSection title="Price Range">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">
              &#8377;
            </span>
            <input
              type="number"
              placeholder="Min"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="h-9 w-full rounded-sm border border-border-light bg-bg-secondary pl-7 pr-2 text-sm text-text-primary outline-none transition-colors duration-200 focus:border-gold"
            />
          </div>
          <span className="text-xs text-text-muted">to</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">
              &#8377;
            </span>
            <input
              type="number"
              placeholder="Max"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="h-9 w-full rounded-sm border border-border-light bg-bg-secondary pl-7 pr-2 text-sm text-text-primary outline-none transition-colors duration-200 focus:border-gold"
            />
          </div>
        </div>
        <button
          onClick={handlePriceApply}
          className="mt-2 h-8 w-full rounded-sm bg-bg-dark text-xs font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-gold"
        >
          Apply
        </button>
      </FilterSection>

      <FilterSection title="Occasion">
        {OCCASION_OPTIONS.map((occasion) => (
          <CheckboxItem
            key={occasion.value}
            label={occasion.label}
            checked={activeOccasions.includes(occasion.value)}
            onChange={() =>
              onFilterChange(
                "occasion",
                toggleInList(activeOccasions, occasion.value) || undefined,
              )
            }
          />
        ))}
      </FilterSection>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Active Filter Chips                                               */
/* ═══════════════════════════════════════════════════════════════════ */

function ActiveFilterChips({
  search,
  onRemove,
}: {
  search: ShopSearchParams;
  onRemove: (key: string, value: string) => void;
}) {
  const chips: { key: string; value: string; label: string }[] = [];

  parseMulti(search.category).forEach((v) => {
    const cat = categories.find((c) => c.id === v);
    chips.push({ key: "category", value: v, label: cat?.name ?? v });
  });

  parseMulti(search.metal).forEach((v) => {
    const metal = METAL_OPTIONS.find((m) => m.value === v);
    chips.push({ key: "metal", value: v, label: metal?.label ?? v });
  });

  parseMulti(search.purity).forEach((v) => {
    chips.push({ key: "purity", value: v, label: v });
  });

  parseMulti(search.occasion).forEach((v) => {
    const occ = OCCASION_OPTIONS.find((o) => o.value === v);
    chips.push({ key: "occasion", value: v, label: occ?.label ?? v });
  });

  if (search.minPrice) {
    chips.push({
      key: "minPrice",
      value: String(search.minPrice),
      label: `Min: ${formatPrice(search.minPrice)}`,
    });
  }

  if (search.maxPrice) {
    chips.push({
      key: "maxPrice",
      value: String(search.maxPrice),
      label: `Max: ${formatPrice(search.maxPrice)}`,
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <motion.button
          key={`${chip.key}-${chip.value}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: EASE_REVEAL }}
          onClick={() => onRemove(chip.key, chip.value)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
        >
          {chip.label}
          <X className="size-3 text-white/60" />
        </motion.button>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Staggered Product Grid                                            */
/* ═══════════════════════════════════════════════════════════════════ */

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_REVEAL },
  },
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  Shop Page                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

function ShopPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);

  /* -- Compute page title ------------------------------------------------ */

  const activeCategories = parseMulti(search.category);
  const pageTitle =
    activeCategories.length === 1
      ? categories.find((c) => c.id === activeCategories[0])?.name ??
        "All Jewellery"
      : "All Jewellery";

  useEffect(() => {
    document.title = `${pageTitle} | Aurum Jewellery`;
  }, [pageTitle]);

  /* -- Filter + Sort Logic ----------------------------------------------- */

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    const cats = parseMulti(search.category);
    if (cats.length > 0) {
      result = result.filter((p) => cats.includes(p.category));
    }

    const metals = parseMulti(search.metal);
    if (metals.length > 0) {
      result = result.filter((p) => metals.includes(p.metal));
    }

    const purities = parseMulti(search.purity);
    if (purities.length > 0) {
      result = result.filter((p) => purities.includes(p.purity));
    }

    if (search.minPrice) {
      result = result.filter((p) => p.price >= search.minPrice!);
    }
    if (search.maxPrice) {
      result = result.filter((p) => p.price <= search.maxPrice!);
    }

    const occasions = parseMulti(search.occasion);
    if (occasions.length > 0) {
      result = result.filter((p) =>
        p.occasion.some((o) => occasions.includes(o)),
      );
    }

    const sort = search.sort ?? "popularity";
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popularity":
      default:
        result.sort(
          (a, b) => (b.purchaseCount ?? 0) - (a.purchaseCount ?? 0),
        );
        break;
    }

    return result;
  }, [search]);

  /* -- Navigation helpers ------------------------------------------------ */

  const handleFilterChange = useCallback(
    (key: string, value: string | number | undefined) => {
      navigate({
        search: (prev: Record<string, unknown>) => {
          const next = { ...prev, [key]: value };
          Object.keys(next).forEach((k) => {
            if (next[k] === undefined || next[k] === "") {
              delete next[k];
            }
          });
          return next;
        },
        replace: true,
      });
    },
    [navigate],
  );

  const handleClearAll = useCallback(() => {
    navigate({ search: {}, replace: true });
  }, [navigate]);

  const handleRemoveChip = useCallback(
    (key: string, value: string) => {
      if (key === "minPrice" || key === "maxPrice") {
        handleFilterChange(key, undefined);
        return;
      }
      const current = parseMulti(
        search[key as keyof ShopSearchParams] as string | undefined,
      );
      const next = current.filter((v) => v !== value);
      handleFilterChange(key, next.join(",") || undefined);
    },
    [search, handleFilterChange],
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      handleFilterChange("sort", sort === "popularity" ? undefined : sort);
    },
    [handleFilterChange],
  );

  const handleDropdownToggle = useCallback(
    (key: string, value: string) => {
      const current = parseMulti(
        search[key as keyof ShopSearchParams] as string | undefined,
      );
      const next = toggleInList(current, value);
      handleFilterChange(key, next || undefined);
    },
    [search, handleFilterChange],
  );

  const hasActiveFilters =
    !!search.category ||
    !!search.metal ||
    !!search.purity ||
    !!search.minPrice ||
    !!search.maxPrice ||
    !!search.occasion;

  const activeFilterCount = [
    ...parseMulti(search.category),
    ...parseMulti(search.metal),
    ...parseMulti(search.purity),
    ...parseMulti(search.occasion),
    ...(search.minPrice ? ["min"] : []),
    ...(search.maxPrice ? ["max"] : []),
  ].length;

  /* -- Render ------------------------------------------------------------ */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE_REVEAL }}
    >
      {/* ================================================================= */}
      {/*  1. PAGE HEADER -- Hero Image Banner                              */}
      {/* ================================================================= */}

      <section className="relative h-[240px] md:h-[320px] lg:h-[380px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src={heroImages.main}
            alt="Jewellery collection"
            fill
            darkBg
            shimmer
            fadeDuration={0.8}
            className="absolute inset-0"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1412]/85 via-[#1A1412]/60 to-[#1A1412]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1412]/70 via-transparent to-[#1A1412]/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-4 pb-8 md:px-8 md:pb-10 lg:px-16 lg:pb-12">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-xs">
            <Link
              to="/"
              className="text-white/40 transition-colors duration-200 hover:text-[#C9A050]"
            >
              Home
            </Link>
            <ChevronRight className="size-3 text-white/20" />
            {activeCategories.length === 1 ? (
              <>
                <Link
                  to="/shop"
                  className="text-white/40 transition-colors duration-200 hover:text-[#C9A050]"
                >
                  Shop
                </Link>
                <ChevronRight className="size-3 text-white/20" />
                <span className="text-[#C9A050]">{pageTitle}</span>
              </>
            ) : (
              <span className="text-[#C9A050]">Shop</span>
            )}
          </nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE_REVEAL }}
            className="font-display text-3xl font-medium text-white md:text-4xl lg:text-5xl"
          >
            {pageTitle}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_REVEAL }}
            className="mt-2 font-accent text-base italic text-white/50 md:text-lg"
          >
            Discover {filteredProducts.length} handcrafted piece
            {filteredProducts.length !== 1 ? "s" : ""}
          </motion.p>

          {/* Active filter chips */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <ActiveFilterChips
                  search={search}
                  onRemove={handleRemoveChip}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ================================================================= */}
      {/*  2. FILTER + SORT BAR -- Sticky                                   */}
      {/* ================================================================= */}

      <div className="sticky top-0 z-30 border-b border-border-light bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3 md:px-8 lg:px-16">
          {/* Left side */}
          <div className="flex items-center gap-3">
            {/* Mobile filter trigger */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className={cn(
                "flex items-center gap-2 rounded-sm border px-3.5 py-2 text-xs font-medium uppercase tracking-wide transition-all duration-200 lg:hidden",
                hasActiveFilters
                  ? "border-gold bg-gold/5 text-gold"
                  : "border-border-light text-text-body hover:border-gold-muted",
              )}
            >
              <SlidersHorizontal className="size-3.5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex size-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Desktop inline filters */}
            <div className="hidden items-center gap-2 lg:flex">
              <FilterDropdown
                label="Category"
                options={categories.map((c) => ({
                  value: c.id,
                  label: c.name,
                }))}
                selected={parseMulti(search.category)}
                onToggle={(v) => handleDropdownToggle("category", v)}
              />
              <FilterDropdown
                label="Metal"
                options={METAL_OPTIONS.map((m) => ({
                  value: m.value,
                  label: m.label,
                }))}
                selected={parseMulti(search.metal)}
                onToggle={(v) => handleDropdownToggle("metal", v)}
              />
              <FilterDropdown
                label="Price"
                options={[
                  { value: "under-10000", label: "Under \u20B910,000" },
                  { value: "10000-50000", label: "\u20B910,000 - \u20B950,000" },
                  { value: "50000-100000", label: "\u20B950,000 - \u20B91,00,000" },
                  { value: "above-100000", label: "Above \u20B91,00,000" },
                ]}
                selected={[]}
                onToggle={(v) => {
                  const ranges: Record<
                    string,
                    { min?: number; max?: number }
                  > = {
                    "under-10000": { max: 10000 },
                    "10000-50000": { min: 10000, max: 50000 },
                    "50000-100000": { min: 50000, max: 100000 },
                    "above-100000": { min: 100000 },
                  };
                  const range = ranges[v];
                  if (range) {
                    handleFilterChange("minPrice", range.min);
                    handleFilterChange("maxPrice", range.max);
                  }
                }}
              />

              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="ml-1 text-xs font-medium text-gold transition-colors duration-200 hover:text-gold-dark"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Product count */}
            <div className="hidden items-center gap-1.5 border-l border-border-light pl-4 text-sm text-text-muted sm:flex">
              <span className="font-semibold tabular-nums text-text-primary">
                {filteredProducts.length}
              </span>
              <span>piece{filteredProducts.length !== 1 ? "s" : ""}</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <SortDropdown
              value={search.sort ?? "popularity"}
              onChange={handleSortChange}
            />

            {/* Grid layout toggle (desktop only) */}
            <div className="hidden items-center gap-1 rounded-sm border border-border-light p-0.5 lg:flex">
              <button
                onClick={() => setGridCols(4)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-sm transition-colors duration-150",
                  gridCols === 4
                    ? "bg-bg-dark text-white"
                    : "text-text-muted hover:text-text-primary",
                )}
                aria-label="4-column grid"
              >
                <Grid2X2 className="size-3.5" />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={cn(
                  "flex size-8 items-center justify-center rounded-sm transition-colors duration-150",
                  gridCols === 3
                    ? "bg-bg-dark text-white"
                    : "text-text-muted hover:text-text-primary",
                )}
                aria-label="3-column grid"
              >
                <Grid3X3 className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/*  3. PRODUCT GRID                                                  */}
      {/* ================================================================= */}

      <section className="bg-bg-secondary/30 py-8 md:py-12">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 lg:px-16">
          {filteredProducts.length === 0 ? (
            /* -- Empty state -- */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_REVEAL }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="mb-6 flex size-20 items-center justify-center rounded-full border border-border-light bg-bg-secondary">
                <Search className="size-8 text-text-light" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-2xl font-medium text-text-primary">
                No pieces match your criteria
              </h2>
              <p className="mt-2 max-w-sm font-accent text-base italic text-text-muted">
                Try adjusting your filters to discover something extraordinary
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearAll}
                  className="mt-6 rounded-sm border border-gold px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-gold transition-colors duration-200 hover:bg-gold hover:text-white"
                >
                  Clear All Filters
                </button>
              )}
            </motion.div>
          ) : (
            /* -- Product grid with stagger -- */
            <motion.div
              key={`${search.category}-${search.metal}-${search.sort}-${gridCols}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className={cn(
                "grid gap-4 md:gap-6",
                "grid-cols-2 md:grid-cols-3",
                gridCols === 4
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-3",
              )}
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ================================================================= */}
      {/*  4. MOBILE FILTER DRAWER                                          */}
      {/* ================================================================= */}

      <Drawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        side="bottom"
        header={
          <span className="font-display text-lg font-semibold text-text-primary">
            Refine Your Search
          </span>
        }
        footer={
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleClearAll();
                setMobileFiltersOpen(false);
              }}
              className="flex-1 rounded-sm border border-border-light py-3 text-xs font-medium uppercase tracking-wider text-text-primary transition-colors duration-200 hover:border-gold"
            >
              Clear All
            </button>
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="flex-1 rounded-sm bg-gold py-3 text-xs font-medium uppercase tracking-wider text-white transition-colors duration-200 hover:bg-gold-dark"
            >
              Show {filteredProducts.length} Result
              {filteredProducts.length !== 1 ? "s" : ""}
            </button>
          </div>
        }
      >
        <FilterPanelContent
          search={search}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAll}
          hasActiveFilters={hasActiveFilters}
        />
      </Drawer>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Route Export                                                      */
/* ═══════════════════════════════════════════════════════════════════ */

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
  validateSearch: (search: Record<string, unknown>): ShopSearchParams => ({
    category: search.category as string | undefined,
    metal: search.metal as string | undefined,
    purity: search.purity as string | undefined,
    minPrice: search.minPrice ? Number(search.minPrice) : undefined,
    maxPrice: search.maxPrice ? Number(search.maxPrice) : undefined,
    sort: search.sort as string | undefined,
    occasion: search.occasion as string | undefined,
  }),
});
