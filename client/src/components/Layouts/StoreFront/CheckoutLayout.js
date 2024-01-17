import { createContext, useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import MuiStepper from "../../UI/Stepper/MuiStepper";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { ThemeContext } from "App";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
export const CheckoutContex = createContext();

const CheckoutLayout = () => {
  const [activeStep, setActiveStep] = useState(() =>
    localStorage.getItem("activeStep") ? +localStorage.getItem("activeStep") : 0
  );

  const [clientSecret, setClientSecret] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const cart = useSelector((state) => state.cart);

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_DOMAIN}/create-payment-intent`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

  const appearance = {
    theme: darkMode ? "night" : "flat",
  };

  const options = { clientSecret, appearance };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutContex.Provider
            value={{
              activeStep,
              setActiveStep,

              orderStatus,
              setOrderStatus,
            }}
          >
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <MuiStepper />
              </Grid>
              <Outlet />
            </Grid>
          </CheckoutContex.Provider>
        </Elements>
      )}
    </>
  );
};

export default CheckoutLayout;
