import React from "react";
import { Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem } from "../../../store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>My Cart </h1>
      </Grid>
      {cart.items.length === 0 ? (
        <p>No cart items</p>
      ) : (
        <>
          <Grid item xs={12} md={8} lg={8}>
            {cart.items.map((item) => {
              const imageUrl = item.images.map((image) => {
                if (image.includes("public")) {
                  return image.replace("public/", "");
                }
                return image;
              });
              return (
                <Grid
                  item
                  key={item.id}
                  sx={{
                    border: "1px solid black",
                    display: "flex",
                    alignItems: "center",
                    margin: "1rem",
                  }}
                >
                  <div>
                    <img
                      src={`https://mistrain-api.onrender.com/${imageUrl}`}
                      alt="cart"
                      width="150"
                      height="200"
                    />
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <p style={{ fontWeight: "bold", fontSize: "22px" }}>
                      {item.name}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Size: </span>
                      {item.size}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Qty: </span>
                      {item.quantity}
                    </p>
                    <p>
                      <span style={{ fontWeight: "bold" }}>Price: </span>$
                      {item.price}
                    </p>
                  </div>
                  <div>
                    <Button onClick={() => dispatch(removeItem(item.id))}>
                      Remove
                    </Button>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <h1>Order Summary</h1>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Cart;
