export type MetalType = "gold" | "silver" | "platinum" | "rose-gold" | "white-gold";
export type Purity = "24K" | "22K" | "18K" | "14K" | "925" | "950";
export type Category = "rings" | "necklaces" | "earrings" | "bracelets" | "bangles" | "chains" | "pendants" | "sets";
export type Occasion = "daily" | "wedding" | "party" | "office" | "festive" | "gifting";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: Category;
  metal: MetalType;
  purity: Purity;
  grossWeight: number;
  netWeight: number;
  images: string[];
  price: number;
  originalPrice?: number;
  makingCharges: number;
  stoneCharges?: number;
  gst: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  isTrending?: boolean;
  isBestseller?: boolean;
  occasion: Occasion[];
  collectionId?: string;
  collectionName?: string;
  relatedProducts?: string[];
  completeTheLook?: string[];
  sizes?: string[];
  selectedSize?: string;
  tags: string[];
  sku: string;
  hallmarkNumber?: string;
  stoneType?: string;
  stoneWeight?: number;
  dimensions?: string;
  viewerCount?: number;
  purchaseCount?: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  products: string[];
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  images?: string[];
  location?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface GoldRate {
  purity: Purity;
  pricePerGram: number;
  lastUpdated: string;
  change24h: number;
}
