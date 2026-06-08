import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCartItems,
  saveCartItem,
  deleteCartItem,
  clearCart,
} from "@/lib/api/cart";

export const loadCart = createAsyncThunk(
  "cart/loadCart",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCartItems();
      return data.items;
    } catch {
      return rejectWithValue("Failed to load cart");
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product, { rejectWithValue }) => {
    try {
      await saveCartItem(product._id, product.quantity || 1);

      return {
        _id: product._id,
        productName: product.productName,
        images: product.images,
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
        quantity: product.quantity || 1,
      };
    } catch {
      return rejectWithValue("Failed to add to cart");
    }
  },
);
