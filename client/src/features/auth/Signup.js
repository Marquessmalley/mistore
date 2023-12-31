import { Grid, Box, TextField, Hidden, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={10}
        lg={9}
        sx={{
          height: "60vh",
          borderRadius: "20px",
          display: "flex",
        }}
      >
        <Hidden mdDown>
          <Grid item md={6} lg={6}>
            <Box>
              <h1>IMAGE</h1>
            </Box>
          </Grid>
        </Hidden>

        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            "@media screen and (max-width: 900px)": {
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          <Grid item xs={12} sm={6} md={10} lg={10}>
            <form>
              <Box>
                <h2>Sign up</h2>
              </Box>
              <TextField
                id="firstName"
                label="First Name"
                name="firstName"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                id="lastName"
                label="Last Name"
                name="lastName"
                type="text"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                id="email"
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <TextField
                id="passwordConfirm"
                label="PasswordConfirm"
                name="passwordConfirm"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
              />
              <Box
                sx={{
                  padding: "1rem",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Continue
                </Button>
                <span>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    Login
                  </Link>
                  {" / "}
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none" }}
                  >
                    Forgot Password
                  </Link>
                </span>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Signup;
