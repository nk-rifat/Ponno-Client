import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearWishlist, getWishlist, toggleWishlist } from "@/lib/api/wishlist";

// Thunks

export const loadWishlist = createAsyncThunk(
  "wishlist/loadWishlist",
  async (_, { rejectWithValue }) => {
    try {
      return await getWishlist();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load wishlist",
      );
    }
  },
);

export const toggleFav = createAsyncThunk(
  "wishlist/toggleWishlist",
  async (product, { rejectWithValue }) => {
    try {
      await toggleWishlist(product._id);
      return product;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update wishlist",
      );
    }
  },
);
