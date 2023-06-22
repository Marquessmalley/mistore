import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import "./error.css";

const Unauthorized = () => {
  return (
    <Grid
      container
      sx={{
        background: "black",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          sx={{
            fontFamily: "DynaPuff",
            fontSize: "4rem",
            color: "#FD5523",
            // textAlign: "center",
            "@media screen and (max-width: 600px)": {
              fontSize: "3rem",
            },
            "@media screen and (max-width: 500px)": {
              fontSize: "2rem",
            },
          }}
        >
          Unauthorized access? Time to chill out.
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "60vh",
        }}
      >
        <Typography
          sx={{
            fontFamily: "DynaPuff",
            fontSize: "3rem",
            color: "#227755",
            textAlign: "center",
            "@media screen and (max-width: 600px)": {
              fontSize: "3rem",
            },
            "@media screen and (max-width: 500px)": {
              fontSize: "2rem",
            },
          }}
        >
          Chill Zone
        </Typography>

        <Typography
          sx={{ fontFamily: "Work Sans", color: "#227755", width: 400 }}
        >
          Seems like you've wandered into forbidden territory. But don't worry,
          we've got the perfect threads for your chilled-out vibes. Click below
          to explore our collection.
        </Typography>
        <Box
          sx={{
            margin: "1rem",
            display: "flex",
            justifyContent: "space-evenly",
            width: 300,
          }}
        >
          <Button
            variant="contained"
            sx={{
              background: "#227755",
              padding: ".7rem",
              fontFamily: "Work Sans",
            }}
          >
            Shop Now
          </Button>
          <Button
            variant="contained"
            sx={{
              background: "#227755",
              padding: ".7rem",
              fontFamily: "Work Sans",
              color: "#fff",
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{
          background: "#FD5523",
          height: "30vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography sx={{ color: "#fff" }}>
            ©2023 Mistrains Co. All rights reserved.
          </Typography>
        </Box>
        <Box
          sx={{
            width: 200,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="27.314" height="24">
            <path
              d="M 27.029 4.713 L 23.254 8.475 C 22.504 17.213 15.129 24 6.317 24 C 4.504 24 3.004 23.713 1.867 23.15 C 0.954 22.688 0.579 22.2 0.479 22.05 C 0.312 21.796 0.269 21.478 0.364 21.189 C 0.459 20.899 0.681 20.669 0.967 20.563 C 0.992 20.55 3.942 19.425 5.854 17.263 C 4.668 16.418 3.626 15.388 2.767 14.213 C 1.054 11.888 -0.758 7.85 0.329 1.825 C 0.399 1.46 0.663 1.163 1.017 1.05 C 1.372 0.934 1.763 1.025 2.029 1.288 C 2.067 1.338 6.229 5.438 11.317 6.763 L 11.317 6 C 11.327 4.399 11.972 2.867 13.112 1.742 C 14.251 0.617 15.79 -0.01 17.392 0 C 19.508 0.03 21.454 1.169 22.517 3 L 26.317 3 C 26.72 2.999 27.085 3.24 27.242 3.613 C 27.389 3.99 27.306 4.418 27.029 4.713 Z"
              fill="#FFFFFF"
            ></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path d="M 0 0 L 32 0 L 32 32 L 0 32 Z" fill="transparent"></path>
            <path
              d="M 12 16 C 12 13.791 13.791 12 16 12 C 18.209 12 20 13.791 20 16 C 20 18.209 18.209 20 16 20 C 13.791 20 12 18.209 12 16 Z"
              fill="#FFFFFF"
            ></path>
            <path
              d="M 21.5 3.5 L 10.5 3.5 C 6.634 3.5 3.5 6.634 3.5 10.5 L 3.5 21.5 C 3.5 25.366 6.634 28.5 10.5 28.5 L 21.5 28.5 C 25.366 28.5 28.5 25.366 28.5 21.5 L 28.5 10.5 C 28.5 6.634 25.366 3.5 21.5 3.5 Z M 16 22 C 12.686 22 10 19.314 10 16 C 10 12.686 12.686 10 16 10 C 19.314 10 22 12.686 22 16 C 22 19.314 19.314 22 16 22 Z M 22.5 11 C 21.672 11 21 10.328 21 9.5 C 21 8.672 21.672 8 22.5 8 C 23.328 8 24 8.672 24 9.5 C 24 10.328 23.328 11 22.5 11 Z"
              fill="#FFFFFF"
            ></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25.912">
            <path
              d="M 26 12.999 C 25.992 19.573 21.083 25.11 14.556 25.906 C 14.414 25.922 14.272 25.877 14.166 25.781 C 14.059 25.685 13.999 25.549 14 25.406 L 14 15.999 L 17 15.999 C 17.277 15.999 17.542 15.885 17.732 15.683 C 17.921 15.48 18.018 15.209 18 14.932 C 17.954 14.399 17.504 13.991 16.969 13.999 L 14 13.999 L 14 10.999 C 14 9.894 14.895 8.999 16 8.999 L 18 8.999 C 18.277 8.999 18.542 8.885 18.732 8.683 C 18.921 8.48 19.018 8.209 19 7.932 C 18.954 7.398 18.503 6.99 17.966 6.999 L 16 6.999 C 13.791 6.999 12 8.789 12 10.999 L 12 13.999 L 9 13.999 C 8.723 13.998 8.458 14.112 8.268 14.314 C 8.079 14.517 7.982 14.788 8 15.065 C 8.046 15.599 8.497 16.007 9.034 15.999 L 12 15.999 L 12 25.409 C 12.001 25.551 11.941 25.688 11.835 25.783 C 11.729 25.879 11.587 25.924 11.445 25.909 C 4.731 25.091 -0.238 19.269 0.009 12.51 C 0.259 5.76 5.726 0.272 12.481 0.01 C 16.015 -0.127 19.452 1.18 22.002 3.63 C 24.552 6.08 25.996 9.462 26 12.999 Z"
              fill="#FFFFFF"
            ></path>
          </svg>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Unauthorized;
