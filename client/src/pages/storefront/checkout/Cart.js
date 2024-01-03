import { useEffect, useContext } from "react";
import { Grid, IconButton, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, calculateTotal } from "store/slices/cartSlice";
import CloseIcon from "@mui/icons-material/Close";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";
import {
  handleAddQuantity,
  handleSubtractQuantity,
} from "store/slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { handleNext } = useContext(CheckoutContex);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [dispatch]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <h1>My Cart </h1>
      </Grid>
      {cart.items.length === 0 ? (
        <Grid item xs={12} md={8} lg={8}>
          Your cart is empty
        </Grid>
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
                  lg={12}
                  key={item.cart_id}
                  sx={{
                    borderRadius: "10px",
                    display: "flex",
                    margin: "1rem",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  <Grid item xs={12} md={4} lg={3} sx={{ margin: "1rem" }}>
                    <img
                      src={`${process.env.REACT_APP_DOMAIN_KEY}/${imageUrl}`}
                      alt="item"
                      width="90%"
                      height="210"
                    />
                  </Grid>
                  <Grid item xs={12} md={8} lg={8}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        height: "35vh",
                      }}
                    >
                      <p style={{ fontWeight: "bold", fontSize: "22px" }}>
                        {item.name}
                      </p>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Size: </span>
                        {item.size}
                      </p>
                      <div>
                        <span style={{ fontWeight: "bold" }}>Qty: </span>
                        <button
                          style={{
                            border: ".8px solid blue",
                            marginRight: ".5rem",
                            width: "30px",
                            height: "30px",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => dispatch(handleAddQuantity(item))}
                        >
                          +
                        </button>
                        {item.quantity}
                        <button
                          style={{
                            border: ".8px solid blue",
                            marginLeft: ".5rem",
                            width: "30px",
                            height: "30px",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => dispatch(handleSubtractQuantity(item))}
                        >
                          -
                        </button>
                      </div>
                      <p>
                        <span style={{ fontWeight: "bold" }}>Price: </span>$
                        {item.price}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={1} sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => dispatch(removeItem(item))}>
                      <CloseIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
      <Grid
        item
        xs={12}
        md={4}
        lg={4}
        sx={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            margin: "1rem",
          }}
        >
          <h1>Order Summary</h1>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>Total Cost: </p>
            <p style={{ fontWeight: "bold" }}>${cart.totalCost}</p>
          </div>
        </div>

        <Button
          variant="contained"
          onClick={handleNext}
          disabled={cart.items.length === 0 ? true : false}
        >
          Checkout Now
        </Button>
      </Grid>
    </Grid>
  );
};

export default Cart;
