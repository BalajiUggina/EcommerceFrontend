import FlashSaleSection from "../components/home/FlashSection";
import HeroSection from "../components/home/HeroSection";

import { categories } from "../store/data";
import { heroSlides } from "../store/data";
import { flashSaleProducts } from "../store/flash-sale-products";

export default function HomePage() {
  return (
    <main className="container mx-auto px-6">
      <HeroSection
        categories={categories}
        slides={heroSlides}
      />

      <FlashSaleSection
        products={flashSaleProducts}
      />
    </main>
  );
}