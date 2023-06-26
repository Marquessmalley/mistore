import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import BarChartIcon from "@mui/icons-material/BarChart";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";

const Temporary = ({ mobileOpen, handleToggleDrawer, drawerWidth }) => {
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const handleProductClick = () => setOpen(!open);
  const handleUserClick = () => setOpenUser(!openUser);
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleToggleDrawer}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          background: "black",
        },
      }}
    >
      <Box
        sx={{
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RocketLaunchIcon sx={{ color: "#fff", mr: ".8rem" }} />
        <Typography variant="h5" style={{ color: "#fff" }}>
          Mistrain
        </Typography>
      </Box>
      <Divider sx={{ border: ".1px solid #171412", width: "100%" }} />
      <Box sx={{ marginBottom: "10rem" }}>
        <nav>
          <List>
            {/* OVERVIEW */}
            <ListItem>
              <Link
                to="/admin-dash"
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BarChartIcon
                      sx={{
                        color:
                          location.pathname === "/admin-dash"
                            ? "#90EE90"
                            : "#9DA4AE",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Overview"
                    sx={{
                      color:
                        location.pathname === "/admin-dash"
                          ? "#fff"
                          : "#9DA4AE",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
            {/* PRODUCTS */}
            <ListItem>
              <ListItemButton onClick={handleProductClick}>
                <ListItemIcon>
                  <WorkIcon
                    sx={{
                      color:
                        location.pathname === "/admin-dash/products" ||
                        location.pathname === "/admin-dash/products/add"
                          ? "#90EE90"
                          : "#9DA4AE",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Products"
                  sx={{
                    color:
                      location.pathname === "/admin-dash/products" ||
                      location.pathname === "/admin-dash/products/add"
                        ? "#fff"
                        : "#9DA4AE",
                  }}
                />
                {open ? (
                  <ExpandLess sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMore sx={{ color: "#fff" }} />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/admin-dash/products"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary="List Product"
                      sx={{
                        color:
                          location.pathname === "/admin-dash/products"
                            ? "#fff"
                            : "#9DA4AE",
                        textAlign: "center",
                      }}
                    />
                  </ListItemButton>
                </Link>
                <Link
                  to="/admin-dash/products/add"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText
                      primary="Add Product"
                      sx={{
                        color:
                          location.pathname === "/admin-dash/products/add"
                            ? "#fff"
                            : "#9DA4AE",
                        textAlign: "center",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            {/* USERS */}
            <ListItem>
              <ListItemButton onClick={handleUserClick}>
                <ListItemIcon>
                  <PersonIcon
                    sx={{
                      color:
                        location.pathname === "/admin-dash/users" ||
                        location.pathname === "/admin-dash/users/add"
                          ? "#90EE90"
                          : "#9DA4AE",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="Users"
                  sx={{
                    color:
                      location.pathname === "/admin-dash/users" ||
                      location.pathname === "/admin-dash/users/add"
                        ? "#fff"
                        : "#9DA4AE",
                  }}
                />
                {openUser ? (
                  <ExpandLess sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMore sx={{ color: "#fff" }} />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={openUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <Link
                  to="/admin-dash/users"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton sx={{ pl: 4, textAlign: "center" }}>
                    <ListItemText
                      primary="List Users"
                      sx={{
                        color:
                          location.pathname === "/admin-dash/users"
                            ? "#fff"
                            : "#9DA4AE",
                      }}
                    />
                  </ListItemButton>
                </Link>
                <Link
                  to="/admin-dash/users/add"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton sx={{ pl: 4, textAlign: "center" }}>
                    <ListItemText
                      primary="Add User"
                      sx={{
                        color:
                          location.pathname === "/admin-dash/users/add"
                            ? "#fff"
                            : "#9DA4AE",
                      }}
                    />
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            {/* ORDERS */}
            <ListItem>
              <Link
                to="/admin-dash/orders"
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <BookmarksIcon
                      sx={{
                        color:
                          location.pathname === "/admin-dash/orders"
                            ? "#90EE90"
                            : "#9DA4AE",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary="Orders"
                    sx={{
                      color:
                        location.pathname === "/admin-dash/orders"
                          ? "#fff"
                          : "#9DA4AE",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </nav>
      </Box>
      <Divider sx={{ border: ".1px solid #171412", width: "100%" }} />
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Help" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <ListItemText primary="Contact Us" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton>
            <LogoutIcon sx={{ color: "#fff" }} />
            <ListItemText primary="Logout" sx={{ color: "#fff" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Temporary;
