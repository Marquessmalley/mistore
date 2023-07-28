import { createTheme } from "@mui/material/";

const theme = createTheme({
  palette: {
    dark: {
      background: "rgb(9, 20, 34)",
    },
    light: {
      background: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Montserrat",
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
              borderColor: "#fff", // Outline border color when focused
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#fff", // Label color when focused
          },
          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#fff", // Change this to the desired outline color on hover
          },
        },
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          // Add your custom styles for MuiDataGrid here
          "& .MuiDataGrid-row": {
            color: "#fff",
          },
          "& 	.MuiDataGrid-checkboxInput": {
            color: "rgb(118, 118, 118)",
            transform: "scale(.8)",
          },
          "& .MuiDataGrid-columnHeaders ": {
            fontSize: "16px",
            background: "#919EAB1f",
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
          background: "rgb(33, 43, 54)",
          borderRaidus: "16px",
        },
      },
    },
  },
});

export default theme;
