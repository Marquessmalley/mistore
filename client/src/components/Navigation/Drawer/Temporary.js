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
          background: "rgb(9, 20, 34)",
          orderRight: "2px solid rgba(145, 158, 171, 0.2)",
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
                <ListItemButton
                  sx={{
                    background:
                      location.pathname === "/admin-dash"
                        ? "rgba(0, 167, 111, 0.08)"
                        : null,
                    borderRadius: "10px",
                    width: "208px",
                  }}
                >
                  <BarChartIcon
                    sx={{
                      color:
                        location.pathname === "/admin-dash"
                          ? "#90EE90"
                          : "#9DA4AE",
                      mr: ".6rem",
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "14px",
                      color:
                        location.pathname === "/admin-dash"
                          ? "#fff"
                          : "#9DA4AE",
                    }}
                  >
                    Overview
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
            {/* PRODUCTS */}
            <ListItem>
              <ListItemButton
                onClick={handleProductClick}
                sx={{
                  background:
                    location.pathname === "/admin-dash/products" ||
                    location.pathname === "/admin-dash/products/add"
                      ? "rgba(0, 167, 111, 0.08)"
                      : null,
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ display: "flex", mr: 6 }}>
                  <WorkIcon
                    sx={{
                      color:
                        location.pathname === "/admin-dash/products" ||
                        location.pathname === "/admin-dash/products/add"
                          ? "#90EE90"
                          : "#9DA4AE",
                      mr: ".6rem",
                    }}
                  />
                  <Typography
                    sx={{
                      color:
                        location.pathname === "/admin-dash/products" ||
                        location.pathname === "/admin-dash/products/add"
                          ? "#fff"
                          : "#9DA4AE",
                      fontSize: "15px",
                      mr: "1rem",
                    }}
                  >
                    Products
                  </Typography>
                </Box>

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
                  <ListItemButton sx={{ ml: 8 }}>
                    <Typography
                      sx={{
                        color:
                          location.pathname === "/admin-dash/products"
                            ? "#fff"
                            : "#9DA4AE",
                        fontSize: "14px",
                      }}
                    >
                      List
                    </Typography>
                  </ListItemButton>
                </Link>
                <Link
                  to="/admin-dash/products/add"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton sx={{ ml: 8 }}>
                    <Typography
                      sx={{
                        color:
                          location.pathname === "/admin-dash/products"
                            ? "#fff"
                            : "#9DA4AE",
                        fontSize: "14px",
                      }}
                    >
                      Add
                    </Typography>
                  </ListItemButton>
                </Link>
              </List>
            </Collapse>
            {/* USERS */}
            <ListItem>
              <ListItemButton
                onClick={handleUserClick}
                sx={{
                  background:
                    location.pathname === "/admin-dash/users" ||
                    location.pathname === "/admin-dash/users/add"
                      ? "rgba(0, 167, 111, 0.08)"
                      : null,
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ display: "flex", mr: 9 }}>
                  <PersonIcon
                    sx={{
                      color:
                        location.pathname === "/admin-dash/users" ||
                        location.pathname === "/admin-dash/users/add"
                          ? "#90EE90"
                          : "#9DA4AE",
                      mr: ".6rem",
                    }}
                  />

                  <Typography
                    sx={{
                      color:
                        location.pathname === "/admin-dash/users" ||
                        location.pathname === "/admin-dash/users/add"
                          ? "#fff"
                          : "#9DA4AE",
                      fontSize: "14px",
                      mr: "1rem",
                    }}
                  >
                    Users
                  </Typography>
                </Box>
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
                  <ListItemButton sx={{ ml: 8, textAlign: "center" }}>
                    <Typography
                      sx={{
                        color:
                          location.pathname === "/admin-dash/users"
                            ? "#fff"
                            : "#9DA4AE",
                        fontSize: "14px",
                      }}
                    >
                      List
                    </Typography>
                  </ListItemButton>
                </Link>
                <Link
                  to="/admin-dash/users/add"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <ListItemButton sx={{ ml: 8, textAlign: "center" }}>
                    <Typography
                      sx={{
                        color:
                          location.pathname === "/admin-dash/users/add"
                            ? "#fff"
                            : "#9DA4AE",
                        fontSize: "14px",
                      }}
                    >
                      Add
                    </Typography>
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
                <ListItemButton
                  sx={{
                    background:
                      location.pathname === "/admin-dash/orders"
                        ? "rgba(0, 167, 111, 0.08)"
                        : null,
                    borderRadius: "10px",
                    width: "208px",
                  }}
                >
                  <BookmarksIcon
                    sx={{
                      color:
                        location.pathname === "/admin-dash/orders"
                          ? "#90EE90"
                          : "#9DA4AE",
                      mr: ".6rem",
                    }}
                  />

                  <Typography
                    sx={{
                      color:
                        location.pathname === "/admin-dash/orders"
                          ? "#fff"
                          : "#9DA4AE",
                      fontSize: "14px",
                    }}
                  >
                    Orders
                  </Typography>
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
