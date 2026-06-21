import ReviewCard from "./ReviewCard";

const ReviewList = ({
  reviews,
  loading,
  loadingMore,
  productId,
  user,
  page,
  totalPages,
  onEdit,
  onDeleted,
  onLoadMore,
}) => {
  if (loading) {
    return <p className="text-sm text-gray-400">Loading reviews...</p>;
  }

  if (reviews.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        No reviews yet. Be the first to review this product.
      </p>
    );
  }

  return (
    <div>
      {reviews.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          productId={productId}
          isOwner={user && review.userId?._id === user._id}
          isAdmin={user && user.role === "admin"}
          onEdit={onEdit}
          onDeleted={onDeleted}
        />
      ))}

      {page < totalPages && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="text-sm font-medium px-5 py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-60 transition"
          >
            {loadingMore ? "Loading..." : "Load More Reviews"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
