export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
}
export interface CategorySidebarProps {
  categories: string[];
}

export interface HeroBannerProps {
  slides: HeroSlide[];
}