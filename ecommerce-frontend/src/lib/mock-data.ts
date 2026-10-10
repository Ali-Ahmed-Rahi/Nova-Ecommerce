import type { Address, Brand, Cart, Category, Coupon, Order, Product, Review, User, WishlistItem } from "@/types";

export const categories: Category[] = [
  {
    id: "c-1",
    name: "Audio",
    slug: "audio",
    description: "High-fidelity sound for everyday listening.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "c-2",
    name: "Wearables",
    slug: "wearables",
    description: "Smart essentials designed to move with you.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "c-3",
    name: "Home",
    slug: "home",
    description: "Minimal pieces to upgrade your home rituals.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "c-4",
    name: "Travel",
    slug: "travel",
    description: "Refined gear for mobile living and city escapes.",
    image: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=80",
  },
];

export const brands: Brand[] = [
  { id: "b-1", name: "Auralis", slug: "auralis" },
  { id: "b-2", name: "North Peak", slug: "north-peak" },
  { id: "b-3", name: "Milo", slug: "milo" },
  { id: "b-4", name: "Luma", slug: "luma" },
];

export const mockProducts: Product[] = [
  {
    id: "p-1",
    name: "Auralis Pro Headphones",
    slug: "auralis-pro-headphones",
    description:
      "Precision-tuned wireless headphones with adaptive noise cancelling, leather-touch ear cushions, and all-day battery life for immersive listening.",
    shortDescription: "Immersive audio, stay unplugged all day.",
    price: 249,
    comparePrice: 329,
    rating: 4.9,
    reviewCount: 142,
    stock: 18,
    sku: "AUR-PR-001",
    category: "Audio",
    brand: "Auralis",
    images: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
    ],
    tags: ["wireless", "premium", "noise-cancelling"],
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    variants: [
      { id: "v-1", name: "Black", price: 249, comparePrice: 329, stock: 10, sku: "AUR-PR-001-BLK" },
      { id: "v-2", name: "Stone", price: 269, comparePrice: 349, stock: 8, sku: "AUR-PR-001-STN" },
    ],
  },
  {
    id: "p-2",
    name: "North Peak Smartwatch",
    slug: "north-peak-smartwatch",
    description:
      "A refined titanium smartwatch with GPS, heart rate tracking, wellness insights, and a 36-hour battery for everyday performance.",
    shortDescription: "Luxury performance on your wrist.",
    price: 319,
    comparePrice: 399,
    rating: 4.8,
    reviewCount: 94,
    stock: 14,
    sku: "NPK-SW-204",
    category: "Wearables",
    brand: "North Peak",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80",
    ],
    tags: ["fitness", "gps", "premium"],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    variants: [
      { id: "v-3", name: "Silver", price: 319, comparePrice: 399, stock: 7, sku: "NPK-SW-204-SLV" },
      { id: "v-4", name: "Black", price: 339, comparePrice: 429, stock: 7, sku: "NPK-SW-204-BLK" },
    ],
  },
  {
    id: "p-3",
    name: "Luma Arc Lamp",
    slug: "luma-arc-lamp",
    description:
      "A sculptural ambient lamp with warm dimmable light, tactile ceramic finish, and a design language made for modern interiors.",
    shortDescription: "Soft lighting with sculptural presence.",
    price: 189,
    comparePrice: 239,
    rating: 4.7,
    reviewCount: 68,
    stock: 22,
    sku: "LUM-ARC-019",
    category: "Home",
    brand: "Luma",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1000&q=80",
    ],
    tags: ["lighting", "home", "dimmable"],
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    variants: [
      { id: "v-5", name: "Sand", price: 189, comparePrice: 239, stock: 12, sku: "LUM-ARC-019-SAN" },
      { id: "v-6", name: "Oak", price: 205, comparePrice: 249, stock: 10, sku: "LUM-ARC-019-OAK" },
    ],
  },
  {
    id: "p-4",
    name: "Milo Carry Tote",
    slug: "milo-carry-tote",
    description:
      "A premium everyday carry tote with weather-resistant fabric, thoughtful organization, and an understated silhouette for work or travel.",
    shortDescription: "Designed for polished daily movement.",
    price: 149,
    comparePrice: 189,
    rating: 4.6,
    reviewCount: 51,
    stock: 26,
    sku: "MIL-TOT-112",
    category: "Travel",
    brand: "Milo",
    images: [
      "https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
    ],
    tags: ["travel", "everyday", "minimal"],
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    variants: [
      { id: "v-7", name: "Espresso", price: 149, comparePrice: 189, stock: 15, sku: "MIL-TOT-112-ESP" },
      { id: "v-8", name: "Onyx", price: 159, comparePrice: 199, stock: 11, sku: "MIL-TOT-112-ONY" },
    ],
  },
  {
    id: "p-5",
    name: "Auralis Studio Speaker",
    slug: "auralis-studio-speaker",
    description:
      "Wireless room-filling sound with deep bass, voice assistant support, and a compact silhouette that suits modern living spaces.",
    shortDescription: "Room-filling sound in a compact form.",
    price: 299,
    comparePrice: 359,
    rating: 4.8,
    reviewCount: 113,
    stock: 9,
    sku: "AUR-ST-055",
    category: "Audio",
    brand: "Auralis",
    images: [
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    ],
    tags: ["speaker", "wireless", "audio"],
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    variants: [
      { id: "v-9", name: "Cream", price: 299, comparePrice: 359, stock: 6, sku: "AUR-ST-055-CRM" },
      { id: "v-10", name: "Graphite", price: 319, comparePrice: 389, stock: 3, sku: "AUR-ST-055-GRA" },
    ],
  },
  {
    id: "p-6",
    name: "North Peak Pulse Band",
    slug: "north-peak-pulse-band",
    description:
      "A lightweight wellness tracker with all-day comfort, recovery insights, and elevated materials that feel premium from first wear.",
    shortDescription: "Daily wellness, elevated.",
    price: 129,
    comparePrice: 169,
    rating: 4.5,
    reviewCount: 77,
    stock: 30,
    sku: "NPK-PB-008",
    category: "Wearables",
    brand: "North Peak",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    ],
    tags: ["wellness", "tracker", "minimal"],
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    variants: [
      { id: "v-11", name: "Black", price: 129, comparePrice: 169, stock: 20, sku: "NPK-PB-008-BLK" },
      { id: "v-12", name: "Stone", price: 139, comparePrice: 179, stock: 10, sku: "NPK-PB-008-STN" },
    ],
  },
];

export const currentUser: User = {
  id: "u-1",
  firstName: "Mila",
  lastName: "Brooks",
  email: "mila@example.com",
  role: "customer",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
};

export const mockCart: Cart = {
  items: [
    {
      id: "ci-1",
      productId: "p-1",
      productName: "Auralis Pro Headphones",
      image: mockProducts[0].images[0],
      quantity: 1,
      unitPrice: 249,
      variant: "Black",
    },
    {
      id: "ci-2",
      productId: "p-2",
      productName: "North Peak Smartwatch",
      image: mockProducts[1].images[0],
      quantity: 1,
      unitPrice: 319,
      variant: "Silver",
    },
  ],
  subtotal: 568,
  shipping: 20,
  tax: 51,
  total: 639,
};

export const mockWishlist: WishlistItem[] = [
  {
    id: "w-1",
    productId: "p-3",
    productName: "Luma Arc Lamp",
    image: mockProducts[2].images[0],
    price: 189,
  },
  {
    id: "w-2",
    productId: "p-5",
    productName: "Auralis Studio Speaker",
    image: mockProducts[4].images[0],
    price: 299,
  },
];

export const mockReviews: Review[] = [
  {
    id: "r-1",
    user: "Avery T.",
    rating: 5,
    title: "Worth every penny",
    comment: "The sound quality is fantastic and the fit feels premium. It instantly upgraded my desk setup.",
    createdAt: "2026-08-24",
  },
  {
    id: "r-2",
    user: "Jonas H.",
    rating: 4,
    title: "Beautiful design",
    comment: "It looks as good as it feels. Great battery life and comfort for long listening sessions.",
    createdAt: "2026-08-19",
  },
];

export const mockOrders: Order[] = [
  {
    id: "o-1",
    orderNumber: "#10248",
    createdAt: "2026-09-15",
    status: "Shipped",
    paymentStatus: "Paid",
    total: 639,
    items: mockCart.items,
  },
  {
    id: "o-2",
    orderNumber: "#10187",
    createdAt: "2026-08-18",
    status: "Delivered",
    paymentStatus: "Paid",
    total: 189,
    items: [{ ...mockCart.items[0], quantity: 1 }],
  },
];

export const mockCoupons: Coupon[] = [
  { id: "cp-1", code: "SAVE10", discount: 10, description: "10% off eligible items", active: true },
  { id: "cp-2", code: "FREESHIP", discount: 0, description: "Free shipping on orders over $100", active: true },
];

export const mockAddresses: Address[] = [
  {
    id: "a-1",
    fullName: "Mila Brooks",
    line1: "214 Mercer Street",
    line2: "Apartment 3B",
    city: "New York",
    state: "NY",
    postalCode: "10012",
    country: "United States",
  },
  {
    id: "a-2",
    fullName: "Mila Brooks",
    line1: "88 California Avenue",
    city: "San Francisco",
    state: "CA",
    postalCode: "94103",
    country: "United States",
  },
];
