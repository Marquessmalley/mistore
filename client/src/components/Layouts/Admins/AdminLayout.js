import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./Header";
import Permenant from "../../Navigation/Drawer/Permenant";
import Temporary from "../../Navigation/Drawer/Temporary";

const AdminLayout = () => {
  const [hidePermanentDrawer, setHidePermanentDrawer] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(250);

  const handleToggleDrawer = () => setMobileOpen(!mobileOpen);

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        handleToggleDrawer={handleToggleDrawer}
        drawerWidth={drawerWidth}
      />
      <Box
        component="nav"
        sx={{
          width: { sm: hidePermanentDrawer ? 0 : drawerWidth },
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
