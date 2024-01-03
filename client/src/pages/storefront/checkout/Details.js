import { useState, useContext } from "react";
import { Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { ThemeContext } from "App";

const Details = () => {
  const [contectInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  const shipping = useSelector((state) => state.cart.shipping);
  const contact = useSelector((state) => state.cart.contact);

  const { darkMode } = useContext(ThemeContext);

  const contactEntries = Object.keys(contact);

  return (
    <Grid container sx={{ display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sx={{ marginLeft: "2rem" }}>
        <h1>Details </h1>
      </Grid>
      {/* LEFT COLUMN */}
      <Grid item xs={12} sm={10} md={7} lg={6} sx={{ marginRight: "1rem" }}>
        <Grid
          item
          lg={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            background: darkMode ? "rgb(33, 43, 54)" : "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
            marginBottom: "3rem",
          }}
        >
          <h1 style={{ marginLeft: "2rem" }}>Contact Information</h1>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              // width: "100%",
              marginLeft: "2rem",
            }}
          >
            {contactEntries.slice(0, 2).map((key) => (
              <TextField
                id={key}
                label={key[0].toUpperCase() + key.slice(1)}
                name={key}
                type="text"
                // value={loginData.email}
                variant="outlined"
                margin="normal"
                // onChange={handleFormChange}
                // error={emailErr}
                // helperText={emailErr ? "Email required" : null}
                InputProps={{
                  style: {
                    // color: "#fff", // Change the text color to red
                  },
                }}
                sx={{
                  marginLeft: ".5rem",
                }}
                size="small"
              />
            ))}
          </Grid>
        </Grid>
        {/* Shipping Info */}

        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            background: darkMode ? "rgb(33, 43, 54)" : "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
            borderRadius: "10px",
            marginBottom: "3rem",
          }}
        >
          <p>Shipping Information</p>
        </Grid>
      </Grid>

      {/* RIGHT COLUMN */}
      {/* TOTALS   */}
      <Grid
        item
        xs={12}
        sm={10}
        md={4}
        lg={3}
        sx={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          borderRadius: "5px",
          background: darkMode ? "rgb(33, 43, 54)" : "#fff",
        }}
      >
        <Grid item sx={{ marginLeft: "2rem" }}>
          <p>Subtotal: </p>
          <p>Shipping: </p>
          <p>Tax: </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
