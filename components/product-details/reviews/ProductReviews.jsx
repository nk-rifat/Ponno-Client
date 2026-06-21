"use client";

import { useAuth } from "@/hooks/useAuth";
import { useProductReviews } from "@/hooks/useProductReviews";
import ReviewSummary from "./ReviewSummary";
import ReviewActionArea from "./ReviewActionArea";
import ReviewSortControl from "./ReviewSortControl";
import ReviewList from "./ReviewList";

const ProductReviews = ({ productId }) => {
  const { user } = useAuth();
  const {
    reviews,
    meta,
    page,
    sort,
    setSort,
    loading,
    loadingMore,
    eligibility,
    showForm,
    editingReview,
    handleLoadMore,
    handleReviewSuccess,
    handleEdit,
    handleDeleted,
    openForm,
    closeForm,
  } = useProductReviews(productId, user);

  return (
    <div>
      <ReviewSummary meta={meta} />

      <div className="mb-8">
        <ReviewActionArea
          productId={productId}
          user={user}
          eligibility={eligibility}
          showForm={showForm}
          editingReview={editingReview}
          onOpenForm={openForm}
          onCloseForm={closeForm}
          onSuccess={handleReviewSuccess}
        />
      </div>

      <ReviewSortControl
        sort={sort}
        onSortChange={setSort}
        visible={meta.total > 0}
      />

      <ReviewList
        reviews={reviews}
        loading={loading}
        loadingMore={loadingMore}
        productId={productId}
        user={user}
        page={page}
        totalPages={meta.totalPages}
        onEdit={handleEdit}
        onDeleted={handleDeleted}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ProductReviews;
