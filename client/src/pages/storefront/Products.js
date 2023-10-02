import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../../components/UI/Card/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveDarwer from "components/Navigations/StoreFrontNavigation/Drawer/ResponsiveDarwer";
import {
  useGetProductsQuery,
  selectAllProducts,
} from "../../features/products/productsApiSlice";
const Products = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  // const products = useSelector(selectAllProducts);

  return (
    <Grid container>
      {/* PRODUCTS GRID ITEM */}
      {products?.ids.length ? (
        products.ids.map((id) => (
          <Grid
            item
            m={3}
            key={products.entities[id]}
            xs={10}
            sm={5}
            md={5}
            lg={3}
          >
            <ProductCard data={products.entities[id]} />
          </Grid>
        ))
      ) : (
        <Grid item m={3} lg={12}>
          <h1>No Products Available</h1>
        </Grid>
      )}
    </Grid>
  );
};

export default Products;
