import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCost: 0,
    contact: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    },
    shipping: {
      firstname: "",
      lastname: "",
      address: "",
      city: "",
      zip: "",
      state: "",
    },
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
    handleAddQuantity: (state, action) => {
      console.log("yoo");
      const { prod_id, cart_id } = action.payload;

      const existingItem = state.items.find(
        (item) => item.prod_id === prod_id && item.cart_id === cart_id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        state.totalCost += existingItem.price;
      }
    },
    handleSubtractQuantity: (state, action) => {
      const { prod_id, cart_id } = action.payload;

      const existingItem = state.items.find(
        (item) => item.prod_id === prod_id && item.cart_id === cart_id
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalCost -= existingItem.price;
        }
      }
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

export const {
  addToCart,
  removeItem,
  calculateTotal,
  handleAddQuantity,
  handleSubtractQuantity,
} = cartSlice.actions;
export default cartSlice;
