import axiosInstance from "../axiosInstance";

// get wishlist items
export const getWishlist = async () => {
  const res = await axiosInstance.get("/api/wishlist");
  return res.data.items;
};

// toggle wishlist
export const toggleWishlist = async (productId) => {
  const res = await axiosInstance.post("/api/wishlist/toggle", { productId });
  return res.data;
};

// clear wishlist
export const clearWishlist = async () => {
  const res = await axiosInstance.delete("/api/wishlist");
  return res.data;
};
