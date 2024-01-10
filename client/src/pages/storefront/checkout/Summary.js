import { useContext } from "react";
import { Grid, Button } from "@mui/material";
import { CheckoutContex } from "components/Layouts/StoreFront/CheckoutLayout";

const Summary = () => {
  const { handleBack } = useContext(CheckoutContex);

  return (
    <Grid container>
      <Grid item xs={12} sx={{ marginTop: "1rem", textAlign: "end" }}>
        <Button variant="contained" onClick={handleBack}>
          Back To Payment
        </Button>
        <Button variant="contained">Execute Order</Button>
      </Grid>
    </Grid>
  );
};

export default Summary;
