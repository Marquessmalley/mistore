import { useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useSelector } from "react-redux";

const Details = () => {
  const [contectInfo, setContactInfo] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const shipping = useSelector((state) => state.cart.shipping);
  const contact = useSelector((state) => state.cart.contact);

  const contactEntries = Object.keys(contact);

  return (
    <Grid container>
      {/* Detail Info */}
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "2rem",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            borderRadius: "10px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
          }}
        >
          <h1 style={{ marginLeft: "50px" }}>Contact Information</h1>
          <Grid
            item
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            {contactEntries.slice(0, 2).map((key) => (
              <>
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
                  sx={{ width: "250px" }}
                  size="small"
                />
              </>
            ))}
          </Grid>
          {contactEntries.slice(2).map((key) => (
            <Grid
              item
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
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
                sx={{ width: "570px" }}
                size="small"
              />
            </Grid>
          ))}
        </Grid>
        {/* TOTALS   */}
        <Grid
          item
          xs={4}
          sx={{
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.8)",
            borderRadius: "5px",
          }}
        >
          <p>Subtotal: </p>
          <p>Shipping: </p>
          <p>Tax: </p>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Details;
