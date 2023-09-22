import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import ProductCard from "../../components/UI/Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductsQuery,
  selectAllProducts,
} from "../../features/products/productsApiSlice";

const Home = () => {
  // const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const products = useSelector(selectAllProducts);

  return (
    <Grid container sx={{ height: "85vh", background: "#E5E5E5" }}>
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
        <Typography sx={{ color: "#323232", fontSize: "1.5rem" }}>
          Trending Collection
        </Typography>
        <Typography
          sx={{
            color: "#323232",
            fontSize: "1.8rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            marginTop: "2rem",
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
      {/* {products.map((product) => (
        <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
        <ProductCard data={product} />
        </Grid>
      ))} */}
    </Grid>
  );
};

export default Home;
