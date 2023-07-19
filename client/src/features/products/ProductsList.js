import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";
import AddIcon from "@mui/icons-material/Add";

const ProductsList = () => {
  const columns = [
    { field: "product", headerName: "Product", width: 250 },
    { field: "date", headerName: "Created at", width: 250 },
    { field: "quantity", headerName: "Quantity", width: 250 },
    { field: "price", headerName: "Price", width: 250 },
  ];
  return (
    <Grid container>
      <Grid item xs={11} sm={11} md={11} lg={11} mb={6} sx={{ p: "10px" }}>
        <AdminHeader
          headerTitle="Products"
          breadCrumbs={
            <MuiBreadcrumbs
              crumbs={[{ label: "Dashboard", to: "/admin-dash" }, "Products"]}
            />
          }
          btn={true}
          btnText={"New Product"}
          btnPath="/admin-dash/products/add"
          icon={<AddIcon />}
        />
      </Grid>
      <Grid item xs={8} sm={12} md={12} lg={12}>
        <DataGrid
          columns={columns}
          rows={{
            product: "Car",
            date: "1/1/2023",
            quantity: 5,
            price: "$67.86",
          }}
          // selectionModel={selectedRows}
          sx={{
            background: "rgb(22, 28, 36)",
            color: "#fff",
            border: "none",
            fontFamily: "Montserrat",
            borderRadius: "15px",
            "@media screen and (max-width: 600px)": {
              width: 475,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ProductsList;
