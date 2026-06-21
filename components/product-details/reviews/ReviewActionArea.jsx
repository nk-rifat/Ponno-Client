import Link from "next/link";
import ReviewForm from "./ReviewForm";

const ReviewActionArea = ({
  productId,
  user,
  eligibility,
  showForm,
  editingReview,
  onOpenForm,
  onCloseForm,
  onSuccess,
}) => {
  if (!user) {
    return (
      <p className="text-sm text-gray-500 border border-gray-200 rounded-lg p-4 bg-gray-50">
        <Link
          href="/login"
          className="text-green-600 font-medium hover:underline"
        >
          Log in
        </Link>{" "}
        to write a review if you&apos;ve purchased this product.
      </p>
    );
  }

  if (!eligibility) return null;

  if (showForm) {
    return (
      <ReviewForm
        productId={productId}
        existingReview={editingReview}
        onSuccess={onSuccess}
        onCancel={onCloseForm}
      />
    );
  }

  if (eligibility.canReview) {
    return (
      <button
        onClick={onOpenForm}
        className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
      >
        Write a Review
      </button>
    );
  }

  if (eligibility.existingReview) {
    return (
      <p className="text-sm text-gray-500">
        You&apos;ve already reviewed this product. You can edit it below.
      </p>
    );
  }

  if (eligibility.hasPurchased === false) {
    return (
      <p className="text-sm text-gray-500 border border-gray-200 rounded-lg p-4 bg-gray-50">
        Only customers who have received this product can leave a review.
      </p>
    );
  }

  return null;
};

export default ReviewActionArea;
