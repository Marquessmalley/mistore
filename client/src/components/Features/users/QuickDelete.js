import { Typography, Box, Button } from "@mui/material";
import { useDeleteUserMutation } from "./usersApiSlice";

const QuickDelete = ({ id, handleDialogClose }) => {
  const [deleteUser, { data, isSuccess, isError, error }] =
    useDeleteUserMutation();

  const handleDeleteUser = async () => {
    await deleteUser(id);
    handleDialogClose();
  };

  return (
    <Box>
      <Typography sx={{ mb: "1rem", fontSize: ".875rem", color: "#fff" }}>
        I want to delete this user
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleDeleteUser}
          sx={{
            background: "red",
            fontSize: ".775rem",
            borderRadius: "8px",
            fontWeight: 700,
            mr: "1rem",
            "&:hover": {
              background: "red",
            },
          }}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          onClick={handleDialogClose}
          sx={{
            fontSize: ".775rem",
            fontWeight: 700,

            borderRadius: "8px",
            color: "#fff",
            borderColor: "#fff",
            "&:hover": {
              borderColor: "#fff",
            },
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default QuickDelete;
