import { Typography, Box, Button } from "@mui/material";
import { useDeleteProductMutation } from "./productsApiSlice";

const QuickDelete = ({ id, handleDialogClose, row }) => {
  const [deleteProduct, { data, isSuccess, isError, error }] =
    useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    await deleteProduct(id);
    handleDialogClose();
  };

  return (
    <Box>
      <Typography sx={{ mb: "1rem", fontSize: ".875rem", color: "#fff" }}>
        I want to delete this product
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleDeleteProduct}
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
