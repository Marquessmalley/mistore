import { useState } from "react";
import {
  Grid,
  CircularProgress,
  LinearProgress,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";
import { enUS } from "date-fns/locale"; // This is for English locale, you can change it as needed
import AdminHeader from "../../components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "../../components/UI/Breadcrumbs/MuiBreadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useGetProductsQuery } from "./productsApiSlice";
import { dialogAction } from "../../store/slices/dialog";
import MuiDialog from "../../components/UI/Dialog/MuiDialog";
import QuickDelete from "./QuickDelete";

const ProductsList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteDialogOpen = useSelector(
    (state) => state.dialog.deleteProductDialogOpen
  );
  const [rowInfo, setRowInfo] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery();

  const handleCheckboxClick = (params, event) => {
    event.stopPropagation(); // Prevents the row click event from being triggered

    const selectedIndex = selectedRows.indexOf(params.id);

    let newSelectedRows = [];

    if (selectedIndex === -1) {
      newSelectedRows = [...selectedRows, params.id];
    } else {
      newSelectedRows = selectedRows.filter((id) => id !== params.id);
    }

    setSelectedRows(newSelectedRows);
  };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 210,
      renderCell: (params) => {
        let productImage = "";
        if (params.row.images.length > 0) {
          productImage = params.row.images[0].replace("public/", "");
        }

        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: 150,
            }}
          >
            {productImage && (
              <img
                src={`https://mistrain-api.onrender.com${productImage}`}
                alt="img"
                style={{
                  maxWidth: "60px",
                  maxHeight: "60px",
                  borderRadius: "2px",
                }}
              />
            )}
            <div>
              <Link
                to={`/admin-dash/products/${params.row.id}`}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  opacity: 0.8,
                  textDecoration: "none",
                  color: "#fff",
                }}
              >
                {params?.row.product}
              </Link>
              <Typography
                sx={{
                  fontWeight: 400,
                  fontSize: "0.875rem",
                  color: "rgb(99, 115, 129)",
                }}
              >
                {params?.row.category}
              </Typography>
            </div>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Created at",
      width: 200,
      renderCell: (params) => {
        const formattedDate = format(params.row.date, "dd MMM yyyy", {
          locale: enUS,
        });
        const formattedTime = format(params.row.date, "h:mm a", {
          locale: enUS,
        });
        return (
          <div>
            <Typography
              sx={{ fontSize: "0.875rem", fontWeight: 600, opacity: 0.8 }}
            >
              {formattedDate}
            </Typography>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "rgb(99, 115, 129)",
              }}
            >
              {formattedTime}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <LinearProgress
              variant="determinate"
              value={params.row.quantity}
              sx={{
                background: "rgba(255, 171, 0, 0.24)",
                borderRadius: "5px",
                width: "80px",
                mb: "8px",
              }}
            />
            <Typography
              sx={{ fontSize: "0.75rem", color: "rgb(145, 158, 171)" }}
            >
              {params.row.quantity} stocked
            </Typography>
          </div>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
      renderCell: (params) => {
        return (
          <div
            style={{
              width: 250,
            }}
          >
            <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
              ${params.row.price}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      renderCell: (params) => {
        const handleDeleteProductDialogOpen = () => {
          dispatch(dialogAction.handleDeleteProductDialogOpen());
          setAnchorEl(null);
        };
        const handleDeleteProductDialogClose = () => {
          dispatch(dialogAction.handleDeleteProductDialogClose());
          setAnchorEl(null);
        };

        // MENU FUNCTIONS
        const handleMenuOpen = (event) => {
          setRowInfo(params?.row);
          setAnchorEl(event.currentTarget);
        };

        const handleMenuClose = () => {
          setAnchorEl(null);
        };

        const handleEditProduct = () => {
          setAnchorEl(null);
          navigate(`/admin-dash/products/${rowInfo?.id}`);
        };
        return (
          <div>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon sx={{ color: "#fff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleDeleteProductDialogOpen}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 90,
                  }}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                  <Typography sx={{ color: "red" }}>Delete</Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleEditProduct}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: 90,
                  }}
                >
                  <ModeEditIcon />
                  <Typography>Edit</Typography>
                </Box>
              </MenuItem>
            </Menu>
            <MuiDialog
              title={"Delete"}
              dialogOpen={deleteDialogOpen}
              handleDialogClose={handleDeleteProductDialogClose}
              content={
                <QuickDelete
                  id={rowInfo?.id}
                  row={rowInfo}
                  handleDialogClose={handleDeleteProductDialogClose}
                />
              }
            />
          </div>
        );
      },
    },
  ];

  let content;

  if (isLoading) {
    content = (
      <>
        <CircularProgress />
      </>
    );
  }
  if (isError) {
    content = (
      <>
        <Typography sx={{ color: "#fff", fontFamily: "Montserrat" }}>
          {error?.data?.message}
        </Typography>
      </>
    );
  }

  if (isSuccess) {
    const { ids } = products;

    const productContent = ids?.length
      ? ids.map((id) => {
          const date = new Date(products?.entities[id].createdAt);

          return {
            id: products?.entities[id].id,
            product: products?.entities[id].name,
            category: products?.entities[id].category,
            date: date,
            quantity: products?.entities[id].quantity,
            price: products?.entities[id].price,
            images: products?.entities[id].images,
          };
        })
      : null;

    content = (
      <div style={{ height: "78vh" }}>
        <Grid
          container
          sx={{
            height: "60vh",
          }}
        >
          <Grid item xs={11} sm={11} md={11} lg={11} mb={6} sx={{ p: "10px" }}>
            <AdminHeader
              headerTitle="Products"
              breadCrumbs={
                <MuiBreadcrumbs
                  crumbs={[
                    { label: "Dashboard", to: "/admin-dash" },
                    "Products",
                  ]}
                />
              }
              btn={true}
              btnText={"New Product"}
              btnPath="/admin-dash/products/add"
              icon={<AddIcon />}
            />
          </Grid>
          <Grid
            item
            xs={8}
            sm={12}
            md={12}
            lg={12}
            // sx={{ background: "green" }}
          >
            <DataGrid
              columns={columns}
              rows={productContent}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              onCellClick={handleCheckboxClick}
              selectionModel={selectedRows}
              rowHeight={75}
              sx={{
                background: "rgb(22, 28, 36)",
                color: "#fff",
                border: "none",
                fontFamily: "Montserrat",
                borderRadius: "15px",

                "@media screen and (max-width: 600px)": {
                  width: 475,
                },
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
  return <>{content};</>;
};

export default ProductsList;
