"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { HeroBannerProps } from "@/src/types/home.type";

export default function HeroBanner({
  slides,
}: HeroBannerProps) {
  return (
    <div className="min-w-0 flex-1">
      <Swiper
        modules={[Pagination, Autoplay]}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-[344px] overflow-hidden bg-black rounded-md">
              <div className="absolute inset-0 z-10 bg-black/40" />

              <div className="absolute z-20 flex h-full w-full items-center px-16">
                <div className="max-w-md text-white">
                  <p className="mb-4 text-lg">
                    {slide.subtitle}
                  </p>

                  <h2 className="mb-8 text-5xl font-semibold">
                    {slide.title}
                  </h2>

                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 border-b border-white pb-1"
                  >
                    {slide.buttonText}
                    <span>→</span>
                  </Link>
                </div>
              </div>

              <Image
                fill
                src={slide.image}
                alt={slide.title}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}