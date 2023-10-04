import { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Collapse,
  Box,
  Typography,
  Slider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const ResponsiveDarwer = ({ filterMobileOpen, handleFilterDrawerToggle }) => {
  const drawerWidth = 240;

  const [category, setCategory] = useState([
    {
      id: 0,
      label: "T-shirt",
      ischecked: false,
    },
    {
      id: 1,
      label: "Hoodie",
      ischecked: false,
    },
    {
      id: 2,
      label: "Hoodie",
      ischecked: false,
    },
    {
      id: 3,
      label: "Shorts",
      ischecked: false,
    },
    {
      id: 4,
      label: "Pants",
      ischecked: false,
    },
    {
      id: 5,
      label: "Other",
      ischecked: false,
    },
  ]);

  const [colors, setColors] = useState([
    {
      id: 0,
      label: "Red",
      ischecked: false,
    },
    {
      id: 1,
      label: "Blue",
      ischecked: false,
    },
    {
      id: 2,
      label: "Green",
      ischecked: false,
    },
    {
      id: 3,
      label: "Yellow",
      ischecked: false,
    },
    {
      id: 4,
      label: "Orange",
      ischecked: false,
    },
    {
      id: 5,
      label: "Black",
      ischecked: false,
    },
    {
      id: 6,
      label: "White",
      ischecked: false,
    },
    {
      id: 7,
      label: "Brown",
      ischecked: false,
    },
  ]);
  const [price, setPrice] = useState([20, 80]);

  const [openCategory, setOpenCategory] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const handleCategoryClick = () => setOpenCategory(!openCategory);
  const handleColorClick = () => setOpenColor(!openColor);
  const handlePriceClick = () => setOpenPrice(!openPrice);

  const handleCategoryChange = (id) => {
    setCategory((prevState) => {
      return prevState.map((item) =>
        item.id === id ? { ...item, ischecked: !item.ischecked } : item
      );
    });
  };
  const handleColorChange = (id) => {
    setColors((prevState) => {
      return prevState.map((item) =>
        item.id === id ? { ...item, ischecked: !item.ischecked } : item
      );
    });
  };
  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };

  return (
    <>
      <Drawer
        // container={container}
        variant="temporary"
        open={filterMobileOpen}
        onClose={handleFilterDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            marginTop: "55px",
          },
        }}
      >
        <form>
          {/* CATEGORY */}
          <ListItem>
            <ListItemButton onClick={handleCategoryClick} sx={{}}>
              <Box sx={{ display: "flex", mr: 6 }}>
                <Typography sx={{}}>Category</Typography>
              </Box>
              {openCategory ? (
                <ExpandLess sx={{ color: "#9DA4AE" }} />
              ) : (
                <ExpandMore sx={{ color: "#9DA4AE" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            {category.map((item) => {
              return (
                <div key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.ischecked}
                      name="category"
                      onChange={() => handleCategoryChange(item.id)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* COLORS */}
          <ListItem>
            <ListItemButton onClick={handleColorClick} sx={{}}>
              <Box sx={{ display: "flex", mr: 6 }}>
                <Typography sx={{}}>Colors</Typography>
              </Box>
              {openColor ? (
                <ExpandLess sx={{ color: "#9DA4AE" }} />
              ) : (
                <ExpandMore sx={{ color: "#9DA4AE" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openColor} timeout="auto" unmountOnExit>
            {colors.map((item) => {
              return (
                <div key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.ischecked}
                      name="category"
                      onChange={() => handleColorChange(item.id)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* PRICE */}
          <ListItem>
            <ListItemButton onClick={handlePriceClick} sx={{}}>
              <Box sx={{ display: "flex", mr: 6 }}>
                <Typography sx={{}}>Price</Typography>
              </Box>
              {openPrice ? (
                <ExpandLess sx={{ color: "#9DA4AE" }} />
              ) : (
                <ExpandMore sx={{ color: "#9DA4AE" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openPrice} timeout="auto" unmountOnExit>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={100}
            />
            <Typography variant="body2">
              ${price[0]} - ${price[1]}
            </Typography>
          </Collapse>
        </form>
      </Drawer>

      {/*  */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          marginTop: "50px",
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "absolute",
            top: 140,
            left: 25,
            height: "80vh",
            background: "#E5E5E5",
            borderRadius: "20px",
          },
        }}
        open
      >
        <form>
          {/* CATEGORY */}
          <ListItem>
            <ListItemButton onClick={handleCategoryClick} sx={{}}>
              <Box sx={{ display: "flex", mr: 6 }}>
                <Typography sx={{}}>Category</Typography>
              </Box>
              {openCategory ? (
                <ExpandLess sx={{ color: "#9DA4AE" }} />
              ) : (
                <ExpandMore sx={{ color: "#9DA4AE" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            {category.map((item) => {
              return (
                <div key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.ischecked}
                      name="category"
                      onChange={() => handleCategoryChange(item.id)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* COLORS */}
          <ListItem>
            <ListItemButton onClick={handleColorClick} sx={{}}>
              <Box sx={{ display: "flex", mr: 6 }}>
                <Typography sx={{}}>Colors</Typography>
              </Box>
              {openColor ? (
                <ExpandLess sx={{ color: "#9DA4AE" }} />
              ) : (
                <ExpandMore sx={{ color: "#9DA4AE" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openColor} timeout="auto" unmountOnExit>
            {colors.map((item) => {
              return (
                <div key={item.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={item.ischecked}
                      name="category"
                      onChange={() => handleColorChange(item.id)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* PRICE */}
          <ListItem>
            <ListItemButton onClick={handlePriceClick} sx={{}}>
              <Box sx={{ display: "flex", mr: 6 }}>
                <Typography sx={{}}>Price</Typography>
              </Box>
              {openPrice ? (
                <ExpandLess sx={{ color: "#9DA4AE" }} />
              ) : (
                <ExpandMore sx={{ color: "#9DA4AE" }} />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={openPrice} timeout="auto" unmountOnExit>
            <Slider
              value={price}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={100}
            />
            <Typography variant="body2">
              ${price[0]} - ${price[1]}
            </Typography>
          </Collapse>
        </form>
      </Drawer>
    </>
  );
};

export default ResponsiveDarwer;
