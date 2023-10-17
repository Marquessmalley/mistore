import { useState, useEffect } from "react";
import { Grid, Box, TextField, Button, Hidden, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../authApiSlice";
import { authActions } from "../../../store/slices/authSlice";
import usePersist from "../../../utils/hooks/usePersist";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [persist, setPersist] = usePersist();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [emailErr, setEmailErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [login, { data, isSuccess, isError, error }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      setLoginData({ email: "", password: "" });
      const { accessToken } = data;
      dispatch(authActions.setCredential(accessToken));
      navigate("/admin-dash");
    }
  }, [isSuccess, setLoginData, data, navigate, dispatch]);

  const handleFormChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleToggleCheckbox = () => setPersist((prevState) => !prevState);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!email) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    if (!password) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
    await login({ email, password });
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(9, 20, 34)",
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
              <h1 style={{ color: "#fff" }}>IMAGE</h1>
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
          <Grid item lg={10}>
            <form onSubmit={handleFormSubmit}>
              <Box>
                <h2 style={{ color: "#fff" }}>LOGIN</h2>
                {isError && (
                  <Alert severity="error">{error?.data?.message}</Alert>
                )}
              </Box>
              <TextField
                id="email"
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={handleFormChange}
                error={emailErr}
                helperText={emailErr ? "Email required" : null}
                InputProps={{
                  style: {
                    color: "#fff", // Change the text color to red
                  },
                }}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                variant="outlined"
                margin="normal"
                fullWidth
                onChange={handleFormChange}
                error={passwordErr}
                helperText={passwordErr ? "Password required" : null}
                InputProps={{
                  style: {
                    color: "#fff", // Change the text color to red
                  },
                }}
              />
              <label htmlFor="persist" style={{ color: "#fff" }}>
                I am not a alien
                <input
                  id="persist"
                  name="persist"
                  type="checkbox"
                  onChange={handleToggleCheckbox}
                  checked={persist}
                />
              </label>

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
                <span style={{ color: "#fff" }}>
                  <Link
                    to="/signup"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Sign up
                  </Link>
                  {"/"}
                  <Link
                    to="/forgot-password"
                    style={{ textDecoration: "none", color: "#fff" }}
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

export default Login;
