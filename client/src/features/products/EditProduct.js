import { useState, useEffect, useRef } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  MenuItem,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  useUpdateProductMutation,
  selectProductById,
} from "./productsApiSlice";
// import { colors, categories, sizes } from "../../constants/productAttributes";
import ClearIcon from "@mui/icons-material/Clear";
import "./products.css";

const colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Orange",
  "Black",
  "White",
  "Brown",
];

const sizes = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];

const categories = ["T-Shirt", "Hoodie", "Shorts", "Pants", "Other"];

const EditProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  const product = useSelector((state) => selectProductById(state, id));

  const [files, setFiles] = useState(product?.images);
  const fileInputRef = useRef();

  const [selectedColors, setSelectedColors] = useState(product?.colors || []);
  const [selectedSizes, setSelectedSizes] = useState(product?.sizes || []);

  const [gender, setGender] = useState(
    product?.gender && product?.gender.length > 0 ? product?.gender : []
  );

  const [maleChecked, setMaleChecked] = useState(
    gender && gender[0] === "Mens" ? true : false
  );

  const [femaleChecked, setFemaleChecked] = useState(
    product?.gender[0] === "Womens" || product?.gender[1] === "Womens"
  );

  const [productData, setProductData] = useState({});

  // ERROR STATES
  const [errMessage, setErrMessage] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [quantityErr, setQuantityErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [sizesErr, setSizesErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);

  const [updateProduct, { isSuccess, isError, error }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setProductData({
        id: id,
        name: product?.name,
        description: product?.description,
        images: product?.images,
        quantity: product?.quantity,
        category: product?.category,
        colors: product?.colors,
        sizes: product?.sizes,
        price: product?.price,
        gender: product.gender,
      });

      // Set initial checkbox values based on gender array
      if (product.gender) {
        setMaleChecked(product.gender.includes("Mens"));
        setFemaleChecked(product.gender.includes("Womens"));
      }
    }
  }, [product, id]);

  useEffect(() => {
    if (isError) {
      setErrMessage(error?.data?.message);
      console.log(error);
    }
    if (isSuccess) {
      setProductData({
        name: "",
        description: "",
        images: [],
        category: "",
        colors: [],
        sizes: [],
        price: 0,
      });
      navigate("/admin-dash/products");
    }
  }, [isSuccess, navigate, isError, error]);

  useEffect(() => {
    const storedFormData = localStorage.getItem(`productForm:${id}`);
    if (storedFormData) {
      const formData = JSON.parse(storedFormData);
      setProductData(formData);
      setFiles(formData?.images);
      setSelectedColors(formData?.colors || []);
      setSelectedSizes(formData?.sizes || []);
      setGender(formData?.gender);
    }
    return () => {
      localStorage.removeItem(`productForm:${id}`);
    };
  }, [id, product]);

  useEffect(() => {
    setProductData((prevState) => ({
      ...prevState,
      images: files,
      colors: selectedColors,
      sizes: selectedSizes,
      gender: gender,
    }));
  }, [selectedColors, selectedSizes, gender, files, id]);

  // COLORS LOGIC
  const handleColorChange = (e) => {
    setSelectedColors(e.target.value);
  };
  const renderSelectedColors = () => {
    if (selectedColors.length === 0) {
      return "Select Colors";
    }
    return selectedColors.join(", ");
  };

  // SIZES LOGIC
  const handleSizeChange = (e) => {
    setSelectedSizes(e.target.value);
  };
  const renderSelectedSizes = () => {
    if (selectedSizes.length === 0) {
      return "Select Sizes";
    }
    return selectedSizes.join(", ");
  };

  // GENDER LOGIC
  const handleMaleChange = (e) => {
    setMaleChecked(e.target.checked);
  };
  const handleFemaleChange = (e) => {
    setFemaleChecked(e.target.checked);
  };

  useEffect(() => {
    // Only update the gender state if at least one checkbox is checked
    if (maleChecked || femaleChecked) {
      let updatedGender = [];
      if (maleChecked) {
        updatedGender = [...updatedGender, "Mens"];
      }
      if (femaleChecked) {
        updatedGender = [...updatedGender, "Womens"];
      }
      setGender(updatedGender);
    } else {
      // Both checkboxes are unchecked, set gender to an empty array
      setGender([]);
    }
  }, [maleChecked, femaleChecked]);

  // FILE LOGIC
  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dropFiles = Array.from(e.dataTransfer.files);

    setFiles([...files, ...dropFiles]);
  };
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };
  const handleFileRemove = (fileRemove) => {
    const updatedFiles = files.filter((file) => file !== fileRemove);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    if (product !== undefined)
      localStorage.setItem(`productForm:${id}`, JSON.stringify(product));
  }, [product, id]);

  const handleFormChange = (e) => {
    return setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      id,
      name,
      description,
      sizes,
      colors,
      category,
      quantity,
      gender,
      price,
    } = productData;

    if (!name) {
      setNameErr(true);
      return;
    }
    if (!description) {
      setDescErr(true);
      return;
    }
    if (!category) {
      setCategoryErr(true);
      return;
    }
    if (!quantity) {
      setQuantityErr(true);
      return;
    }
    if (!sizes) {
      setSizesErr(true);
      return;
    }
    if (!price || price === 0) {
      setPriceErr(true);
      return;
    }

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("category", category);
    formData.append("colors", JSON.stringify(colors));
    formData.append("sizes", JSON.stringify(sizes));
    formData.append("gender", JSON.stringify(gender));
    formData.append("price", productData.price);

    // Append the selected files to the FormData
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    await updateProduct(formData);
  };

  return (
    <Grid container>
      <Grid item xs={11} sm={11} md={11} lg={11} mb={6} sx={{ p: "10px" }}>
        <AdminHeader
          headerTitle="Edit Product"
          breadCrumbs={
            <MuiBreadcrumbs
              crumbs={[
                { label: "Dashboard", to: "/admin-dash" },
                { label: "Product", to: "/admin-dash/products" },
                product?.name,
              ]}
            />
          }
          btn={false}
        />
      </Grid>
      <Grid item mt={5} xs={12} sm={12} md={4} lg={5}>
        <Box>
          <Typography sx={{ fontWeight: 700, lineHeight: 1.5, color: "#fff" }}>
            Details
          </Typography>
          <Typography
            sx={{ fontSize: "0.875rem", color: "rgb(145, 158, 171)" }}
          >
            Title, short description, image...
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={7}
        mt={5}
        sx={{
          padding: "1rem",
          borderRadius: "10px",
          background: "rgb(33, 43, 54)",
        }}
      >
        {error && (
          <>
            <Alert severity="error">{errMessage}</Alert>
          </>
        )}
        <TextField
          id="name"
          label="Name"
          name="name"
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={productData.name}
          error={nameErr}
          InputProps={{
            style: {
              color: "#fff", // Change the text color to red
            },
          }}
          sx={{ marginBottom: "2rem" }}
        />
        <TextField
          id="description"
          label="Description"
          name="description"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          placeholder="Type your product description.."
          onChange={handleFormChange}
          value={productData.description}
          error={descErr}
          InputProps={{
            style: {
              color: "#fff", // Change the text color to red
            },
          }}
          sx={{ marginBottom: "2rem" }}
        />
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "0.875rem",
              color: "#fff",
              marginBottom: ".8rem",
            }}
          >
            Images
          </Typography>
          <div
            onDrop={handleFileDrop}
            onClick={handleFileClick}
            onDragOver={(e) => e.preventDefault()}
            className="image-div"
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <Typography
              sx={{ fontWeight: 700, fontSize: "1rem", color: "#fff" }}
            >
              Drop or Select file
            </Typography>
            <Typography
              sx={{ fontSize: "0.875remrem", color: "rgb(145, 158, 171)" }}
            >
              Drop files here or click to browse through your machine
            </Typography>
          </div>
          <div style={{ width: "100%" }}>
            <ul style={{ display: "flex", alignItems: "center" }}>
              {files?.map((file, index) => {
                let exisitingFile;
                let newFile;
                if (typeof file === "string") {
                  exisitingFile = file.replace("public/", "");
                }
                if (typeof file === "object") {
                  newFile = URL.createObjectURL(file);
                }

                return (
                  <li
                    key={index}
                    style={{
                      margin: "0.275rem",
                      listStyle: "none",
                      position: "relative",
                    }}
                  >
                    <img
                      src={
                        exisitingFile
                          ? `http://localhost:8000/${exisitingFile}`
                          : newFile
                      }
                      alt="img"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => handleFileRemove(file)}
                      style={{
                        position: "absolute",
                        top: 5,
                        right: 5,
                        borderRadius: 50,
                        background: "rgba(22, 28, 36, 0.48)",
                      }}
                    >
                      <ClearIcon
                        sx={{ color: "#fff", width: "14px", height: "14px" }}
                      />
                    </IconButton>
                  </li>
                );
              })}
            </ul>
          </div>
        </Box>
      </Grid>
      {/* ADDITIONAL PROPERTIES SECTION */}
      <Grid item mt={5} xs={12} sm={12} md={4} lg={5}>
        <Box>
          <Typography sx={{ fontWeight: 700, lineHeight: 1.5, color: "#fff" }}>
            Properties
          </Typography>
          <Typography
            sx={{ fontSize: "0.875rem", color: "rgb(145, 158, 171)" }}
          >
            Additonal functions and attributes
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={7}
        mt={5}
        sx={{
          padding: "1rem",
          borderRadius: "10px",
          background: "rgb(33, 43, 54)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <TextField
            id="quantity"
            label="Quantity"
            name="quantity"
            type="number"
            variant="outlined"
            margin="normal"
            value={productData.quantity}
            onChange={handleFormChange}
            error={quantityErr}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{ width: "250px" }}
          />
          <TextField
            id="category"
            label="Category"
            name="category"
            select
            variant="outlined"
            margin="normal"
            value={productData?.category ? productData.category : []}
            onChange={handleFormChange}
            error={categoryErr}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: "250px",
            }}
          >
            {categories?.map((category) => {
              return (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              );
            })}
          </TextField>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <TextField
            id="color"
            label="Color"
            name="color"
            select
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedColors}
            onChange={handleColorChange}
            SelectProps={{
              multiple: true,
              renderValue: renderSelectedColors,
            }}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: 250,
              color: "#fff",
            }}
          >
            {colors.map((color) => (
              <MenuItem key={color} value={color}>
                <Checkbox checked={selectedColors.indexOf(color) > -1} />
                {color}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="size"
            label="Size"
            name="size"
            select
            variant="outlined"
            margin="normal"
            fullWidth
            value={selectedSizes}
            onChange={handleSizeChange}
            error={sizesErr}
            SelectProps={{
              multiple: true,
              renderValue: renderSelectedSizes,
            }}
            InputProps={{
              style: {
                color: "#fff", // Change the text color to red
              },
            }}
            sx={{
              width: 250,
              color: "#fff",
            }}
          >
            {sizes.map((size) => (
              <MenuItem key={size} value={size}>
                <Checkbox checked={selectedSizes.indexOf(size) > -1} />
                {size}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Box>
          <Typography
            sx={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}
          >
            Gender
          </Typography>
          <Box sx={{ display: "flex" }}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "#fff", transform: "scale(.9)" }}
                  checked={maleChecked}
                  onChange={handleMaleChange}
                />
              }
              sx={{ color: "#fff" }}
              label="Men"
            />
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: "#fff", transform: "scale(.9)" }}
                  checked={femaleChecked}
                  onChange={handleFemaleChange}
                />
              }
              sx={{ color: "#fff" }}
              label="Women"
            />
          </Box>
        </Box>
      </Grid>
      <Grid item mt={5} xs={12} sm={12} md={4} lg={5}>
        <Box>
          <Typography sx={{ fontWeight: 700, lineHeight: 1.5, color: "#fff" }}>
            Pricing
          </Typography>
          <Typography
            sx={{ fontSize: "0.875rem", color: "rgb(145, 158, 171)" }}
          >
            Price related inputs
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={7}
        mt={5}
        sx={{
          padding: "1rem",
          borderRadius: "10px",
          background: "rgb(33, 43, 54)",
        }}
      >
        <TextField
          id="price"
          label="Price"
          name="price"
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          onChange={handleFormChange}
          value={productData.price}
          error={priceErr}
          InputProps={{
            style: {
              color: "#fff", // Change the text color to red
            },
          }}
          sx={{ marginBottom: "2rem" }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}
      >
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          Update Product
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditProduct;
