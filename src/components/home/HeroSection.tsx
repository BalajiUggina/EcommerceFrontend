import CategorySidebar from "./CategorySideBar";
import HeroBanner from "./HeroBanner";
import { HeroSlide } from "@/src/types/home.type";
interface HeroSectionProps {
  categories: string[];
  slides: HeroSlide[];
}


export default function HeroSection({
  categories,
  slides,
}: HeroSectionProps) {
  return (
    <section className="mt-10">
      <div className="flex gap-8">
        <CategorySidebar categories={categories} />

        <HeroBanner slides={slides} />
      </div>
    </section>
  );
}