import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import MuiStepper from "../../UI/Stepper/MuiStepper";
import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51Mft6QD7KUQOpE4epZI3EbRap7VG9kgdJurQ6f45pHhiqgXMaoT1SfWqxhSULBBAmyKSOMMZKvAp0Sb6KOhBk3W2007zvFFAxB"
);
export const CheckoutContex = createContext();

const CheckoutLayout = () => {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(() =>
    localStorage.getItem("activeStep") ? +localStorage.getItem("activeStep") : 0
  );
  const [clientSecret, setClientSecret] = useState("");

  const cart = useSelector((state) => state.cart);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    switch (activeStep) {
      case 0:
        navigate("/store/cart"); // Navigate to the "cart" page
        break;
      case 1:
        navigate("/store/details"); // Navigate to the "details" page
        break;
      case 2:
        navigate("/store/payment"); // Navigate to the "details" page
        break;
      case 3:
        navigate("/store/review"); // Navigate to the "details" page
        break;
      default:
        break;
    }
  }, [activeStep, navigate]);

  useEffect(() => {
    localStorage.setItem("activeStep", activeStep);
  }, [activeStep]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_DOMAIN_KEY}/create-payment-intent`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(cart),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

  const appearance = {
    theme: "night",
  };

  const options = { clientSecret, appearance };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutContex.Provider
            value={{ activeStep, handleNext, handleBack }}
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
