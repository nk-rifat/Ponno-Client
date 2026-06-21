import axiosInstance from "../axiosInstance";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getReviewSummary = async (productId) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/products/${productId}/reviews?page=1&limit=1`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return { averageRating: 0, total: 0 };
    const data = await res.json();
    return { averageRating: data.averageRating, total: data.total };
  } catch (error) {
    console.error("getReviewSummary error:", error);
    return { averageRating: 0, total: 0 };
  }
};

export const fetchProductReviews = async (
  productId,
  { page = 1, sort = "newest" } = {},
) => {
  const res = await axiosInstance.get(`/api/products/${productId}/reviews`, {
    params: { page, sort, limit: 5 },
  });
  return res.data;
};

export const checkReviewEligibility = async (productId) => {
  const res = await axiosInstance.get(
    `/api/products/${productId}/reviews/eligibility`,
  );
  return res.data;
};

export const submitReview = async (productId, { rating, comment }) => {
  const res = await axiosInstance.post(`/api/products/${productId}/reviews`, {
    rating,
    comment,
  });
  return res.data;
};

export const editReview = async (productId, reviewId, { rating, comment }) => {
  const res = await axiosInstance.put(
    `/api/products/${productId}/reviews/${reviewId}`,
    { rating, comment },
  );
  return res.data;
};

export const removeReview = async (productId, reviewId) => {
  const res = await axiosInstance.delete(
    `/api/products/${productId}/reviews/${reviewId}`,
  );
  return res.data;
};

// reviews for home page
export const getFeaturedReviews = async (limit = 6) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products/reviews?limit=${limit}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    console.log(data);
    return data.reviews;
  } catch (error) {
    console.error("getFeaturedReviews error:", error);
    return [];
  }
};
