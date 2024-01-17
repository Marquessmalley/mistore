import { useContext } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ThemeContext } from "App";

const ProductCard = ({ data }) => {
  const { darkMode } = useContext(ThemeContext);

  const imageUrl = data.images.map((image) => {
    if (image.includes("public")) {
      return image.replace("public/", "");
    }
    return image;
  });

  return (
    <Card sx={{ background: darkMode ? "rgb(33, 43, 54)" : "#fff" }}>
      {imageUrl.map((imageUrl, index) => (
        <CardMedia
          key={index} // Use a unique key for each image
          component="img"
          height="180"
          src={`${process.env.REACT_APP_BACKEND_DOMAIN}/${imageUrl}`}
          alt={data.name}
        />
      ))}
      <CardContent>
        <Link
          to={`/store/products/${data.id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography gutterBottom>{data.name}</Typography>
        </Link>
        <Typography>{data.description}</Typography>
        <Typography>Price: ${data.price}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
