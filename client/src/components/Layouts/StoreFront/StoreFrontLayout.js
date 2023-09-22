import React, { useState } from "react";
import { Box, Typography, Toolbar } from "@mui/material";
import Navbar from "../../Navigations/StoreFrontNavigation/Navbar";
import Temporary from "../../Navigations/StoreFrontNavigation/Drawer/Temporary";
import { Outlet } from "react-router-dom";

const StoreFrontLayout = () => {
  const [storeDrawerOpen, setStoreDrawerOpen] = useState(false);
  const handleToggleDrawer = () => setStoreDrawerOpen(!storeDrawerOpen);

  return (
    <Box sx={{ display: "flex" }}>
      {/* MAIN NAV */}
      <Navbar handleToggleDrawer={handleToggleDrawer} />
      <nav>
        <Temporary
          mobileOpen={storeDrawerOpen}
          handleToggleDrawer={handleToggleDrawer}
        />
      </nav>
      <Box component="main" sx={{ p: 0, flexGrow: 1 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default StoreFrontLayout;
