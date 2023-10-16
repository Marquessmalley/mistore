import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import MuiStepper from "../../UI/Stepper/MuiStepper";

export const CheckoutContex = createContext();
const CheckoutLayout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(() =>
    localStorage.getItem("activeStep") ? +localStorage.getItem("activeStep") : 0
  );

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

  return (
    <CheckoutContex.Provider value={{ activeStep }}>
      <Grid container>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <MuiStepper />
        </Grid>
        <Outlet />
        <Grid item xs={12}>
          {activeStep === 0 && (
            <Button variant="contained" onClick={handleNext}>
              Checkout Now
            </Button>
          )}

          {activeStep === 1 && (
            <>
              <Button variant="contained" onClick={handleBack}>
                Back To Cart
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Proceed To Payment
              </Button>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Button variant="contained" onClick={handleBack}>
                Back To Details
              </Button>
              <Button variant="contained" onClick={handleNext}>
                Review
              </Button>
            </>
          )}
          {activeStep === 3 && (
            <>
              <Button variant="contained" onClick={handleBack}>
                Back To Payment
              </Button>
              <Button variant="contained">Execute Order</Button>
            </>
          )}
        </Grid>
      </Grid>
    </CheckoutContex.Provider>
  );
};

export default CheckoutLayout;
