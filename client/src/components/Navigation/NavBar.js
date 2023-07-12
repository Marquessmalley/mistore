import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  Grid,
  Button,
  Menu,
  MenuItem,
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/slices/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import "./navBar.css";
import jwtDecode from "jwt-decode";

const NavBar = ({ handleToggleDrawer, drawerWidth }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const [logout, { isSuccess, isError, error }] = useLogoutMutation();
  const open = Boolean(anchorEl);

  useEffect(() => {
    let decoded;
    if (token) {
      decoded = jwtDecode(token);
      setUser(decoded?.userInfo);
    }
  }, [token]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(authActions.logout());
      navigate("/login");
    }

    if (isError) {
      console.log(error);
    }
  }, [isSuccess, dispatch, isError, error, navigate]);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = async () => await logout();
  console.log(user);

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgb(9, 20, 34)",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        pb: "2rem",
      }}
    >
      <Toolbar>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { sm: "none" } }}
              onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "block",
                },
              }}
            >
              <Typography
                variant="h5"
                mt={2}
                mb={1}
                sx={{ fontFamily: "Montserrat" }}
              >
                Welcome back, {user?.firstname}
              </Typography>
              <Typography variant="p" sx={{ fontFamily: "Montserrat" }}>
                Here's what's happening with your store today.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              mt={2}
            >
              <SearchIcon sx={{ marginRight: "15px" }} />
              <NotificationsNoneIcon sx={{ marginRight: "15px" }} />
              <Button
                sx={{
                  background: "#171412",
                  display: "flex",
                  justifyContent: "space-between",
                  width: 185,
                  height: 40,
                  borderRadius: "15px",
                  opacity: 1.5,
                }}
                onClick={handleMenuClick}
                endIcon={<KeyboardArrowDownIcon sx={{ color: "#fff" }} />}
              >
                <Avatar sx={{ width: 24, height: 24 }}>
                  {user?.firstname[0]}
                </Avatar>
                <p style={{ color: "#fff", fontSize: "10px" }}>
                  {user?.firstname + " " + user?.lastname}
                </p>
              </Button>
              <Menu
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon />
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
