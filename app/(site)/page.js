import CategoryGrid from "@/components/home/category/CategoryGrid";
import FeaturedProducts from "@/components/home/featured-products/FeaturedProducts";
import HeroSlider from "@/components/home/hero/HeroSlider";
import TestimonialsSection from "@/components/home/reviews/TestimonialsSection";

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
