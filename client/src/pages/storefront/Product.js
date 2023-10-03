import React from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProductById } from "../../features/products/productsApiSlice";

const Product = () => {
  const { id } = useParams();
  const product = useSelector((state) => selectProductById(state, id));

  const imageUrl = product.images.map((image) => {
    if (image.includes("public")) {
      return image.replace("public/", "");
    }
    return image;
  });
  // https://mistrain-api.onrender.com/${imageUrl}

  return (
    <Grid container>
      <Grid item lg={10}>
        <img
          src={`http://localhost:8000/${imageUrl}`}
          alt="product"
          style={{ height: "200px", width: "200px" }}
        />
      </Grid>
      <Grid item lg={2}>
        <h2>{product.name}</h2>
      </Grid>
    </Grid>
  );
};

export default Product;
