import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  IconButton,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../../assets/images/MIS1.png";
// import { storeNavItems } from "constants/navItems";
import SearchBox from "../../UI/SearchBox/SearchBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

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
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <AppBar component="nav" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
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
              <List key={item.id}>
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

        <Badge
          badgeContent={cartItems.length}
          sx={{ marginLeft: "2rem" }}
          color="secondary"
        >
          <ShoppingCartIcon sx={{ color: "#fff" }} />
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
