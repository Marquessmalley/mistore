import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/MIS1.png";
// import { storeNavItems } from "constants/navItems";
import SearchBox from "../../UI/SearchBox/SearchBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";

export const storeNavItems = [
  {
    id: 0,
    name: "Home",
    path: "/store",
  },
  {
    id: 1,
    name: "Products",
    path: "/store/products",
  },
  { id: 2, name: "About", path: "/store/about" },
];

const Navbar = ({ handleToggleDrawer }) => {
  return (
    <AppBar component="nav">
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        {/* LOGO */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleToggleDrawer}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box>LOGO</Box>

        {/* NAV */}
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
          }}
        >
          <nav style={{ display: "flex" }}>
            {storeNavItems.map((item) => (
              <List key={item}>
                <ListItem>
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to={item.path}
                  >
                    {item.name}
                  </Link>
                </ListItem>
              </List>
            ))}
          </nav>
        </Box>
        {/* SEARCH BOX */}

        <SearchBox />

        {/* CART */}
        <IconButton sx={{ marginLeft: "2rem" }}>
          <ShoppingCartIcon sx={{ color: "#fff" }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
