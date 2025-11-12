import { DummyProduct, FakeProduct } from "@prisma/client";

// types.ts
export interface FakeProductRating {
  rate: number;
  count: number;
}

// export interface FakeProduct {
//   id: number;
//   title: string;
//   price: number;
//   description: string;
//   category: string;
//   image: string;
//   rating: FakeProductRating;
// }

export type ProductsArray = FakeProduct[];

// Utility types for filtering and sorting
export type ProductCategory =
  | "men's clothing"
  | "women's clothing"
  | "jewelery"
  | "electronics";

export type SortOption =
  | "price-low-high"
  | "price-high-low"
  | "rating"
  | "name";

// Type for product filters
export interface ProductFilters {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
}

// Type for API response
export interface ProductsResponse {
  products: FakeProduct[];
  total: number;
  skip: number;
  limit: number;
}

// Type for cart item
export interface CartItem extends FakeProduct {
  quantity: number;
}

// Type for creating a new product (without id and rating)
export type CreateProduct = Omit<FakeProduct, "id" | "rating"> & {
  rating?: FakeProductRating; // Optional for creation
};

export interface DummyProductDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface DummyReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface DummyMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

// export interface DummyProduct {
//   id: number;
//   title: string;
//   description: string;
//   category: string;
//   price: number;
//   discountPercentage: number;
//   rating: number;
//   stock: number;
//   tags: string[];
//   brand?: string;
//   sku: string;
//   weight: number;
//   dimensions: DummyProductDimensions;
//   warrantyInformation: string;
//   shippingInformation: string;
//   availabilityStatus: string;
//   reviews: DummyReview[];
//   returnPolicy: string;
//   minimumOrderQuantity: number;
//   meta: DummyMeta;
//   images: string[];
//   thumbnail: string;
// }

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}

export type SingleCategory =
  | "زیبایی"
  | "لباس مردانه"
  | "جواهرات"
  | "الکترونیک"
  | "لباس زنانه"
  | "عطر ها"
  | "خواربار"
  | "مبلمان";

export type AllCategories = SingleCategory[];

export type Product = DummyProduct | FakeProduct;

export function isDummyProduct(product: Product): product is DummyProduct {
  return "images" in product && Array.isArray((product as DummyProduct).images);
}

export function isFakeProduct(product: Product): product is FakeProduct {
  return "image" in product;
}
