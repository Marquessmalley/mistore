import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({
  headerTitle,
  breadCrumbs,
  icon,
  btn,
  btnText,
  btnPath,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ mb: ".8rem" }}>
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 700,
            fontFamily: "Montserrat",
          }}
        >
          {headerTitle}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          fontFamily: "Montserrat",
        }}
      >
        <Typography>{breadCrumbs}</Typography>

        {btn && (
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              startIcon={icon}
              onClick={() => navigate(btnPath)}
              sx={{
                background: "#fff",
                color: "rgb(33, 43, 54)",
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "0.775rem",
              }}
            >
              {btnText}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AdminHeader;
