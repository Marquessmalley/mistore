import { useContext } from "react";
import { IconButton } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "App";

const SearchBox = () => {
  const { darkMode } = useContext(ThemeContext);

  // styled component using Material-UI's styled function.
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: "20px",

    backgroundColor: darkMode
      ? alpha(theme.palette.common.white, 0.15)
      : "#eeeeee",
    "&:hover": {
      backgroundColor: darkMode
        ? alpha(theme.palette.common.white, 0.15)
        : "#eeeeee",
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon sx={{ color: darkMode ? "#fff" : "#0288d1" }} />
      </SearchIconWrapper>

      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchBox;
