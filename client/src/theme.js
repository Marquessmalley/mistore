import { createTheme } from "@mui/material/";

const theme = (mode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "rgb(9,20,34)" : "#fff",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === "dark" ? "rgb(9, 20, 34)" : "#fff",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            background: mode === "dark" ? "rgb(9, 20, 34)" : "#fff",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            color: "#fff",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Montserrat",
            color: mode === "dark" ? "#fff" : "#000",
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputLabel-root": {
              color: "rgb(99, 115, 129)", // Customize label color
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgb(99, 115, 129)", // Outline border color (default)
              },
              "&.Mui-focused fieldset": {
                borderColor: mode === "dark" ? "#fff" : "black", // Outline border color when focused
              },
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: mode === "dark" ? "#fff" : "black", // Label color when focused
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: mode === "dark" ? "#fff" : "black", // Change this to the desired outline color on hover
            },
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            // Add your custom styles for MuiDataGrid here
            "& .MuiDataGrid-row": {
              color: mode === "#fff",
            },
            "& 	.MuiDataGrid-checkboxInput": {
              color: "rgb(118, 118, 118)",
              transform: "scale(.8)",
            },
            "& .MuiDataGrid-columnHeaders ": {
              fontSize: "16px",
              background: mode === "dark" ? "#919EAB1f" : "#eeeeee",
            },
            "& .MuiDataGrid-withBorderColor": {
              borderBottom: ".2px dashed #637381",
            },
            "& .MuiTablePagination-toolbar": {
              color: "#fff",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: mode === "dark" ? "rgb(33, 43, 54)" : "#fff",
            borderRaidus: "16px",
          },
        },
      },
    },
  });

export default theme;
