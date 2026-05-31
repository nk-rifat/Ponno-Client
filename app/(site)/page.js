import CategoryGrid from "@/components/home/category/CategoryGrid";
import FeaturedProducts from "@/components/home/featured-products/FeaturedProducts";
import HeroSlider from "@/components/home/hero/HeroSlider";

export default function HomePage() {
  return (
    <>
    <HeroSlider />
    <CategoryGrid/>
    <FeaturedProducts/>
    </>
  );
}