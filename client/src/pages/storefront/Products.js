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
  // const { data: products, isLoading, isError, error } = useGetProductsQuery();
  const products = useSelector(selectAllProducts);
  return (
    <Grid container>
      {/* SIDE DRAWER GRID ITEM */}
      {/* <Grid item lg={3}>
        <ResponsiveDarwer />
      </Grid> */}
      {/* PRODUCTS GRID ITEM */}
      <Grid item lg={9}>
        <Grid container>
          {products.map((product) => (
            <Grid item m={2} key={product.id} lg={3}>
              <ProductCard data={product} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Products;
