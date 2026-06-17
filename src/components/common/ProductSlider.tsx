"use client";

import { RefObject, useRef } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/src/types/product";

interface ProductSliderProps {
  products: Product[];
  slider?: RefObject<HTMLDivElement | null> | null;
}

export default function ProductSlider({
  products,
  slider,
}: ProductSliderProps) {
  const sliderRef = slider ?? useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div
        ref={sliderRef}
        className="
          flex
          gap-8
          overflow-x-scroll
          scroll-smooth
          scrollbar-hide
          hide-scrollbar
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
