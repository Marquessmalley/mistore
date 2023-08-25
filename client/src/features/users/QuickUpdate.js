import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, MenuItem, Alert } from "@mui/material";
// import { roles } from "../../constants/roles";
import { useUpdateUserMutation } from "./usersApiSlice";

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

const QuickUpdate = ({
  id,
  firstname,
  lastname,
  email,
  role,
  handleDialogClose,
}) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: firstname,
    lastname: lastname,
    email: email,
    role: role,
  });

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [roleError, setRoleError] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      handleDialogClose();
      // navigate(`/admin-dash/users/${id}`);
    }

    if (isError) {
      setErrMsg(error.data.message);
    }
  }, [isSuccess, isError, error, id, navigate, handleDialogClose]);

  const handleFormChange = (e) => {
    setUser((user) => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { firstname, lastname, email, role } = user;

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

  return (
    <>
      {isError && <Alert severity="error">{errMsg}</Alert>}
      <form onSubmit={handleFormSubmit}>
        <TextField
          id="firstname"
          name="firstname"
          label="First Name"
          type="text"
          value={user.firstname}
          onChange={handleFormChange}
          margin="normal"
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
          }}
        />
        <TextField
          id="lastname"
          name="lastname"
          label="Last Name"
          type="text"
          value={user.lastname}
          onChange={handleFormChange}
          margin="normal"
          error={lastNameError}
          helperText={lastNameError ? "Last name required" : null}
          InputProps={{
            style: {
              color: "#fff", // Change the text color to red
            },
          }}
          sx={{
            width: "45%",
            mr: "1rem",
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
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#fff", // Change this to the desired outline color on hover
            },
          }}
        />
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={user.email}
          onChange={handleFormChange}
          error={emailError}
          helperText={emailError ? "Email required" : null}
          margin="normal"
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
          id="role"
          label="Role"
          name="role"
          select
          value={user.role}
          onChange={handleFormChange}
          error={roleError}
          helperText={roleError ? "Role required" : null}
          margin="normal"
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            onClick={handleDialogClose}
            sx={{
              color: "#fff",
              borderColor: "#fff",
              fontWeight: 700,
              mr: "1rem",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              color: "rgb(33, 43, 54)",
              background: "#fff",
              fontWeight: 700,
              mr: "2.5rem",
            }}
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default QuickUpdate;
