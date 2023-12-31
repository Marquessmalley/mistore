import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  IconButton,
  Badge,
  Switch,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
// import { storeNavItems } from "constants/navItems";
import SearchBox from "../../UI/SearchBox/SearchBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../../App";

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
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const { darkMode, toggleTheme } = useContext(ThemeContext);

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
          <MenuIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
        </IconButton>
        <Box>
          <Typography>LOGO</Typography>
        </Box>

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
                    <Typography>{item.name}</Typography>
                  </Link>
                </ListItem>
              </List>
            ))}
          </nav>
        </Box>
        {/* SEARCH BOX */}

        <SearchBox />

        {/* CART */}
        <Box>
          <IconButton aria-label="cart" onClick={() => navigate("/store/cart")}>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCartIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
            </Badge>
          </IconButton>
          <Switch checked={darkMode} onChange={toggleTheme} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
