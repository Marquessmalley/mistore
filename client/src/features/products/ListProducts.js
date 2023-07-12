import { Grid } from "@mui/material";
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";
import AddIcon from "@mui/icons-material/Add";

const ListProducts = () => {
  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} mb={6} sx={{ p: "10px" }}>
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
    </Grid>
  );
};

export default ListProducts;
