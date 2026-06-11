import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { items: [], source: null }, // source: cart/ buynow
  reducers: {
    setCheckoutItems: (state, action) => {
      state.items = action.payload.items;
      state.source = action.payload.source;
    },
    clearCheckout: (state) => {
      state.items = [];
      state.source = null;
    },
  },
});

export const { setCheckoutItems, clearCheckout } = checkoutSlice.actions;

export default checkoutSlice.reducer;
