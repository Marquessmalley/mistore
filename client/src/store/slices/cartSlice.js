import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalCost: 0,
    shipping: {
      fullName: "",
      country: "",
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
    addShippingInfo: (state, action) => {
      const { name, address } = action.payload;
      const { country, line1, city, postal_code } = address;

      state.shipping.fullName = name;
      state.shipping.country = country;
      state.shipping.address = line1;
      state.shipping.city = city;
      state.shipping.zip = postal_code;
      state.shipping.state = address.state;
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

      const roundedCartTotal = +cartTotal.toFixed(2);

      state.totalCost = roundedCartTotal;
    },
    emptyCart: (state, action) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  addShippingInfo,
  removeItem,
  calculateTotal,
  handleAddQuantity,
  handleSubtractQuantity,
  emptyCart,
} = cartSlice.actions;
export default cartSlice;
