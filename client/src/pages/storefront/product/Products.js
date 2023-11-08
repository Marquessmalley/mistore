import { useState, useContext } from "react";
import { Grid, Pagination } from "@mui/material";
import ProductCard from "../../../components/UI/Card/ProductCard";
import {
  useGetProductsQuery,
  selectAllProducts,
} from "../../../features/products/productsApiSlice";
import { productsFilteringContext } from "components/Layouts/StoreFront/StoreFrontLayout";
import CircularProgress from "@mui/material/CircularProgress";

const Products = () => {
  const { selectedCategories, selectedColors } = useContext(
    productsFilteringContext
  );
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery();
  // const products = useSelector(selectAllProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products?.ids.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products?.ids.length / itemsPerPage);

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
        displayedProducts.map((id) => (
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
      {isSuccess && (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default Products;
