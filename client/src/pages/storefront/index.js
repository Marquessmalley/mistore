import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <Grid container sx={{ height: "85vh" }}>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography sx={{ fontSize: "1.5rem" }}>Trending Collection</Typography>
        <Typography
          sx={{
            // color: "#323232",
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          Explore Our Unique Collection
        </Typography>
        <Button
          variant="contained"
          sx={{
            background: "#323232",
            fontWeight: "bold",
            padding: ".8rem",
            borderRadius: "20px",
            width: "150px",
          }}
          onClick={() => navigate("/store/products")}
        >
          Shop Now
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>PHOTOS</Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
