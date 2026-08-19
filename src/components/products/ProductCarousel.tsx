"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductCarouselProps {
  images: string[];
  title: string;
}

export default function ProductCarousel({ images, title }: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const fallbackImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ccc' stroke-width='2'%3E%3Crect width='18' height='18' x='3' y='3' rx='2' ry='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E%3C/svg%3E";
  const validImages = images ? images.filter((img) => typeof img === "string" && img.trim() !== "") : [];
  const displayImages = validImages.length > 0 ? validImages : [fallbackImg];

  const safeTitle = title || "Product image";

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
      {/* Thumbnails list */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto hide-scrollbar max-h-[500px]">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`
              relative
              w-[80px]
              h-[80px]
              rounded
              bg-bg-secondary
              flex-shrink-0
              border-2
              transition
              cursor-pointer
              ${activeIndex === idx ? "border-primary" : "border-transparent hover:border-gray-300"}
            `}
          >
            <Image
              fill
              src={img}
              alt={`${safeTitle} thumbnail ${idx + 1}`}
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>

      {/* Main image view */}
      <div className="relative flex-1 h-[300px] md:h-[500px] rounded bg-bg-secondary flex items-center justify-center overflow-hidden">
        <Image
          fill
          src={displayImages[activeIndex]}
          alt={safeTitle}
          className="object-contain p-8 transition-all duration-300"
          priority
        />
      </div>
    </div>
  );
}
