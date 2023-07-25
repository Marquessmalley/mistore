import { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
  MenuItem,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "./usersApiSlice";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";

const roles = [
  {
    label: "Customer",
    value: "Customer",
  },
  {
    label: "Employee",
    value: "Employee",
  },
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Manager",
    value: "Manager",
  },
];

const AddUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
  });

  const [errMsg, setErrMsg] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [createUser, { isSuccess, isError, error }] = useCreateUserMutation();

  useEffect(() => {
    if (isError) setErrMsg(error.data.message);
    if (isSuccess) {
      setUserData({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
      });
      navigate("/admin-dash/users");
    }
  }, [isError, error, isSuccess, navigate]);

  const handleFormChange = (e) => {
    return setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { firstname, lastname, email, role, password } = userData;

    if (!firstname) setFirstNameError(true);
    if (!lastname) setLastNameError(true);
    if (!email) setEmailError(true);
    if (!role) setRoleError(true);
    if (!password) setPasswordError(true);

    await createUser({
      firstname,
      lastname,
      email,
      role,
      password,
    });
  };

  return (
    <Grid container sx={{ height: "81vh" }}>
      {/* HEADER */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // mb={6}
        sx={{ p: "10px" }}
      >
        <AdminHeader
          headerTitle="New User"
          breadCrumbs={
            <MuiBreadcrumbs
              crumbs={[
                { label: "Dashboard", to: "/admin-dash" },
                { label: "Users", to: "/admin-dash/users" },
                "New User",
              ]}
            />
          }
          btn={false}
        />
      </Grid>

      {/* CONTENT */}
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        lg={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(33, 43, 54)",
          borderRadius: "16px",
          padding: "80px 24px 40px",
          mr: "1rem",
          mb: "1rem",
          height: "50vh",
        }}
      >
        <Box
          sx={{
            borderRadius: "50%",
            border: "1px dashed rgba(145, 158, 171, 0.2) ",
            padding: "8px",
          }}
        >
          <IconButton
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "10px",
              borderRadius: "50px",
              background: "rgb(44, 52, 62)",
              width: "100px",
              height: "100px",
            }}
          >
            <AddAPhotoIcon sx={{ color: "rgb(99, 115, 129)" }} />
            <Typography
              sx={{
                color: "rgb(99, 115, 129)",
                fontSize: ".8rem",
              }}
            >
              Upload photo
            </Typography>
          </IconButton>
        </Box>

        <Box sx={{ mt: "1rem" }}>
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "rgb(99, 115, 129)",
              display: "block",
            }}
          >
            Allowed *.jpeg, *.jpg, *.png, *.gif
            <br />
            max size of 3.1 MB
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={7}
        lg={7}
        sx={{
          background: "rgb(33, 43, 54)",
          padding: "24px",
          borderRadius: "20px",
          height: "50vh",
        }}
      >
        {isError && <Alert severity="error">{errMsg}</Alert>}

        <form onSubmit={handleFormSubmit}>
          <TextField
            id="firstname"
            label="First Name"
            name="firstname"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            value={userData.firstname}
            onChange={handleFormChange}
            error={firstNameError}
            helperText={firstNameError ? "First name required" : null}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: "45%",
              mr: "1rem",
              color: "#fff",
            }}
          />
          <TextField
            id="lastname"
            label="Last Name"
            name="lastname"
            type="text"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleFormChange}
            value={userData.lastname}
            error={lastNameError}
            helperText={lastNameError ? "Last name required" : null}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: "45%",
            }}
          />
          <TextField
            id="email"
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            onChange={handleFormChange}
            value={userData.email}
            error={emailError}
            helperText={emailError ? "Email required" : null}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: "45%",
              mr: "1rem",
            }}
          />
          <TextField
            id="role"
            label="Role"
            name="role"
            select
            variant="outlined"
            margin="normal"
            fullWidth
            value={userData.role}
            onChange={handleFormChange}
            error={roleError}
            helperText={roleError ? "Role required" : null}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: "45%",
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role.value} value={role.value}>
                {role.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={userData.password}
            onChange={handleFormChange}
            error={passwordError}
            helperText={passwordError ? "Password required" : null}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: "45%",
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{
                background: "#fff",
                color: "rgb(33, 43, 54)",
                fontSize: "0.775rem",
                fontWeight: 700,
                padding: "6px 12px",
              }}
              type="submit"
            >
              Create User
            </Button>
          </Box>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddUser;
