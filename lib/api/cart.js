import axios from "axios";
import axiosInstance from "../axiosInstance";

// get all cart items
export const getCartItems = async () => {
  const res = await axiosInstance.get("/api/cart");
  return res.data;
};

// save to cart
export const saveCartItem = async (productId, quantity) => {
  const res = await axiosInstance.post("/api/cart", { productId, quantity });
  return res.data;
};

// delete single cart item
export const deleteCartItem = async (productId) => {
  const res = await axiosInstance.delete(`/api/cart/${productId}`);
  return res.data;
};

// clear cart
export const clearCart = async () => {
  const res = await axiosInstance.delete("/api/cart");
  return res.data;
};
