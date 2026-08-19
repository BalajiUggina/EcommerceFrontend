import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/src/types/product";

export interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  searchQuery: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "HAVIT HV-G92 Gamepad",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
    images: [
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
      "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f",
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1"
    ],
    salePrice: 120,
    originalPrice: 160,
    discountPercent: 40,
    rating: 5,
    reviewCount: 88,
    category: "Electronics",
    description: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    colors: ["#DB4444", "#172554"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 2,
    name: "AK-900 Wired Keyboard",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
    images: [
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3"
    ],
    salePrice: 960,
    originalPrice: 1160,
    discountPercent: 35,
    rating: 4,
    reviewCount: 75,
    category: "Electronics",
    description: "Precision gaming keyboard with customizable backlit effects, linear mechanical keys, and dedicated media controls.",
    colors: ["#000000", "#ffffff"],
    sizes: ["M", "L"],
    inStock: true,
  },
  {
    id: 3,
    name: "IPS LCD Gaming Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
      "https://images.unsplash.com/photo-1547119957-637f8679db1e"
    ],
    salePrice: 370,
    originalPrice: 400,
    discountPercent: 30,
    rating: 4,
    reviewCount: 99,
    category: "Electronics",
    description: "Ultra-wide 27-inch IPS gaming monitor with 144Hz refresh rate, 1ms response time, and AMD FreeSync Premium support.",
    colors: ["#000000"],
    sizes: ["L"],
    inStock: true,
  },
  {
    id: 4,
    name: "S-Series Comfort Chair",
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    images: [
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
      "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27"
    ],
    salePrice: 375,
    originalPrice: 400,
    discountPercent: 25,
    rating: 4,
    reviewCount: 99,
    category: "Home & Lifestyle",
    description: "Ergonomic leather executive chair with adjustable lumbar support, armrests, and 360-degree swivel wheels.",
    colors: ["#1e293b", "#7f1d1d"],
    sizes: ["L", "XL"],
    inStock: true,
  },
  {
    id: 5,
    name: "Sony Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944"
    ],
    salePrice: 250,
    originalPrice: 350,
    discountPercent: 20,
    rating: 5,
    reviewCount: 120,
    category: "Electronics",
    description: "Industry-leading noise canceling over-ear headphones with long battery life and high fidelity audio.",
    colors: ["#000000", "#172554", "#ffffff"],
    sizes: ["M"],
    inStock: true,
  },
  {
    id: 6,
    name: "LCD Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf"
    ],
    salePrice: 850,
    originalPrice: 850,
    discountPercent: 0,
    rating: 5,
    reviewCount: 48,
    category: "Electronics",
    description: "Vibrant and reliable desktop monitor suited for office productivity, creative work, and standard media consumption.",
    colors: ["#000000"],
    sizes: ["M", "L"],
    inStock: true,
  },
  {
    id: 7,
    name: "H1 Gamepad",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3"
    ],
    salePrice: 550,
    originalPrice: 1100,
    discountPercent: 50,
    rating: 5,
    reviewCount: 132,
    category: "Electronics",
    description: "Premium wireless dual-vibration controller with high response rates and custom trigger mappings.",
    colors: ["#000000", "#7f1d1d"],
    sizes: ["S", "M"],
    inStock: true,
  },
  {
    id: 8,
    name: "RGB liquid CPU Cooler",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7",
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7"
    ],
    salePrice: 1950,
    originalPrice: 1950,
    discountPercent: 0,
    rating: 4,
    reviewCount: 65,
    category: "Electronics",
    description: "Advanced liquid cooling system with three 120mm RGB fans, keeping your high-end processor operating smoothly under load.",
    colors: ["#000000"],
    sizes: ["L"],
    inStock: true,
  },
  {
    id: 9,
    name: "GP11 Shooter USB Gamepad",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48",
    images: [
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48"
    ],
    salePrice: 550,
    originalPrice: 550,
    discountPercent: 0,
    rating: 4,
    reviewCount: 81,
    category: "Electronics",
    description: "High precision USB gaming gamepad designed for shooting and tactical action games. Simple plug-and-play.",
    colors: ["#000000", "#3b82f6"],
    sizes: ["M"],
    inStock: true,
  },
  {
    id: 10,
    name: "Quilted Satin Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    ],
    salePrice: 750,
    originalPrice: 750,
    discountPercent: 0,
    rating: 5,
    reviewCount: 110,
    category: "Men's Fashion",
    description: "Stylish, wind-resistant quilted satin jacket. Perfect lightweight streetwear option for cool climates.",
    colors: ["#064e3b", "#0f172a"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
  },
  {
    id: 11,
    name: "ASUS FHD Gaming Laptop",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302"
    ],
    salePrice: 960,
    originalPrice: 1160,
    discountPercent: 17,
    rating: 5,
    reviewCount: 143,
    category: "Electronics",
    description: "High-power gaming laptop with Full HD display, AMD Ryzen 7 processor, and NVIDIA RTX graphics processor.",
    colors: ["#1e293b"],
    sizes: ["L"],
    inStock: true,
  },
  {
    id: 12,
    name: "Breed Dry Dog Food",
    image: "https://images.unsplash.com/photo-1589724430480-796391410d6e",
    images: [
      "https://images.unsplash.com/photo-1589724430480-796391410d6e"
    ],
    salePrice: 100,
    originalPrice: 100,
    discountPercent: 0,
    rating: 4,
    reviewCount: 35,
    category: "Groceries & Pets",
    description: "Nutritious and balanced dry kibble formulated specifically for medium to large breeds to promote a healthy coat and joints.",
    colors: ["#d97706"],
    sizes: ["L"],
    inStock: true,
  },
  {
    id: 13,
    name: "Canon EOS DSLR Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    ],
    salePrice: 360,
    originalPrice: 360,
    discountPercent: 0,
    rating: 4,
    reviewCount: 95,
    category: "Electronics",
    description: "High-resolution digital camera with built-in autofocus and stabilizer. Excellent choice for budding photographers.",
    colors: ["#000000"],
    sizes: ["M"],
    inStock: true,
  },
  {
    id: 14,
    name: "Curology Product Set",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03"
    ],
    salePrice: 500,
    originalPrice: 500,
    discountPercent: 0,
    rating: 4,
    reviewCount: 102,
    category: "Health & Beauty",
    description: "Personalized skincare regimen including cleanser, moisturizer, and treatment lotion custom-targeted to clear skin.",
    colors: ["#ffffff"],
    sizes: ["S"],
    inStock: true,
  },
  {
    id: 15,
    name: "Kids Electric Car",
    image: "https://images.unsplash.com/photo-1596567189069-b599388dfc4d",
    images: [
      "https://images.unsplash.com/photo-1596567189069-b599388dfc4d"
    ],
    salePrice: 960,
    originalPrice: 960,
    discountPercent: 0,
    rating: 5,
    reviewCount: 201,
    category: "Baby's & Toys",
    description: "Realistic electric ride-on toy car with parental remote control, LED headlights, and MP3 connection.",
    colors: ["#b91c1c", "#1e3a8a"],
    sizes: ["L"],
    inStock: true,
  },
  {
    id: 16,
    name: "Jr. Zoom Soccer Cleats",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    ],
    salePrice: 360,
    originalPrice: 360,
    discountPercent: 0,
    rating: 5,
    reviewCount: 78,
    category: "Sports & Outdoor",
    description: "Lightweight junior soccer cleats designed for excellent traction and acceleration on firm ground fields.",
    colors: ["#b91c1c", "#eab308"],
    sizes: ["S", "M"],
    inStock: true,
  }
];

const initialState: ProductsState = {
  items: mockProducts,
  selectedProduct: null,
  searchQuery: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<number>) => {
      state.selectedProduct = state.items.find(p => p.id === action.payload) || null;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  }
});

export const { setSearchQuery, setSelectedProduct, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer;
