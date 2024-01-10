import { useState, useContext } from "react";
import { Grid, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { ThemeContext } from "App";
import { PaymentElement, useStripe, useElement } from "@stripe/react-stripe-js";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";

const Payment = () => {
  const [contectInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });

  const shipping = useSelector((state) => state.cart.shipping);
  const contact = useSelector((state) => state.cart.contact);

  const { darkMode } = useContext(ThemeContext);
  const { handleNext, handleBack } = useContext(CheckoutContex);

  const paymentElementOptions = {
    layout: "accordion",
  };

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      {/* LEFT COLUMN */}
      <Grid
        item
        xs={12}
        sm={10}
        md={7}
        lg={5}
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

      {/* RIGHT COLUMNS */}
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
          onClick={handleBack}
          sx={{ marginRight: "2rem" }}
        >
          Back To Details
        </Button>
        <Button variant="contained" onClick={handleNext}>
          Review
        </Button>
      </Grid>
    </Grid>
  );
};

export default Payment;
