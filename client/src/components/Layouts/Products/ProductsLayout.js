import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import ResponsiveDarwer from "components/Navigations/StoreFrontNavigation/Drawer/ResponsiveDarwer";
import { Outlet } from "react-router-dom";
const ProductsLayout = () => {
  const [filterMobileOpen, setFilterOpenMobile] = useState(false);
  const handleFilterDrawerToggle = () => {
    setFilterOpenMobile(!filterMobileOpen);
  };
  const drawerWidth = 140;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* <ResponsiveDarwer
          filterMobileOpen={filterMobileOpen}
          handleFilterDrawerToggle={handleFilterDrawerToggle}
        /> */}
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default ProductsLayout;
