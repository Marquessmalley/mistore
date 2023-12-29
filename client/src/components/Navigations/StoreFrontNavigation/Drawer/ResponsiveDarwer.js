import { useState, useContext } from "react";
import {
  Drawer,
  ListItem,
  ListItemButton,
  Collapse,
  Box,
  Typography,
  Slider,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { productsFilteringContext } from "components/Layouts/StoreFront/StoreFrontLayout";
import { ThemeContext } from "App";

const categories = [
  {
    id: 0,
    label: "T-Shirt",
  },
  {
    id: 1,
    label: "Hoodie",
  },
  {
    id: 2,
    label: "Shorts",
  },
  {
    id: 3,
    label: "Pants",
  },
  {
    id: 4,
    label: "Other",
  },
];

const colors = [
  {
    id: 0,
    label: "Red",
  },
  {
    id: 1,
    label: "Blue",
  },
  {
    id: 2,
    label: "Green",
  },
  {
    id: 3,
    label: "Yellow",
  },
  {
    id: 4,
    label: "Orange",
  },
  {
    id: 5,
    label: "Black",
  },
  {
    id: 6,
    label: "White",
  },
  {
    id: 7,
    label: "Brown",
  },
];

const ResponsiveDarwer = ({ filterMobileOpen, handleFilterDrawerToggle }) => {
  const drawerWidth = 240;

  const [price, setPrice] = useState([20, 80]);

  const [openCategory, setOpenCategory] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);

  const {
    selectedCategories,
    selectedColors,
    setSelectedCategories,
    setSelectedColors,
  } = useContext(productsFilteringContext);

  const { darkMode } = useContext(ThemeContext);

  const handleCategoryClick = () => setOpenCategory(!openCategory);
  const handleColorClick = () => setOpenColor(!openColor);
  const handlePriceClick = () => setOpenPrice(!openPrice);

  const handleCategoryChange = (item) => {
    setSelectedCategories((prevState) => {
      if (prevState.includes(item.label)) {
        return prevState.filter((category) => category !== item.label);
      } else {
        return [...prevState, item.label];
      }
    });
  };
  const handleColorChange = (item) => {
    setSelectedColors((prevState) => {
      if (prevState.includes(item.label)) {
        return prevState.filter((category) => category !== item.label);
      } else {
        return [...prevState, item.label];
      }
    });
  };
  const handlePriceChange = (e, newValue) => {
    setPrice(newValue);
  };

  return (
    <>
      <Drawer
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
            <ListItemButton
              onClick={handleCategoryClick}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
            {categories.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    marginLeft: "2rem",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item.label)}
                      // name="category"
                      onChange={() => handleCategoryChange(item)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* COLORS */}
          <ListItem>
            <ListItemButton
              onClick={handleColorClick}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
                <div
                  key={item.id}
                  style={{
                    marginLeft: "2rem",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(item.label)}
                      name="colors"
                      onChange={() => handleColorChange(item)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* PRICE */}
          <ListItem>
            <ListItemButton
              onClick={handlePriceClick}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
            borderRadius: "20px",
          },
        }}
        open
      >
        <form>
          {/* CATEGORY */}
          <ListItem>
            <ListItemButton
              onClick={handleCategoryClick}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
            {categories.map((item) => {
              return (
                <div
                  key={item.id}
                  style={{
                    marginLeft: "2rem",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item.label)}
                      name="category"
                      onChange={() => handleCategoryChange(item)}
                      style={{ margin: ".5rem" }}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* COLORS */}
          <ListItem>
            <ListItemButton
              onClick={handleColorClick}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
                <div
                  key={item.id}
                  style={{
                    marginLeft: "2rem",
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedColors.includes(item.label)}
                      name="colors"
                      onChange={() => handleColorChange(item)}
                    />
                    {item.label}
                  </label>
                </div>
              );
            })}
          </Collapse>

          {/* PRICE */}
          <ListItem>
            <ListItemButton
              onClick={handlePriceClick}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
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
              sx={{ width: "75%" }}
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
