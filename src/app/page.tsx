"use client";

import HeroSection from "../components/home/HeroSection";
import FlashSaleSection from "../components/home/FlashSection";
import ExploreProducts from "../components/home/ExploreProducts";
import FeatureBlocks from "../components/home/FeatureBlocks";

import { useAppSelector } from "../store/hooks";
import { categories, heroSlides } from "../store/data";

export default function HomePage() {
  const products = useAppSelector((state) => state.products.items);
  const flashSaleProducts = products.filter((p) => p.discountPercent > 0);
  const exploreProducts = products.slice(0, 8);

  return (
    <main className="container mx-auto px-6 max-w-[1170px]">
      <HeroSection
        categories={categories}
        slides={heroSlides}
      />

      <FlashSaleSection
        products={flashSaleProducts}
      />

      <ExploreProducts
        products={exploreProducts}
      />

      <FeatureBlocks />
    </main>
  );
}