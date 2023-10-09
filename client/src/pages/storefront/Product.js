import React from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProductById } from "../../features/products/productsApiSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Product = () => {
  const { id } = useParams();
  const product = useSelector((state) => selectProductById(state, id));
  const navigate = useNavigate();

  const imageUrl = product?.images.map((image) => {
    if (image.includes("public")) {
      return image.replace("public/", "");
    }
    return image;
  });

  console.log(product);

  return (
    <Grid container sx={{ background: "#E5E5E5" }}>
      <Grid item xs={12}>
        <IconButton onClick={() => navigate("/store/products")}>
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={12}
        sm={7}
        md={7}
        lg={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={`https://mistrain-api.onrender.com/${imageUrl}`}
          alt="product"
          width="400"
          height="400"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        lg={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid item m={2}>
          <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
            {product?.name}
          </Typography>
          <Typography sx={{ fontSize: "1rem" }}>
            {product?.gender.map((gender) => gender)}
          </Typography>
          <Typography sx={{ fontSize: "1.5rem" }}>${product?.price}</Typography>
        </Grid>

        <Grid item m={2}>
          <Typography>Sizes: </Typography>
          {product?.sizes.map((size) => (
            <Button
              variant="contained"
              sx={{
                margin: "1rem",
                borderRadius: "35px",
                padding: "1rem",
              }}
            >
              {size[0]}
            </Button>
          ))}
        </Grid>

        <Grid item m={2}>
          <Typography>Description: </Typography>
          <Typography>{product?.description} </Typography>
        </Grid>

        <Grid item m={2}>
          <Button variant="contained">Add To Cart</Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
