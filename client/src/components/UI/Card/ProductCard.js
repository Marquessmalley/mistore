import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import logo from "../../../assets/images/MIS1.png";

const ProductCard = ({ data }) => {
  console.log(data);
  return (
    <Card
      sx={{
        position: "relative",
        borderRadius: "10px",
        margin: "10px",
        height: "42vh",
      }}
    >
      <Typography
        sx={{
          position: "absolute",
          top: 0,
          right: 15,
          fontWeight: "bold",
          color: "#fff",
          background: "grey",
          padding: "5px",
          width: "25%",
          textAlign: "center",
          borderBottomLeftRadius: "5px",
          borderBottomRightRadius: "5px",
        }}
      >
        ${data.price}
      </Typography>
      <CardMedia component="img" height="200" image={logo} alt={"yo"} />
      <CardContent
        sx={{
          color: "#fff",
          background:
            "linear-gradient(to top, #0d0f11, #191c1f, #24282c, #2f343a, #3b4149)",
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}
          >
            {data.name}
          </Typography>
          <Typography sx={{ background: "red", width: "75%" }}>
            {data.description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
