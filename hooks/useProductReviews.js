"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchProductReviews, checkReviewEligibility } from "@/lib/api/reviews";

const DEFAULT_META = {
  total: 0,
  totalPages: 1,
  averageRating: 0,
  breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
};

export const useProductReviews = (productId, user) => {
  const [reviews, setReviews] = useState([]);
  const [meta, setMeta] = useState(DEFAULT_META);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [eligibility, setEligibility] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const loadReviews = useCallback(
    async (pageToLoad, { append = false } = {}) => {
      append ? setLoadingMore(true) : setLoading(true);
      try {
        const data = await fetchProductReviews(productId, {
          page: pageToLoad,
          sort,
        });
        setReviews((prev) =>
          append ? [...prev, ...data.reviews] : data.reviews,
        );
        setMeta({
          total: data.total,
          totalPages: data.totalPages,
          averageRating: data.averageRating,
          breakdown: data.breakdown,
        });
        setPage(pageToLoad);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        append ? setLoadingMore(false) : setLoading(false);
      }
    },
    [productId, sort],
  );

  const refreshEligibility = useCallback(() => {
    if (!user) {
      setEligibility(null);
      return;
    }
    checkReviewEligibility(productId)
      .then(setEligibility)
      .catch(() => setEligibility(null));
  }, [productId, user]);

  useEffect(() => {
    loadReviews(1);
  }, [productId, sort]);

  useEffect(() => {
    refreshEligibility();
  }, [refreshEligibility]);

  const handleLoadMore = () => {
    loadReviews(page + 1, { append: true });
  };

  const handleReviewSuccess = () => {
    setShowForm(false);
    setEditingReview(null);
    loadReviews(1);
    refreshEligibility();
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDeleted = () => {
    loadReviews(1);
    refreshEligibility();
  };

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setEditingReview(null);
  };

  return {
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
  };
};
