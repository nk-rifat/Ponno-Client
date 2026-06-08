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
