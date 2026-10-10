export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type ProductVariant = {
  id: string;
  name: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  category: string;
  categorySlug?: string;
  brand: string;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  variants: ProductVariant[];
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'customer' | 'admin';
  avatar?: string;
};

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  image: string;
  quantity: number;
  unitPrice: number;
  variant?: string;
};

export type Cart = {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export type WishlistItem = {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
};

export type Review = {
  id: string;
  user: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
};

export type OrderStatus = 'Pending' | 'Paid' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  total: number;
  subtotal?: number;
  shipping?: number;
  tax?: number;
  items: CartItem[];
};

export type Coupon = {
  id: string;
  code: string;
  discount: number;
  description: string;
  active: boolean;
};

export type Address = {
  id: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
