import React from "react";
import { Drawer } from "@mui/material";
const Temporary = ({ mobileOpen, handleToggleDrawer }) => {
  const drawerWidth = 240;
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleToggleDrawer}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
      }}
    >
      Temporary
    </Drawer>
  );
};

export default Temporary;
