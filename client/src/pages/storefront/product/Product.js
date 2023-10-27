import { useState } from "react";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProductById } from "../../../features/products/productsApiSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { addToCart } from "store/slices/cartSlice";
import { v4 as uuidv4 } from "uuid";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, id));
  const cart = useSelector((state) => state.cart);
  const [selectedSize, setSelectedSize] = useState(null);

  const imageUrl = product?.images.map((image) => {
    if (image.includes("public")) {
      return image.replace("public/", "");
    }
    return image;
  });

  const handleAddToCart = () => {
    const uniqueId = uuidv4();
    if (selectedSize !== null) {
      const selectedProduct = {
        cart_id: uniqueId,
        prod_id: product?.id,
        name: product?.name,
        gender: product?.gender,
        images: product?.images,
        price: product?.price,
        quantity: 1,
        size: selectedSize,
      };
      dispatch(addToCart(selectedProduct));
    }
  };
  return (
    <Grid container sx={{ background: "#E5E5E5" }}>
      <Grid item xs={12}>
        <IconButton onClick={() => navigate("/store/products")}>
          <ArrowBackIcon sx={{ color: "black" }} />
        </IconButton>
      </Grid>
      <Grid
        item
        xs={12}
        sm={7}
        md={7}
        lg={8}
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <img
          src={`${process.env.REACT_APP_DOMAIN_KEY}/${imageUrl}`}
          // src={`http://localhost:8000/${imageUrl}`}
          alt="product"
          width="400"
          height="400"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={5}
        lg={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid item m={2}>
          <Typography sx={{ fontSize: "32px", fontWeight: "bold" }}>
            {product?.name}
          </Typography>
          <Typography sx={{ fontSize: "1rem" }}>
            {product?.gender.map((gender) => gender)}
          </Typography>
          <Typography sx={{ fontSize: "1.5rem" }}>${product?.price}</Typography>
        </Grid>

        <Grid item m={2}>
          <Typography>Sizes: </Typography>
          {product?.sizes.map((size) => (
            <Button
              key={size}
              variant="contained"
              sx={{
                margin: "1rem",
                borderRadius: "35px",
                padding: "1rem",
                background: selectedSize === size ? "black" : "white",
                color: selectedSize === size ? "white" : "black",
                "&:hover": {
                  backgroundColor: "black", // Background color on hover
                  color: "white",
                },
              }}
              onClick={() => setSelectedSize(size)}
            >
              {size[0]}
            </Button>
          ))}
        </Grid>

        <Grid item m={2}>
          <Typography>Description: </Typography>
          <Typography>{product?.description} </Typography>
        </Grid>

        <Grid item m={2}>
          <Button variant="contained" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
