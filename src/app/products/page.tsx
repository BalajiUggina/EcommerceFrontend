"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/src/store/hooks";
import ProductCard from "@/src/components/common/ProductCard";
import { categories } from "@/src/store/data";
import { getCall } from "@/src/services/api";
import { Product } from "@/src/types/product";
export default function ProductsPage() {

  const [products, setProducts] = useState<Product[] | null>(null);
  const searchQuery = useAppSelector((state) => state.products.searchQuery);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        interface ProductsResponse {
          message: string;
          data: Product[];
        }
        const res = await getCall<ProductsResponse>("products/");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]); // Fallback to avoid infinite loading on error
      }
    };
    fetchProducts();
  }, []);

  // Loading state
  if (!products) {
    return (
      <div className="container mx-auto px-6 py-10 max-w-[1170px]">
        {/* Title & Filter Bar Placeholder */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-black">Explore Products</h1>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="min-w-[270px] max-w-[270px]">
              <div className="relative h-[250px] rounded bg-bg-secondary skeleton" />
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded skeleton" />
                <div className="h-4 w-1/2 rounded skeleton" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Filtering
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.salePrice - b.salePrice;
    }
    if (sortBy === "price-high") {
      return b.salePrice - a.salePrice;
    }
    if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0; // default
  });

  return (
    <div className="container mx-auto px-6 py-10 max-w-[1170px]">
      {/* Title & Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-black">Explore Products</h1>
          {searchQuery && (
            <p className="text-sm text-gray-500 mt-1">
              Search results for: <span className="font-medium text-black">"{searchQuery}"</span>
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-bg-secondary text-black rounded px-3 py-1.5 text-sm outline-none border border-transparent focus:border-primary"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-bg-secondary text-black rounded px-3 py-1.5 text-sm outline-none border border-transparent focus:border-primary"
            >
              <option value="default">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Popularity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex justify-center">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-gray-500 font-medium">No products found matching your selection.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSortBy("default");
            }}
            className="btn-primary mt-6 px-6 py-2.5"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
