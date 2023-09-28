import React from "react";
import { Drawer } from "@mui/material";
const ResponsiveDarwer = ({ filterMobileOpen, handleFilterDrawerToggle }) => {
  const drawerWidth = 240;
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
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      ></Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          marginTop: "50px",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "absolute",
            top: 140,
            left: 25,
            height: "80vh",
            background: "#E5E5E5",
            borderRadius: "20px",
          },
        }}
        open
      ></Drawer>
    </>
  );
};

export default ResponsiveDarwer;
