import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import {
  Grid,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  MenuItem,
  Alert,
} from "@mui/material";
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice";
import { roles } from "../../constants/roles";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  const [formData, setFormData] = useState({
    firstname: user?.firstname,
    lastname: user?.lastname,
    email: user?.email,
    role: user?.role,
  });

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [
    updateUser,
    { isSuccess: updateSucces, isError: isupdateError, error: updateError },
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: deleteSucceess, isError: isDeleteError, error: deleteError },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (isDeleteError) setErrMsg(deleteError.data.message);
    if (deleteSucceess) {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
      });
      navigate("/admin-dash/users");
    }
  }, [isDeleteError, deleteError, deleteSucceess, navigate]);

  useEffect(() => {
    if (isupdateError) setErrMsg(updateError.data.message);
    if (updateSucces) {
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
      });
      navigate("/admin-dash/users");
    }
  }, [isupdateError, updateSucces, updateError, navigate]);

  const handleDeleteUser = async () => {
    await deleteUser(id);
  };

  const handleFormChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, role } = formData;

    if (!firstname) setFirstNameError(true);
    if (!lastname) setLastNameError(true);
    if (!email) setEmailError(true);
    if (!role) setRoleError(true);

    await updateUser({
      id,
      firstname,
      lastname,
      email,
      role,
    });
  };

  const userFirstletter = user?.firstname[0];
  const userLastletter = user?.lastname[0];

  return (
    <Grid container>
      {/* HEADER */}
      <Grid item xs={12} sm={12} md={12} lg={12} mb={6} sx={{ p: "10px" }}>
        <Box sx={{ mb: ".8rem" }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Montserrat",
            }}
          >
            Edit
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "300px",
            fontFamily: "Montserrat",
          }}
        >
          <Link
            to="/admin-dash"
            style={{
              textDecoration: "none",
              fontSize: "0.975rem",
              fontWeight: 400,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Dashboard
          </Link>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50px",
              background: "rgb(145, 158, 171)",
            }}
          ></span>
          <Link
            to="/admin-dash/users"
            style={{
              textDecoration: "none",
              fontSize: "0.975rem",
              fontWeight: 400,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Users
          </Link>
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50px",
              background: "rgb(145, 158, 171)",
            }}
          ></span>
          <Typography
            variant="p"
            sx={{
              fontSize: "0.975rem",
              fontWeight: 500,
              color: "rgb(145, 158, 171)",
            }}
          >
            {user?.firstname + " " + user?.lastname}
          </Typography>
        </Box>
      </Grid>
      {/* USER PROFILE */}
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Grid
          item
          lg={4}
          sx={{
            background: "rgb(33, 43, 54)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "16px",
            padding: "80px 24px 40px",
            mr: "1rem",
            mb: "1rem",
          }}
        >
          <Box
            sx={{
              borderRadius: "50%",
              border: "1px dashed rgba(145, 158, 171, 0.2) ",
              padding: "8px",
            }}
          >
            <Avatar sx={{ bgcolor: "grey", height: 100, width: 100 }}>
              {userFirstletter + userLastletter}
            </Avatar>
          </Box>

          <Box sx={{ mt: "1.5rem" }}>
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
          <Box sx={{ mt: "1.5rem" }}>
            <Button
              variant="contained"
              onClick={handleDeleteUser}
              sx={{
                background: "rgba(255, 86, 48, 0.16)",
                color: "rgb(255, 172, 130)",
                fontSize: "0.775rem",
                fontWeight: 700,
                "&:hover": {
                  background: "rgba(255, 86, 48, 0.4)",
                },
              }}
            >
              Delete User
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          lg={7}
          sx={{
            background: "rgb(33, 43, 54)",
            borderRadius: "16px",
            height: "35vh",
          }}
        >
          {(isupdateError || isDeleteError) && (
            <Alert severity="error">{errMsg}</Alert>
          )}
          <form onSubmit={handleFormSubmit}>
            <TextField
              id="firstname"
              label="First Name"
              name="firstname"
              type="text"
              variant="outlined"
              margin="normal"
              fullWidth
              value={formData?.firstname}
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
                ml: "2rem",
                color: "#fff",
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
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#fff", // Change this to the desired outline color on hover
                  },
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
              value={formData?.lastname}
              error={lastNameError}
              helperText={lastNameError ? "Last name required" : null}
              InputProps={{
                style: {
                  color: "#fff", // Change the text color to red
                },
              }}
              sx={{
                width: "45%",
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
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#fff", // Change this to the desired outline color on hover
                  },
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
              value={formData.email}
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
                ml: "2rem",
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
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#fff", // Change this to the desired outline color on hover
                  },
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
              value={formData.role}
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
                "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#fff", // Change this to the desired outline color on hover
                  },
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </TextField>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mr: "1rem",
                mt: "1rem",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  background: "#fff",
                  color: "rgb(33, 43, 54)",
                  fontSize: "0.775rem",
                  fontWeight: 700,
                  padding: "6px 12px",
                  borderRadius: "8px",
                }}
                type="submit"
              >
                Edit User
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditUser;
