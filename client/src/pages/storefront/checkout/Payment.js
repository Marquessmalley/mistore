import { useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "App";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";

const Payment = () => {
  const navigate = useNavigate();
  const [contectInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  const [billingMessage, setBillingMessage] = useState("");

  const shipping = useSelector((state) => state.cart.shipping);
  const contact = useSelector((state) => state.cart.contact);

  const { darkMode } = useContext(ThemeContext);
  const { setActiveStep } = useContext(CheckoutContex);

  const stripe = useStripe();
  const elements = useElements();

  const handleExecuteOrder = async () => {
    if (!stripe || !elements) {
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/store/status",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setBillingMessage(error.message);
    } else {
      setBillingMessage("An unexpected error occurred.");
    }
  };

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      {/* LEFT COLUMN */}

      <Grid item xs={12} sm={10} md={7} lg={5}>
        <Grid
          item
          sx={{
            marginRight: "1rem",
            marginTop: "2rem",
            background: darkMode ? "rgb(33, 43, 54)" : "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
            borderRadius: "5px",
            padding: "2rem",
          }}
        >
          <h2 style={{ marginLeft: "1rem" }}>Contact Information</h2>

          <AddressElement
            options={{ mode: "shipping" }}
            onChange={(e) => {
              console.log(e.value);
            }}
          />
        </Grid>
        <Grid
          item
          sx={{
            marginRight: "1rem",
            marginTop: "2rem",
            background: darkMode ? "rgb(33, 43, 54)" : "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
            borderRadius: "5px",
            padding: "2rem",
          }}
        >
          <h2 style={{ marginLeft: "1rem" }}>Billing Information</h2>

          <PaymentElement option={paymentElementOptions} />
        </Grid>
      </Grid>

      {/* RIGHT COLUMN */}

      <Grid
        item
        xs={12}
        sm={10}
        md={4}
        lg={3}
        sx={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          borderRadius: "5px",
          background: darkMode ? "rgb(33, 43, 54)" : "#fff",
          marginTop: "2rem",
        }}
      >
        <Grid item sx={{ marginLeft: "2rem" }}>
          <p>Subtotal: </p>
          <p>Shipping: </p>
          <p>Tax: </p>
        </Grid>
      </Grid>

      {/* Show any error or success messages */}
      {billingMessage && <div id="payment-message">{billingMessage}</div>}

      {/* EXECUTE ORDER */}
      <Grid
        item
        xs={12}
        sm={10}
        md={11}
        lg={8}
        sx={{ marginTop: "1rem", textAlign: "end" }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setActiveStep((prevStep) => prevStep - 1);
            navigate("/store/cart");
          }}
          sx={{ marginRight: "2rem" }}
        >
          Back To Cart
        </Button>
        <Button
          disabled={!stripe || !elements}
          variant="contained"
          onClick={handleExecuteOrder}
        >
          Execute Payment
        </Button>
      </Grid>
    </Grid>
  );
};

export default Payment;
