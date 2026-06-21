"use client";

import { Star } from "lucide-react";

const StarRating = ({ rating = 0, onChange, readOnly = true, size = 20 }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <button
            key={star}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(star)}
            className={readOnly ? "cursor-default" : "cursor-pointer"}
            aria-label={`${star} star`}
          >
            <Star
              size={size}
              className={
                filled
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200"
              }
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
