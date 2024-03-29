import { useContext, useEffect } from "react";
import { Grid } from "@mui/material";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";
import { useStripe } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { ThemeContext } from "App";
import { emptyCart } from "store/slices/cartSlice";

const OrderStatus = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();

  const { setOrderStatus, orderStatus } = useContext(CheckoutContex);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setOrderStatus("Payment succeeded!");
          break;
        case "processing":
          setOrderStatus("Your payment is processing.");
          break;
        case "requires_payment_method":
          setOrderStatus("Your payment was not successful, please try again.");
          break;
        default:
          setOrderStatus("Something went wrong.");
          break;
      }
    });

    if (orderStatus === "Payment succeeded!") {
      dispatch(emptyCart());
    }
    // SET ACTIVE STEP TO ZERO WHEN UNMOUNTING AND REMOVE ITEMS FROM CART
  }, [stripe, setOrderStatus, orderStatus, dispatch]);

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid
        item
        xs={12}
        sm={10}
        md={7}
        lg={8}
        sx={{
          marginRight: "1rem",
          marginTop: "2rem",
          // background: darkMode ? "rgb(33, 43, 54)" : "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          borderRadius: "5px",
          padding: "2rem",
        }}
      >
        <h2>Order Status: {orderStatus}</h2>
      </Grid>
    </Grid>
  );
};

export default OrderStatus;
