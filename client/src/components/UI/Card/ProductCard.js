import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  const imageUrl = data.images.map((image) => {
    if (image.includes("public")) {
      return image.replace("public/", "");
    }
    return image;
  });

  return (
    <Card sx={{ background: "white" }}>
      {imageUrl.map((imageUrl, index) => (
        <CardMedia
          key={index} // Use a unique key for each image
          component="img"
          height="180"
          src={`https://mistrain-api.onrender.com/${imageUrl}`}
          // src={`http://localhost:8000/${imageUrl}`}
          alt={data.name}
        />
      ))}
      <CardContent>
        <Link
          to={`/store/products/${data.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: ${data.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
