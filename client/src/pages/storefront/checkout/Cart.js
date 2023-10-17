import React from "react";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <div>
      <h1>Cart: </h1>
      {cart.items.length === 0 ? (
        <p>No cart items</p>
      ) : (
        cart.items.map((item) => (
          <>
            <p>{item.name}</p>
          </>
        ))
      )}
    </div>
  );
};

export default Cart;
