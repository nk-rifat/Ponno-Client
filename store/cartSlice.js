import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCartItems,
  saveCartItem,
  deleteCartItem,
  clearCart,
} from "@/lib/api/cart";

// Thunks
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

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteCartItem(productId);
      return productId;
    } catch {
      return rejectWithValue("Failed to remove item");
    }
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      await saveCartItem(id, quantity);
      return { id, quantity };
    } catch {
      return rejectWithValue("Failed to update quantity");
    }
  },
);

export const clearFullCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      await clearCart();
    } catch {
      return rejectWithValue("Failed to clear cart");
    }
  },
);

// Slice

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loadCart
      .addCase(loadCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        const existing = state.items.find((i) => i._id === action.payload._id);
        if (existing) {
          existing.quantity += action.payload.quantity;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateQuantity

      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        const { id, quantity } = action.payload;

        const item = state.items.find((i) => i._id === id);
        if (item) {
          item.quantity = quantity;
        }
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // remove item
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((i) => i._id !== action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // clear cart
      .addCase(clearFullCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearFullCart.fulfilled, (state) => {
        state.loading = false;
        state.items = [];
      })
      .addCase(clearFullCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ─── Selectors

export const cartItems = (state) => state.cart.items;

export const uniqueItemQty = (state) => state.cart.items.length;

export const totalItemQty = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export const totalPrice = (state) =>
  state.cart.items.reduce(
    (sum, i) => sum + (i.discountPrice || i.price) * i.quantity,
    0,
  );

export const isInCart = (id) => (state) =>
  state.cart.items.some((i) => i._id === id);

export const cartItemQty = (id) => (state) =>
  state.cart.items.find((i) => i._id === id)?.quantity ?? 0;

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
