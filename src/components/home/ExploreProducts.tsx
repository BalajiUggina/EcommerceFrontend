"use client";

import SectionHeader from "../common/SectionHeader";
import ProductCard from "../common/ProductCard";
import Link from "next/link";
import { Product } from "@/src/types/product";

interface ExploreProductsProps {
  products: Product[];
}

export default function ExploreProducts({ products }: ExploreProductsProps) {
  return (
    <section className="py-16 border-b border-gray-200">
      {/* Header */}
      <div className="mb-10">
        <SectionHeader tag="Our Products" title="Explore Our Products" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="flex justify-center">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="mt-14 flex justify-center">
        <Link
          href="/products"
          className="btn-primary py-4 px-8 text-[16px]"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
