import React from "react";
import { Box } from "@mui/material";
import Navbar from "../../Navigations/StoreFrontNavigation/Navbar";
const StoreFrontLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* MAIN NAV */}
      <Navbar />
    </Box>
  );
};

export default StoreFrontLayout;
