import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import smokeVideo from "../../assets/videos/white-smoke-fog.mp4";
import smokeLogo from "../../assets/videos/marry-j-logo.mp4";
import smokeSign from "../../assets/videos/green-neon-light-cannabis-leaf.mp4";

const Splash = () => {
  const navigate = useNavigate();
  return (
    <Grid container sx={{ height: "100vh" }}>
      <Grid
        item
        lg={12}
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={smokeVideo} type="video/mp4" />
        </video>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography sx={{ color: "#fff" }} variant="h2">
            Welcome to Mistrains
          </Typography>
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            onClick={() => navigate("/store")}
          >
            Shop Now
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Splash;
