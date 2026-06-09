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

export const clearAll = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { rejectWithValue }) => {
    try {
      await clearWishlist();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to clear wishlist",
      );
    }
  },
);

// Slice

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetWishlist: (state) => {
      ((state.items = []), (state.loading = false), (state.error = null));
    },
  },
  extraReducers: (builder) => {
    builder
      // loadWishlist
      .addCase(loadWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // toggleWishlist
      .addCase(toggleFav.pending, (state, action) => {
        // optimistic — toggle instantly
        const product = action.meta.arg;
        const index = state.items.findIndex((i) => i._id === product._id);
        if (index !== -1) {
          state.items.splice(index, 1);
        } else {
          state.items.push({
            _id: product._id,
            productName: product.productName,
            images: product.images,
            price: product.price,
            discountPrice: product.discountPrice,
            stock: product.stock,
          });
        }
      })
      .addCase(toggleFav.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(toggleFav.rejected, (state, action) => {
        state.error = action.payload;
      })

      // clearWishlist
      .addCase(clearAll.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearAll.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
      })
      .addCase(clearAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const wishlistItems = (state) => state.wishlist.items;
export const wishlistCount = (state) => state.wishlist.items.length;
export const isWishlist = (id) => (state) =>
  state.wishlist.items.some((i) => i._id === id);

export const { resetWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
