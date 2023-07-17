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
  Fab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/slices/authSlice";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
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

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgb(9, 20, 34)",
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        pb: "2rem",
      }}
    >
      <Toolbar>
        <Grid container sx={{ display: "flex", alignItems: "center" }}>
          <Grid
            item
            xs={6}
            sm={9}
            md={9}
            lg={6}
            sx={{
              "@media screen and (max-width: 899px)": {
                display: "flex",
              },
            }}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { md: "none" } }}
              onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              <Typography
                variant="h5"
                mt={2}
                mb={1}
                sx={{ fontFamily: "Montserrat" }}
              >
                Welcome back, {user?.firstname} {user?.lastname}
              </Typography>
              <Typography variant="p" sx={{ fontFamily: "Montserrat" }}>
                Here's what's happening with your store today.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3} md={3} lg={6}>
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
              <Fab size="small" onClick={handleMenuClick}>
                <PersonIcon />
              </Fab>
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
