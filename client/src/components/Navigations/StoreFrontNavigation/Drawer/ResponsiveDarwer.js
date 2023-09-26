import React from "react";
import { Drawer } from "@mui/material";
const ResponsiveDarwer = ({ filterMobileOpen, handleFilterDrawerToggle }) => {
  const drawerWidth = 140;
  return (
    <>
      <Drawer
        // container={container}
        variant="temporary"
        open={filterMobileOpen}
        onClose={handleFilterDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      ></Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      ></Drawer>
    </>
  );
};

export default ResponsiveDarwer;
