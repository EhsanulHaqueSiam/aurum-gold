import type { Product, Collection, Review, GoldRate } from "@/types/product";

/* ─── Image URL Helpers ──────────────────────────────────── */

const unsplash = (id: string, w = 800, h = 800) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const unsplashPlus = (id: string, w = 800, h = 800) =>
  `https://plus.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`;

const wide = (id: string) => unsplash(id, 1600, 900);
const widePlus = (id: string) => unsplashPlus(id, 1600, 900);
const large = (id: string) => unsplash(id, 1200, 1200);
const largePlus = (id: string) => unsplashPlus(id, 1200, 1200);

/* ─── Verified Unsplash Photo IDs (all confirmed 200 OK) ─ */

const IMG = {
  // Gold Rings
  goldRing1: "1605100804763-247f67b3557e",
  goldRing2: "1633934542430-0905ccb5f050",
  goldRing3: "1654521883301-070279dd0ae1",
  goldRing4: "1611170947204-5ab96c3e37a1",
  goldRing5: "1720189031165-b6f3cf3ff940",
  goldRing6: "1666287289204-3d6e636dd539",
  goldRing7: "1669859084638-58a250915fed",
  goldRing8: "1628926379972-9843ad139a8c",
  goldRing9: "1626784214536-d859187e0bd0",

  // Gold Necklaces
  necklace1: "1599643478518-a784e5dc4c8f",
  necklace2: "1611012756377-05e2e4269fa3",
  necklace3: "1641206189215-9533ceb7a1df",
  necklace4: "1672646856394-ec0dd6a4ccec",
  necklace5: "1643300866907-032b3baeeb1f",
  necklace6: "1672646858147-2f9ddb140191",
  necklace7: "1625792508300-0e1f913a3a50",

  // Gold Earrings
  earring1: "1535632066927-ab7c9ab60908",
  earring2: "1588444837495-c6cfeb53f32d",
  earring3: "1638854254875-a2416fe0fec2",
  earring4: "1611271525579-9402f4d6a7e5",

  // Gold Bracelets
  bracelet1: "1573408301185-9146fe634ad0",
  bracelet2: "1689397136362-dce64e557fcc",
  bracelet3: "1655707063475-1381a4c0a63a",
  bracelet4: "1569397288884-4d43d6738fbd",
  bracelet5: "1691991054594-c64b364a9fab",

  // Gold Bangles
  bangle1: "1611591437281-460bfbe1220a",

  // Gold Chains
  chain1: "1662434923031-b9bf1b6c10e2",
  chain2: "1611107683227-e9060eccd846",
  chain3: "1659682695085-6b66aa8bfef2",
  chain4: "1598009632415-1b42a2c686b6",
  chain5: "1587947330297-bbc8b86f00ea",

  // Gold Pendants
  pendant1: "1664178266066-e37e0d25e6a1",
  pendant2: "1656428361240-47e1737b7dce",

  // Diamond Jewellery
  diamond1: "1605100804567-1ffe942b5cd6",
  diamond2: "1499899833954-5ecd9439d17f",
  diamond3: "1590156118368-607652ab307a",

  // Platinum / Silver
  platinum1: "1685489807290-199befdb1f13",
  silver1: "1561995734-ef4b62bb6586",

  // Bridal / Sets
  bridal1: "1612150354898-a69132eb7c67",
  bridal2: "1675105176516-492d48861f41",

  // Lifestyle / Editorial
  lifestyle1: "1637536701306-3214e9cec64a",
  lifestyle2: "1586857071455-1e7fa5cf57fc",
  lifestyle3: "1548229591-a7feaad39518",
  lifestyle4: "1629212093109-354efe3fc541",
  lifestyle5: "1611271511360-f9385e4a45bf",

  // Hero / Banner (wide format)
  hero1: "1666868722415-4137748b0134",
  hero2: "1559905449-3f28f93801fc",
  hero3: "1597310781652-78af3276ba5e",
  hero4: "1597532842922-dd855db3e562",

  // Premium Unsplash+ (verified)
  premDiamondEar: "premium_photo-1681276170610-8d9264aaccd8",
  premFlatlay: "premium_photo-1661645503378-ec83d964d614",
  premEngagement: "premium_photo-1674700256686-ea9543aa450e",
  premBracelet: "premium_photo-1679768606052-be0b8a88fef1",
  premRing1: "premium_photo-1671641737519-a69a7d324ce6",
  premRing2: "premium_photo-1678730056405-0cf5eaaad097",
  premEarring1: "premium_photo-1661964108348-b62e91c62ac7",
  premEarring2: "premium_photo-1661499383914-2292f6dd8390",
  premBridal: "premium_photo-1670615931324-2542d17dc3ce",
  premWedding: "premium_photo-1674581921333-959b929a2e0a",
  premLifestyle: "premium_photo-1674986164558-4bf67f94f892",
};

/* ─── Products ───────────────────────────────────────────── */

export const products: Product[] = [
  {
    id: "1",
    slug: "celestial-gold-ring",
    name: "Celestial Gold Ring",
    description:
      "A stunning 22K gold ring inspired by celestial motifs. Handcrafted with intricate detailing, this piece captures the brilliance of the night sky with delicate star-cut patterns. Perfect for daily wear or special occasions.",
    category: "rings",
    metal: "gold",
    purity: "22K",
    grossWeight: 4.5,
    netWeight: 4.2,
    images: [
      unsplash(IMG.goldRing1),
      unsplash(IMG.goldRing2),
      unsplash(IMG.goldRing3),
      unsplash(IMG.lifestyle4),
      unsplash(IMG.goldRing8),
    ],
    price: 32500,
    originalPrice: 38000,
    makingCharges: 2800,
    gst: 975,
    rating: 4.8,
    reviewCount: 127,
    inStock: true,
    stockCount: 5,
    isNew: false,
    isTrending: true,
    isBestseller: true,
    occasion: ["daily", "party", "gifting"],
    collectionId: "celestial",
    collectionName: "Celestial Collection",
    relatedProducts: ["2", "3", "5"],
    completeTheLook: ["7", "10", "13"],
    sizes: ["6", "7", "8", "9", "10", "11"],
    tags: ["gold", "ring", "celestial", "bestseller", "22k"],
    sku: "AUR-RNG-001",
    hallmarkNumber: "AUR22K001",
    viewerCount: 23,
    purchaseCount: 342,
  },
  {
    id: "2",
    slug: "heritage-gold-necklace",
    name: "Heritage Gold Necklace",
    description:
      "An exquisite 22K gold necklace from our Heritage collection. Features a beautifully detailed pendant with traditional filigree work, suspended from a delicate gold chain. A timeless piece that bridges generations.",
    category: "necklaces",
    metal: "gold",
    purity: "22K",
    grossWeight: 12.8,
    netWeight: 12.0,
    images: [
      unsplash(IMG.necklace1),
      unsplash(IMG.necklace2),
      unsplash(IMG.necklace5),
      unsplash(IMG.lifestyle1),
    ],
    price: 89500,
    makingCharges: 6400,
    gst: 2685,
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    stockCount: 3,
    isTrending: true,
    occasion: ["wedding", "festive", "party"],
    collectionId: "heritage",
    collectionName: "Heritage Collection",
    relatedProducts: ["1", "4", "6"],
    completeTheLook: ["8", "11", "14"],
    tags: ["gold", "necklace", "heritage", "wedding", "22k"],
    sku: "AUR-NCK-001",
    hallmarkNumber: "AUR22K002",
    viewerCount: 15,
    purchaseCount: 198,
  },
  {
    id: "3",
    slug: "bloom-diamond-earrings",
    name: "Bloom Diamond Earrings",
    description:
      "18K gold earrings adorned with VS-clarity diamonds arranged in a delicate floral pattern. Each earring features 12 round brilliant-cut diamonds totaling 0.48 carats. The perfect balance of sparkle and sophistication.",
    category: "earrings",
    metal: "gold",
    purity: "18K",
    grossWeight: 5.2,
    netWeight: 4.8,
    images: [
      unsplash(IMG.earring1),
      unsplash(IMG.earring3),
      unsplash(IMG.diamond3),
      unsplashPlus(IMG.premEarring1),
    ],
    price: 64800,
    originalPrice: 72000,
    makingCharges: 4200,
    stoneCharges: 18000,
    gst: 1944,
    rating: 4.7,
    reviewCount: 64,
    inStock: true,
    stockCount: 8,
    isNew: true,
    occasion: ["party", "wedding", "office"],
    collectionId: "bloom",
    collectionName: "Bloom Collection",
    relatedProducts: ["1", "5", "9"],
    completeTheLook: ["2", "6", "12"],
    stoneType: "Diamond",
    stoneWeight: 0.48,
    tags: ["gold", "earrings", "diamond", "bloom", "18k", "new"],
    sku: "AUR-EAR-001",
    hallmarkNumber: "AUR18K001",
    viewerCount: 31,
    purchaseCount: 156,
  },
  {
    id: "4",
    slug: "sovereign-gold-bracelet",
    name: "Sovereign Gold Bracelet",
    description:
      "A bold 22K gold bracelet with a contemporary link design. Each link is hand-polished to achieve a mirror finish. Secure box clasp with safety chain. A statement piece for those who appreciate fine craftsmanship.",
    category: "bracelets",
    metal: "gold",
    purity: "22K",
    grossWeight: 18.5,
    netWeight: 18.0,
    images: [
      unsplash(IMG.bracelet1),
      unsplash(IMG.bracelet2),
      unsplash(IMG.bracelet3),
      unsplash(IMG.lifestyle2),
    ],
    price: 128000,
    makingCharges: 9200,
    gst: 3840,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    stockCount: 2,
    isBestseller: true,
    occasion: ["daily", "party", "festive"],
    collectionId: "sovereign",
    collectionName: "Sovereign Collection",
    relatedProducts: ["1", "7", "10"],
    completeTheLook: ["1", "2", "13"],
    tags: ["gold", "bracelet", "sovereign", "22k", "statement"],
    sku: "AUR-BRC-001",
    hallmarkNumber: "AUR22K003",
    viewerCount: 9,
    purchaseCount: 87,
  },
  {
    id: "5",
    slug: "luna-platinum-ring",
    name: "Luna Platinum Ring",
    description:
      "A sleek platinum ring with a solitaire diamond setting. The band features a comfort-fit interior and a subtle textured exterior. Center stone is a 0.5ct round brilliant diamond with excellent cut grade.",
    category: "rings",
    metal: "platinum",
    purity: "950",
    grossWeight: 6.2,
    netWeight: 5.8,
    images: [
      unsplash(IMG.platinum1),
      unsplash(IMG.diamond1),
      unsplash(IMG.diamond2),
      unsplashPlus(IMG.premEngagement),
    ],
    price: 185000,
    originalPrice: 210000,
    makingCharges: 12000,
    stoneCharges: 65000,
    gst: 5550,
    rating: 4.9,
    reviewCount: 31,
    inStock: true,
    stockCount: 4,
    isNew: true,
    isTrending: true,
    occasion: ["wedding", "gifting"],
    relatedProducts: ["1", "3", "9"],
    completeTheLook: ["8", "12"],
    sizes: ["5", "6", "7", "8", "9"],
    stoneType: "Diamond",
    stoneWeight: 0.5,
    tags: ["platinum", "ring", "diamond", "solitaire", "wedding"],
    sku: "AUR-RNG-002",
    viewerCount: 18,
    purchaseCount: 64,
  },
  {
    id: "6",
    slug: "royal-gold-bangle-set",
    name: "Royal Gold Bangle Set",
    description:
      "A set of four matching 22K gold bangles with alternating smooth and textured finishes. Traditional yet contemporary design. Each bangle weighs approximately 10g, making this a substantial and luxurious set.",
    category: "bangles",
    metal: "gold",
    purity: "22K",
    grossWeight: 42.0,
    netWeight: 40.0,
    images: [
      unsplash(IMG.bangle1),
      unsplashPlus(IMG.premBracelet),
      unsplash(IMG.bracelet4),
      unsplashPlus(IMG.premRing1),
    ],
    price: 285000,
    makingCharges: 16800,
    gst: 8550,
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    stockCount: 3,
    isBestseller: true,
    occasion: ["wedding", "festive"],
    collectionId: "royal",
    collectionName: "Royal Collection",
    relatedProducts: ["4", "10", "14"],
    completeTheLook: ["2", "8", "11"],
    sizes: ["2.4", "2.6", "2.8", "2.10"],
    tags: ["gold", "bangles", "set", "royal", "22k", "wedding"],
    sku: "AUR-BNG-001",
    hallmarkNumber: "AUR22K004",
    viewerCount: 12,
    purchaseCount: 124,
  },
  {
    id: "7",
    slug: "whisper-gold-chain",
    name: "Whisper Gold Chain",
    description:
      "A delicate 22K gold chain with a beautifully refined rope pattern. At 18 inches, it sits perfectly at the collarbone. Can be worn alone or paired with any pendant. The chain that goes with everything.",
    category: "chains",
    metal: "gold",
    purity: "22K",
    grossWeight: 8.5,
    netWeight: 8.2,
    images: [
      unsplash(IMG.chain1),
      unsplash(IMG.chain2),
      unsplash(IMG.chain4),
      unsplash(IMG.chain5),
    ],
    price: 56000,
    makingCharges: 3400,
    gst: 1680,
    rating: 4.6,
    reviewCount: 203,
    inStock: true,
    stockCount: 12,
    isBestseller: true,
    occasion: ["daily", "office"],
    relatedProducts: ["2", "10", "13"],
    completeTheLook: ["1", "3", "13"],
    tags: ["gold", "chain", "daily", "22k", "minimal"],
    sku: "AUR-CHN-001",
    hallmarkNumber: "AUR22K005",
    dimensions: "18 inches",
    viewerCount: 7,
    purchaseCount: 521,
  },
  {
    id: "8",
    slug: "aurora-gold-earrings",
    name: "Aurora Gold Earrings",
    description:
      "Elegant 22K gold drop earrings with a cascading design. Featuring hand-engraved patterns inspired by the Northern Lights. Lightweight and comfortable for all-day wear at just 3.8g per pair.",
    category: "earrings",
    metal: "gold",
    purity: "22K",
    grossWeight: 3.8,
    netWeight: 3.6,
    images: [
      unsplash(IMG.earring4),
      unsplash(IMG.earring2),
      unsplashPlus(IMG.premEarring2),
      unsplash(IMG.lifestyle5),
    ],
    price: 26500,
    makingCharges: 2200,
    gst: 795,
    rating: 4.7,
    reviewCount: 91,
    inStock: true,
    stockCount: 7,
    occasion: ["daily", "office", "party"],
    collectionId: "celestial",
    collectionName: "Celestial Collection",
    relatedProducts: ["3", "11", "14"],
    completeTheLook: ["1", "7", "4"],
    tags: ["gold", "earrings", "drop", "celestial", "22k", "lightweight"],
    sku: "AUR-EAR-002",
    hallmarkNumber: "AUR22K006",
    viewerCount: 14,
    purchaseCount: 267,
  },
  {
    id: "9",
    slug: "eternity-diamond-pendant",
    name: "Eternity Diamond Pendant",
    description:
      "A timeless 18K gold pendant featuring a halo of brilliant-cut diamonds surrounding a stunning center stone. Comes with an 18-inch 18K gold chain. The perfect gift for someone special.",
    category: "pendants",
    metal: "gold",
    purity: "18K",
    grossWeight: 3.2,
    netWeight: 2.8,
    images: [
      unsplash(IMG.pendant1),
      unsplash(IMG.pendant2),
      unsplash(IMG.necklace7),
      unsplash(IMG.diamond3),
    ],
    price: 48500,
    originalPrice: 55000,
    makingCharges: 3600,
    stoneCharges: 22000,
    gst: 1455,
    rating: 4.8,
    reviewCount: 73,
    inStock: true,
    stockCount: 6,
    isNew: true,
    occasion: ["gifting", "party", "wedding"],
    collectionId: "eternity",
    collectionName: "Eternity Collection",
    relatedProducts: ["3", "5", "12"],
    completeTheLook: ["3", "7"],
    stoneType: "Diamond",
    stoneWeight: 0.35,
    tags: ["gold", "pendant", "diamond", "eternity", "18k", "gift"],
    sku: "AUR-PND-001",
    hallmarkNumber: "AUR18K002",
    viewerCount: 22,
    purchaseCount: 189,
  },
  {
    id: "10",
    slug: "serpentine-silver-ring",
    name: "Serpentine Silver Ring",
    description:
      "An artfully designed 925 sterling silver ring with a modern serpentine motif. Rhodium-plated for lasting shine. A bold, contemporary piece for those who love architectural jewellery.",
    category: "rings",
    metal: "silver",
    purity: "925",
    grossWeight: 8.5,
    netWeight: 8.2,
    images: [
      unsplash(IMG.silver1),
      unsplash(IMG.goldRing6),
      unsplash(IMG.goldRing7),
      unsplash(IMG.lifestyle3),
    ],
    price: 4800,
    makingCharges: 1200,
    gst: 144,
    rating: 4.5,
    reviewCount: 156,
    inStock: true,
    stockCount: 20,
    isTrending: true,
    occasion: ["daily", "office", "party"],
    relatedProducts: ["1", "5", "12"],
    completeTheLook: ["13", "14"],
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    tags: ["silver", "ring", "modern", "925", "statement"],
    sku: "AUR-RNG-003",
    viewerCount: 45,
    purchaseCount: 432,
  },
  {
    id: "11",
    slug: "eden-gold-necklace-set",
    name: "Eden Bridal Necklace Set",
    description:
      "A magnificent bridal set featuring a 22K gold necklace with matching earrings. The necklace features an elaborate design with rubies and emeralds set in traditional temple jewellery style. Includes necklace and matching jhumka earrings.",
    category: "sets",
    metal: "gold",
    purity: "22K",
    grossWeight: 55.0,
    netWeight: 52.0,
    images: [
      unsplash(IMG.bridal1),
      unsplash(IMG.bridal2),
      unsplashPlus(IMG.premBridal),
      unsplashPlus(IMG.premWedding),
    ],
    price: 385000,
    originalPrice: 425000,
    makingCharges: 22000,
    stoneCharges: 35000,
    gst: 11550,
    rating: 5.0,
    reviewCount: 28,
    inStock: true,
    stockCount: 1,
    occasion: ["wedding"],
    collectionId: "eden",
    collectionName: "Eden Bridal Collection",
    relatedProducts: ["6", "14"],
    stoneType: "Ruby & Emerald",
    stoneWeight: 3.2,
    tags: ["gold", "set", "bridal", "wedding", "22k", "ruby", "emerald"],
    sku: "AUR-SET-001",
    hallmarkNumber: "AUR22K007",
    viewerCount: 8,
    purchaseCount: 42,
  },
  {
    id: "12",
    slug: "nova-rose-gold-ring",
    name: "Nova Rose Gold Ring",
    description:
      "A contemporary 18K rose gold ring with a brushed matte finish and polished edges. The warm pink hue of rose gold makes this ring extraordinarily flattering on all skin tones.",
    category: "rings",
    metal: "rose-gold",
    purity: "18K",
    grossWeight: 3.8,
    netWeight: 3.5,
    images: [
      unsplash(IMG.goldRing9),
      unsplashPlus(IMG.premRing2),
      unsplash(IMG.goldRing5),
      unsplash(IMG.lifestyle4),
    ],
    price: 24500,
    makingCharges: 2400,
    gst: 735,
    rating: 4.6,
    reviewCount: 98,
    inStock: true,
    stockCount: 9,
    isNew: true,
    isTrending: true,
    occasion: ["daily", "office", "gifting"],
    relatedProducts: ["1", "5", "10"],
    completeTheLook: ["8", "7"],
    sizes: ["5", "6", "7", "8", "9"],
    tags: ["rose-gold", "ring", "modern", "18k", "trending"],
    sku: "AUR-RNG-004",
    hallmarkNumber: "AUR18K003",
    viewerCount: 28,
    purchaseCount: 215,
  },
  {
    id: "13",
    slug: "classic-gold-pendant",
    name: "Classic Gold Pendant",
    description:
      "A timeless 22K gold pendant with an ornate medallion design. This versatile piece can be worn with any chain length and complements both traditional and modern outfits.",
    category: "pendants",
    metal: "gold",
    purity: "22K",
    grossWeight: 4.0,
    netWeight: 3.8,
    images: [
      unsplash(IMG.necklace4),
      unsplash(IMG.pendant2),
      unsplash(IMG.necklace6),
      unsplash(IMG.chain3),
    ],
    price: 28000,
    makingCharges: 2000,
    gst: 840,
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    stockCount: 11,
    occasion: ["daily", "festive", "gifting"],
    relatedProducts: ["9", "7", "2"],
    completeTheLook: ["7", "1", "8"],
    tags: ["gold", "pendant", "classic", "22k", "versatile"],
    sku: "AUR-PND-002",
    hallmarkNumber: "AUR22K008",
    viewerCount: 11,
    purchaseCount: 298,
  },
  {
    id: "14",
    slug: "imperial-gold-choker",
    name: "Imperial Gold Choker",
    description:
      "A show-stopping 22K gold choker necklace with an intricate mesh design. Sits perfectly at the base of the neck. Features a secure toggle clasp and safety chain. For the woman who commands attention.",
    category: "necklaces",
    metal: "gold",
    purity: "22K",
    grossWeight: 28.0,
    netWeight: 27.0,
    images: [
      unsplash(IMG.necklace3),
      unsplash(IMG.necklace7),
      unsplash(IMG.lifestyle1),
      unsplash(IMG.necklace6),
    ],
    price: 195000,
    makingCharges: 14000,
    gst: 5850,
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    stockCount: 2,
    isBestseller: true,
    occasion: ["wedding", "festive", "party"],
    collectionId: "imperial",
    collectionName: "Imperial Collection",
    relatedProducts: ["2", "6", "11"],
    completeTheLook: ["3", "6"],
    tags: ["gold", "choker", "necklace", "imperial", "22k", "statement"],
    sku: "AUR-NCK-002",
    hallmarkNumber: "AUR22K009",
    dimensions: "14 inches",
    viewerCount: 6,
    purchaseCount: 53,
  },
  {
    id: "15",
    slug: "twilight-gold-bracelet",
    name: "Twilight Gold Bracelet",
    description:
      "An 18K gold tennis bracelet with alternating gold and diamond links. Features 24 round brilliant-cut diamonds. A timeless design that transitions effortlessly from day to evening.",
    category: "bracelets",
    metal: "gold",
    purity: "18K",
    grossWeight: 9.5,
    netWeight: 8.8,
    images: [
      unsplash(IMG.bracelet5),
      unsplash(IMG.bracelet2),
      unsplashPlus(IMG.premBracelet),
      unsplash(IMG.lifestyle3),
    ],
    price: 112000,
    originalPrice: 128000,
    makingCharges: 7200,
    stoneCharges: 42000,
    gst: 3360,
    rating: 4.8,
    reviewCount: 37,
    inStock: true,
    stockCount: 4,
    isNew: true,
    isTrending: true,
    occasion: ["party", "office", "gifting"],
    relatedProducts: ["4", "1", "5"],
    completeTheLook: ["3", "9"],
    stoneType: "Diamond",
    stoneWeight: 1.2,
    tags: ["gold", "bracelet", "diamond", "tennis", "18k"],
    sku: "AUR-BRC-002",
    hallmarkNumber: "AUR18K004",
    viewerCount: 19,
    purchaseCount: 78,
  },
  {
    id: "16",
    slug: "minimal-gold-studs",
    name: "Minimal Gold Studs",
    description:
      "Simple, elegant 22K gold stud earrings with a slightly domed surface. At just 1.2g, these are perfect for everyday wear. The classic that never goes out of style.",
    category: "earrings",
    metal: "gold",
    purity: "22K",
    grossWeight: 1.2,
    netWeight: 1.1,
    images: [
      unsplash(IMG.earring2),
      unsplash(IMG.earring4),
      unsplashPlus(IMG.premDiamondEar),
      unsplash(IMG.earring3),
    ],
    price: 8500,
    makingCharges: 800,
    gst: 255,
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    stockCount: 25,
    isBestseller: true,
    occasion: ["daily", "office"],
    relatedProducts: ["8", "3", "12"],
    completeTheLook: ["7", "12"],
    tags: ["gold", "earrings", "studs", "minimal", "22k", "daily", "bestseller"],
    sku: "AUR-EAR-003",
    hallmarkNumber: "AUR22K010",
    viewerCount: 52,
    purchaseCount: 1247,
  },
];

/* ─── Collections ────────────────────────────────────────── */

export const collections: Collection[] = [
  {
    id: "celestial",
    slug: "celestial",
    name: "Celestial Collection",
    description: "Inspired by the cosmos. Pieces that capture starlight in gold.",
    image: wide(IMG.hero4),
    productCount: 12,
    products: ["1", "8"],
  },
  {
    id: "heritage",
    slug: "heritage",
    name: "Heritage Collection",
    description: "Where tradition meets timeless craftsmanship. Heirloom pieces.",
    image: wide(IMG.necklace1),
    productCount: 8,
    products: ["2"],
  },
  {
    id: "bloom",
    slug: "bloom",
    name: "Bloom Collection",
    description: "Nature's beauty, captured in gold and precious stones.",
    image: wide(IMG.earring1),
    productCount: 10,
    products: ["3"],
  },
  {
    id: "sovereign",
    slug: "sovereign",
    name: "Sovereign Collection",
    description: "Bold, powerful, unapologetic. Statement pieces for statement makers.",
    image: wide(IMG.hero3),
    productCount: 6,
    products: ["4"],
  },
];

/* ─── Categories ─────────────────────────────────────────── */

export const categories = [
  { id: "rings", name: "Rings", slug: "rings", image: unsplash(IMG.goldRing1, 800, 1000), count: 45 },
  { id: "necklaces", name: "Necklaces", slug: "necklaces", image: unsplash(IMG.necklace1, 800, 1000), count: 32 },
  { id: "earrings", name: "Earrings", slug: "earrings", image: unsplash(IMG.earring1, 800, 1000), count: 38 },
  { id: "bracelets", name: "Bracelets", slug: "bracelets", image: unsplash(IMG.bracelet1, 800, 1000), count: 18 },
  { id: "bangles", name: "Bangles", slug: "bangles", image: unsplash(IMG.bangle1, 800, 1000), count: 24 },
  { id: "chains", name: "Chains", slug: "chains", image: unsplash(IMG.chain1, 800, 1000), count: 22 },
  { id: "pendants", name: "Pendants", slug: "pendants", image: unsplash(IMG.pendant1, 800, 1000), count: 28 },
  { id: "sets", name: "Sets", slug: "sets", image: unsplash(IMG.bridal1, 800, 1000), count: 15 },
];

/* ─── Reviews ────────────────────────────────────────────── */

export const reviews: Review[] = [
  {
    id: "r1",
    productId: "1",
    userName: "Priya M.",
    rating: 5,
    comment:
      "Absolutely stunning ring! The craftsmanship is incredible. I wear it every day and get compliments constantly. The gold quality is exceptional.",
    date: "2026-02-10",
    verified: true,
    location: "Mumbai",
  },
  {
    id: "r2",
    productId: "1",
    userName: "Ananya S.",
    rating: 5,
    comment:
      "Bought this as a gift for my mother and she was thrilled. The ring is even more beautiful in person than in the photos. Worth every rupee.",
    date: "2026-02-05",
    verified: true,
    location: "Delhi",
  },
  {
    id: "r3",
    productId: "2",
    userName: "Kavita R.",
    rating: 5,
    comment:
      "This necklace is a showstopper! Wore it to my cousin's wedding and everyone wanted to know where I got it. The heritage design is exquisite.",
    date: "2026-01-28",
    verified: true,
    location: "Bangalore",
  },
  {
    id: "r4",
    productId: "16",
    userName: "Meera K.",
    rating: 5,
    comment:
      "The perfect everyday studs. Lightweight, comfortable, and the gold is such a rich color. I've worn them daily for 3 months and they still look brand new.",
    date: "2026-02-15",
    verified: true,
    location: "Chennai",
  },
  {
    id: "r5",
    productId: "4",
    userName: "Deepa N.",
    rating: 5,
    comment:
      "The weight and quality of this bracelet is outstanding. It feels so luxurious on the wrist. The clasp is secure and the finish is flawless.",
    date: "2026-01-20",
    verified: true,
    location: "Hyderabad",
  },
];

/* ─── Gold Rates ─────────────────────────────────────────── */

export const goldRates: GoldRate[] = [
  { purity: "24K", pricePerGram: 7850, lastUpdated: "2026-02-20T10:30:00", change24h: 0.3 },
  { purity: "22K", pricePerGram: 7200, lastUpdated: "2026-02-20T10:30:00", change24h: 0.3 },
  { purity: "18K", pricePerGram: 5890, lastUpdated: "2026-02-20T10:30:00", change24h: 0.25 },
  { purity: "14K", pricePerGram: 4580, lastUpdated: "2026-02-20T10:30:00", change24h: 0.2 },
];

/* ─── Testimonials ───────────────────────────────────────── */

export const testimonials = [
  {
    id: "t1",
    name: "Anita Sharma",
    location: "Mumbai",
    rating: 5,
    text: "I was hesitant to buy gold jewellery online, but Aurum changed my mind completely. The quality is outstanding, the pricing is transparent, and the packaging made me feel like royalty.",
    product: "Heritage Gold Necklace",
    image: unsplash(IMG.lifestyle1),
  },
  {
    id: "t2",
    name: "Ravi Patel",
    location: "Ahmedabad",
    rating: 5,
    text: "Bought a complete bridal set for my daughter's wedding. Every piece was exactly as described. The BIS hallmark gave us confidence. Will definitely buy again.",
    product: "Eden Bridal Necklace Set",
    image: unsplash(IMG.bridal2),
  },
  {
    id: "t3",
    name: "Sneha Kapoor",
    location: "Delhi",
    rating: 5,
    text: "The Celestial Ring is my everyday piece now. It's so comfortable and the craftsmanship is extraordinary. I've received more compliments on this ring than any other jewellery I own.",
    product: "Celestial Gold Ring",
    image: unsplash(IMG.goldRing2),
  },
  {
    id: "t4",
    name: "Lakshmi Nair",
    location: "Kochi",
    rating: 5,
    text: "What I love about Aurum is the transparency. I can see the exact gold weight, making charges, and GST. No hidden costs. That's rare in the jewellery industry.",
    product: "Whisper Gold Chain",
    image: unsplash(IMG.chain1),
  },
];

/* ─── Social Proof ───────────────────────────────────────── */

export const socialProofData = [
  { name: "Priya", product: "Celestial Gold Ring", location: "Mumbai" },
  { name: "Ananya", product: "Heritage Gold Necklace", location: "Delhi" },
  { name: "Kavita", product: "Bloom Diamond Earrings", location: "Bangalore" },
  { name: "Meera", product: "Minimal Gold Studs", location: "Chennai" },
  { name: "Deepa", product: "Sovereign Gold Bracelet", location: "Hyderabad" },
  { name: "Ritu", product: "Royal Gold Bangle Set", location: "Jaipur" },
  { name: "Swati", product: "Luna Platinum Ring", location: "Pune" },
  { name: "Neha", product: "Nova Rose Gold Ring", location: "Kolkata" },
];

/* ─── Hero Images (exported for use in HeroSection) ──────── */

export const heroImages = {
  main: wide(IMG.hero1),
  secondary: wide(IMG.hero2),
  accent: wide(IMG.hero3),
  banner: wide(IMG.hero4),
  ring: large(IMG.goldRing1),
  necklace: large(IMG.necklace1),
  editorial: unsplash(IMG.lifestyle1, 1200, 800),
};

/* ─── Query Helpers ──────────────────────────────────────── */

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.isTrending);
}

export function getBestsellers(): Product[] {
  return products.filter((p) => p.isBestseller);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product?.relatedProducts) return [];
  return product.relatedProducts.map((id) => getProductById(id)).filter(Boolean) as Product[];
}

export function getCompleteTheLook(productId: string): Product[] {
  const product = getProductById(productId);
  if (!product?.completeTheLook) return [];
  return product.completeTheLook.map((id) => getProductById(id)).filter(Boolean) as Product[];
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.category.includes(q) ||
      p.metal.includes(q),
  );
}
