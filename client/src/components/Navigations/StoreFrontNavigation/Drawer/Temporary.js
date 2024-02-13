import React from "react";
import { Drawer, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "App";
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

const Temporary = ({ mobileOpen, handleToggleDrawer }) => {
  const drawerWidth = 240;
  const { darkMode } = useContext(ThemeContext);
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleToggleDrawer}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 2,
        display: { xs: "block", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <nav>
        {storeNavItems.map((item) => (
          <List key={item.id}>
            <ListItem>
              <Link
                style={{
                  color: darkMode ? "#fff" : "#000",
                  textDecoration: "none",
                }}
                to={item.path}
              >
                {item.name}
              </Link>
            </ListItem>
          </List>
        ))}
      </nav>
    </Drawer>
  );
};

export default Temporary;
