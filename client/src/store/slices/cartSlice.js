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
          item.prod_id === action.payload.prod_id &&
          item.size === action.payload.size
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
      const { price, quantity } = action.payload;

      const newCart = state.items.filter(
        (item) => item.cart_id !== action.payload.cart_id
      );

      state.totalCost = state.totalCost - price * quantity;
      state.items = newCart;
    },
    calculateTotal: (state, action) => {
      const cartTotal = state.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalCost = cartTotal;
    },
  },
});

export const { addToCart, removeItem, calculateTotal } = cartSlice.actions;
export default cartSlice;
