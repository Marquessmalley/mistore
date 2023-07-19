import React from "react";
import { Grid } from "@mui/material";
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";
const AddProduct = () => {
  return (
    <Grid container>
      <Grid item>
        <AdminHeader
          headerTitle="Products"
          breadCrumbs={
            <MuiBreadcrumbs
              crumbs={[
                { label: "Dashboard", to: "/admin-dash" },
                { label: "Products", to: "/admin-dash/products" },
                "Product name",
              ]}
            />
          }
          btn={false}
        />
      </Grid>
    </Grid>
  );
};

export default AddProduct;
