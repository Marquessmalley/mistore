import { useContext } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";
const steps = ["Cart", "Payment", "status"];

const MuiStepper = () => {
  const { activeStep } = useContext(CheckoutContex);

  return (
    <Box
      sx={{
        width: "50%",
        "@media screen and (max-width: 820px)": {
          width: "100%",
        },
      }}
    >
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default MuiStepper;
