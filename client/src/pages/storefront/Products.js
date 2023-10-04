import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../../components/UI/Card/ProductCard";
import {
  useGetProductsQuery,
  selectAllProducts,
} from "../../features/products/productsApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
const Products = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  // const products = useSelector(selectAllProducts);

  return (
    <Grid container>
      {/* PRODUCTS GRID ITEM */}
      {isLoading && (
        <Grid
          item
          lg={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Grid>
      )}
      {products?.ids.length &&
        products.ids.map((id) => (
          <Grid
            item
            m={3}
            key={products.entities[id].id}
            xs={10}
            sm={5}
            md={5}
            lg={3}
          >
            <ProductCard data={products.entities[id]} />
          </Grid>
        ))}
    </Grid>
  );
};

export default Products;
