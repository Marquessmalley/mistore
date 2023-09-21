import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Permenant from "../../Navigations/AdminNavigation/Drawer/Permenant";
import Temporary from "../../Navigations/AdminNavigation/Drawer/Temporary";

const AdminLayout = () => {
  const [hidePermanentDrawer, setHidePermanentDrawer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(250);

  const handleToggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <Box
      sx={{
        display: "flex",
        background: "rgb(9, 20, 34)",
      }}
    >
      <Header
        handleToggleDrawer={handleToggleDrawer}
        drawerWidth={drawerWidth}
      />
      {/* DRAWER */}
      <Box
        component="nav"
        sx={{
          width: { md: hidePermanentDrawer ? 0 : drawerWidth },
          flexShrink: { sm: 0 },
        }}
      >
        <Temporary
          mobileOpen={mobileOpen}
          handleToggleDrawer={handleToggleDrawer}
          drawerWidth={drawerWidth}
        />
        {!hidePermanentDrawer && <Permenant drawerWidth={drawerWidth} />}
      </Box>
      {/* MAIN CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: {
            sm: `calc(100% - ${hidePermanentDrawer ? 0 : drawerWidth}px)`,
          },
          marginTop: "100px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminLayout;
