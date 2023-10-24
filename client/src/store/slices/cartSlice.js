import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCost: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingItem) {
        // If the item exists, increase the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If the item is not in the cart, add it
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      const newCart = state.items.filter((item) => item.id !== action.payload);
      state.items = newCart;
    },
    calculateTotal: (state, action) => {
      const cartTotal = state.items.reduce(
        (acc, item) => (acc + item.price) * item.quantity,
        0
      );
      state.totalCost = cartTotal;
    },
  },
});

export const { addToCart, removeItem, calculateTotal } = cartSlice.actions;
export default cartSlice;
