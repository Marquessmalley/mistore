import { useState, useContext } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "App";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";
import { addShippingInfo, addContactInfo } from "store/slices/cartSlice";
import { useCreateOrderMutation } from "features/orders/ordersApiSlice";
import "./payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingInfo, setShippingInfo] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phoneNumber: "",
  });
  const [emailErr, setEmailErr] = useState(false);
  const [phoneErr, setPhoneErr] = useState(false);

  const [orderErrorMessage, setOrderErrorMessage] = useState("");

  const totalCost = useSelector((state) => state.cart.totalCost);
  const cart = useSelector((state) => state.cart);

  const { darkMode } = useContext(ThemeContext);
  const { setActiveStep } = useContext(CheckoutContex);

  const stripe = useStripe();
  const elements = useElements();

  const { email, phoneNumber } = contactInfo;

  const [createOrder, { isSuccess, isError, error }] = useCreateOrderMutation();

  const handleContactChange = (e) => {
    setContactInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExecuteOrder = async () => {
    if (!stripe || !elements) {
      return;
    }

    if (!email) {
      setEmailErr(true);
    }
    if (!phoneNumber) {
      setPhoneErr(true);
    }

    if (!email || !phoneNumber) {
      return;
    }
    const { items, totalCost } = cart;

    setActiveStep((prevStep) => prevStep + 1);

    await createOrder({ items, totalCost, shippingInfo, contactInfo });
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_FRONTEND_DOMAIN}/store/status`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setOrderErrorMessage(error.message);
    } else {
      setOrderErrorMessage("An unexpected error occurred.");
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
          <label for="Email" style={{ fontSize: "0.93rem" }}>
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleContactChange}
            placeholder="Email Address"
            style={{
              color: "#fff", // Change the text color to red
              background: "#30313d",
              width: "100%",
              height: "44%",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "1px solid #424353",
              borderRadius: "5px",
              boxShadow:
                "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 1px 6px rgba(0, 0, 0, 0.25)",
              WebkitTransition: "background-color 5000s ease-in-out 0s ",
              WebkitTextFillColor: "#fff",
              borderColor: emailErr ? "#fe87a1" : "#fff",
            }}
          />
          {emailErr && (
            <label
              for="Email"
              style={{ fontSize: "0.93rem", color: "#fe87a1" }}
            >
              Please provide your email
            </label>
          )}
          <br />
          <label for="phoneNumber" style={{ fontSize: "0.93rem" }}>
            Phone Number
          </label>
          <input
            type="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleContactChange}
            placeholder="Phone Number"
            style={{
              color: "#fff", // Change the text color to red
              background: "#30313d",
              width: "100%",
              height: "44%",
              padding: "0.75rem",
              marginBottom: "0.5rem",
              border: "1px solid #424353",
              borderRadius: "5px",
              boxShadow:
                "0px 2px 4px rgba(0, 0, 0, 0.5), 0px 1px 6px rgba(0, 0, 0, 0.25)",
              WebkitTransition: "background-color 5000s ease-in-out 0s ",
              WebkitTextFillColor: "#fff",
              borderColor: phoneErr ? "#fe87a1" : "#fff",
            }}
          />
          {phoneErr && (
            <label
              for="phoneNumber"
              style={{ fontSize: "0.93rem", color: "#fe87a1" }}
            >
              Please provide your phone number
            </label>
          )}
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
          <h2 style={{ marginLeft: "1rem" }}>Shipping Information</h2>

          <AddressElement
            options={{ mode: "shipping" }}
            onChange={(e) => setShippingInfo(e.value)}
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
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            Subtotal:{" "}
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>-</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            Shipping:
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>-</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            Tax:
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>-</span>
          </p>
          <p style={{ display: "flex", justifyContent: "space-between" }}>
            Total:
            <span style={{ marginRight: "5px", fontWeight: "bold" }}>
              {totalCost}
            </span>
          </p>
        </Grid>
      </Grid>

      {/* Show any error or success messages */}
      {/* {orderErrorMessage && <div id="payment-message">{orderErrorMessage}</div>} */}

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
