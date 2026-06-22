import CategoryGrid from "@/components/home/category/CategoryGrid";
import FeaturedProducts from "@/components/home/featured-products/FeaturedProducts";
import HeroSlider from "@/components/home/hero/HeroSlider";

import TestimonialsSection from "@/components/home/reviews/TestimonialsSection";
export const metadata = {
  title: "Ponno | Handcrafted Bamboo & Cane Products",
  description:
    "Discover authentic handcrafted bamboo, cane, and jute products made by skilled artisans in Bangladesh. Shop unique, sustainable, and locally sourced crafts at Ponno.",
};

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <CategoryGrid />
      <FeaturedProducts />
      <TestimonialsSection />
    </>
  );
}
