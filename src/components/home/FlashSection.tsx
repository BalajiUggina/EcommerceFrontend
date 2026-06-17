"use client";
import SectionHeader from "@/src/components/common/SectionHeader";
import CountdownTimer from "../common/CountDownTimer";
import ProductSlider from "../common/ProductSlider";

import { Product } from "@/src/types/product";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface FlashSaleSectionProps {
  products: Product[];
}

export default function FlashSaleSection({ products }: FlashSaleSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -600,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 600,
      behavior: "smooth",
    });
  };
  return (
    <section className="py-16 border-b border-gray-200">
      {/* Header */}

      <div className="mb-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end">
          <SectionHeader tag="Today's" title="Flash Sales" />

          <CountdownTimer targetDate="2026-12-31T23:59:59" />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={scrollLeft}
            className="rounded-full bg-[#F5F5F5] p-3"
          >
            <ChevronLeft size={18} className="cursor-pointer" />
          </button>

          <button
            onClick={scrollRight}
            className="rounded-full bg-[#F5F5F5] p-3"
          >
            <ChevronRight size={18} className="cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Products */}

      <ProductSlider products={products} slider={sliderRef} />

      {/* Button */}

      <div className="mt-14 flex justify-center">
        <Link
          href="/products"
          className="
            rounded
            bg-[#DB4444]
            py-4 px-8
            text-[16px]
            font-medium
            text-white
            transition
            hover:bg-[#c93b3b]
          "
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
