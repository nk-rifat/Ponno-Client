import { getFeaturedReviews } from "@/lib/api/reviews";
import TestimonialsMarquee from "./TestimonialsMarquee";

const TestimonialsSection = async () => {
  const reviews = await getFeaturedReviews(6);
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-10 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-8 text-center px-4">
        What our customers say
      </h2>
      <TestimonialsMarquee reviews={reviews} />
    </section>
  );
};

export default TestimonialsSection;
