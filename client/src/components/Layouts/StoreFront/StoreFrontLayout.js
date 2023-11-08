import React, { useState, createContext } from "react";
import { Box, Toolbar, IconButton } from "@mui/material";
import Navbar from "../../Navigations/StoreFrontNavigation/Navbar";
import Temporary from "../../Navigations/StoreFrontNavigation/Drawer/Temporary";
import { Outlet, useLocation } from "react-router-dom";
import ResponsiveDarwer from "../../Navigations/StoreFrontNavigation/Drawer/ResponsiveDarwer";
import FilterListIcon from "@mui/icons-material/FilterList";

export const productsFilteringContext = createContext();
const StoreFrontLayout = () => {
  // DRAWER STATE
  const [storeDrawerOpen, setStoreDrawerOpen] = useState(false);
  const [filterMobileOpen, setFilterOpenMobile] = useState(false);

  //PRODUCTS FILTERED STATE
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const location = useLocation();

  const handleToggleDrawer = () => setStoreDrawerOpen(!storeDrawerOpen);
  const handleFilterDrawerToggle = () => {
    setFilterOpenMobile(!filterMobileOpen);
  };
  const drawerWidth = 240;

  return (
    <productsFilteringContext.Provider
      value={{
        selectedCategories,
        selectedColors,
        setSelectedCategories,
        setSelectedColors,
      }}
    >
      <Box sx={{ display: "flex" }}>
        {/* MAIN NAV */}
        <Navbar handleToggleDrawer={handleToggleDrawer} />

        <nav>
          <Temporary
            mobileOpen={storeDrawerOpen}
            handleToggleDrawer={handleToggleDrawer}
          />
        </nav>
        {location.pathname === "/store/products" ? (
          <Box
            component="nav"
            sx={{
              position: "relative",
              width: { sm: drawerWidth },
              flexShrink: { sm: 0 },
              display: { xs: "none", sm: "none", md: "block" },
            }}
            aria-label="mailbox folders"
          >
            <ResponsiveDarwer
              filterMobileOpen={filterMobileOpen}
              handleFilterDrawerToggle={handleFilterDrawerToggle}
            />
          </Box>
        ) : null}

        <Box component="main" sx={{ p: 2, flexGrow: 1, marginTop: "40px" }}>
          <Toolbar />
          {location.pathname === "/store/products" ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleFilterDrawerToggle}
              sx={{
                mr: 2,
                display: { md: "none" },
                background: "#E5E5E5",
                position: "relaive",
                left: 40,
              }}
            >
              <FilterListIcon />
            </IconButton>
          ) : null}
          <Outlet />
        </Box>
      </Box>
    </productsFilteringContext.Provider>
  );
};

export default StoreFrontLayout;
