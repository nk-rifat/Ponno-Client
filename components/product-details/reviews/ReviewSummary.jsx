import StarRating from "./StarRating";

const ReviewSummary = ({ meta }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mb-8">
      <div className="flex flex-col items-start">
        <span className="text-4xl font-bold text-gray-800">
          {meta.averageRating || "—"}
        </span>
        <StarRating rating={meta.averageRating} size={18} />
        <span className="text-sm text-gray-500 mt-1">
          {meta.total} {meta.total === 1 ? "review" : "reviews"}
        </span>
      </div>

      <div className="flex-1 max-w-sm space-y-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = meta.breakdown[star] || 0;
          const pct = meta.total > 0 ? (count / meta.total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2 text-xs">
              <span className="w-3 text-gray-500">{star}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-6 text-gray-400">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReviewSummary;
