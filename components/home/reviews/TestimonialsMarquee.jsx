"use client";
import Marquee from "react-fast-marquee";
import ReviewCardHome from "./ReviewCardHome";

const TestimonialsMarquee = ({ reviews }) => {
  return (
    <Marquee direction="left" speed={40} pauseOnHover gradient={false}>
      {reviews.map((review) => (
        <div key={review._id} className="w-80 mx-3">
          <ReviewCardHome review={review} />
        </div>
      ))}
    </Marquee>
  );
};

export default TestimonialsMarquee;
