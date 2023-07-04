import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "./usersApiSlice";
import { Grid, Box, Typography, Avatar } from "@mui/material";

const User = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  const userFirstletter = user?.firstname[0];
  const userLastletter = user?.lastname[0];

  return (
    <Grid container>
      {/* HEADER */}
      <Grid item xs={12} sm={12} md={12} lg={12} mb={6} sx={{ p: "10px" }}>
        <Box sx={{ mb: ".8rem" }}>
          <Typography
            variant="h4"
            sx={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}
          >
            User profile
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "200px",
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
            User
          </Typography>
        </Box>
      </Grid>
      {/* USER PROFILE */}
      <Grid container sx={{ display: "flex", justifyContent: "space-around" }}>
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
          {/* <Box>
            <Typography variant="p">Status</Typography>
          </Box> */}
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

          {/* <Box sx={{ mt: "1rem" }}>
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
          </Box> */}
        </Grid>
        <Grid item lg={7} sx={{ background: "rgb(33, 43, 54)" }}>
          Card 2
        </Grid>
      </Grid>
    </Grid>
  );
};

export default User;
