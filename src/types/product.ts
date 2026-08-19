export interface Product {
  id: number;
  name: string;
  image: string;
  images?: string[];
  salePrice: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  description?: string;
  colors?: string[];
  sizes?: string[];
  category?: string;
  inStock?: boolean;
}