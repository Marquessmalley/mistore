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
          src={`https://mistrain-api.onrender.com${imageUrl}`} // Use the image URL from the array
          alt={data.name}
        />
      ))}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Price: ${data.price}
        </Typography>
        <Button variant="contained" color="primary">
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
