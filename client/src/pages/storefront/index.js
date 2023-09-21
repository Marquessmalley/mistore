import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import ProductCard from "../../components/UI/Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductsQuery,
  selectAllProducts,
} from "../../features/products/productsApiSlice";

const StoreFront = () => {
  // const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const products = useSelector(selectAllProducts);

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12}>
        <Typography>Mistrains Storefront</Typography>
      </Grid>

      {/* {products.map((product) => (
        <Grid item key={product.id} xs={10} sm={6} md={4} lg={3}>
          <ProductCard data={product} />
        </Grid>
      ))} */}
    </Grid>
  );
};

export default StoreFront;
