import { useState } from "react";
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
import PostAddIcon from "@mui/icons-material/PostAdd";
import LogoutIcon from "@mui/icons-material/Logout";

const Permenant = ({ drawerWidth }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  const [openUser, setOpenUser] = useState(false);
  const handleUserClick = () => setOpenUser(!openUser);
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,

          background: "black",
        },
      }}
      open
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
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <BarChartIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Overview" sx={{ color: "#fff" }} />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <WorkIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Products" sx={{ color: "#fff" }} />
                {open ? (
                  <ExpandLess sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMore sx={{ color: "#fff" }} />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PostAddIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add Product" sx={{ color: "#fff" }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem>
              <ListItemButton onClick={handleUserClick}>
                <ListItemIcon>
                  <PersonIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ color: "#fff" }} />
                {openUser ? (
                  <ExpandLess sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMore sx={{ color: "#fff" }} />
                )}
              </ListItemButton>
            </ListItem>
            <Collapse in={openUser} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <PostAddIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add User" sx={{ color: "#fff" }} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <BookmarksIcon sx={{ color: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Orders" sx={{ color: "#fff" }} />
              </ListItemButton>
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

export default Permenant;
