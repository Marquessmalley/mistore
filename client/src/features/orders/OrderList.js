import { useContext, useState } from "react";
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
import { useNavigate, Link } from "react-router-dom";
import { useGetOrdersQuery } from "./ordersApiSlice";
import { ThemeContext } from "App";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "components/UI/Breadcrumbs/MuiBreadcrumbs";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const OrderList = () => {
  const navigate = useNavigate();

  const [rowInfo, setRowInfo] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const { darkMode } = useContext(ThemeContext);

  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

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
      field: "Order",
      headerName: "Order",
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/admin-dash/orders/${params.row.id}`}
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                opacity: 0.8,
                textDecoration: "none",
                color: "#fff",
              }}
            >
              #{params.row.id.substring(0, 4)}
            </Link>
          </>
        );
      },
    },
    {
      field: "Customer",
      headerName: "Customer",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Typography
              sx={{
                fontWeight: 400,
                fontSize: "0.875rem",
              }}
            >
              {params.row.name}
            </Typography>
          </>
        );
      },
    },
    {
      field: "Date",
      headerName: "Date",
      width: 150,
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
      field: "Items",
      headerName: "Items",
      renderCell: (params) => {
        return <Typography>{params.row.items}</Typography>;
      },
    },
    {
      field: "Total",
      headerName: "Total",
      renderCell: (params) => {
        return <Typography>${params.row.totalCost}</Typography>;
      },
    },
    {
      field: "Status",
      headerName: "Status",
      renderCell: (params) => {
        return <Typography>{params.row.status}</Typography>;
      },
    },
    {
      field: "actions",
      width: 150,
      headerName: "Actions",
      renderCell: (params) => {
        return (
          <IconButton>
            <MoreVertIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
          </IconButton>
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
    const { ids } = orders;
    const orderContent = ids?.length
      ? ids.map((id) => {
          const date = new Date(orders?.entities[id].createdAt);

          return {
            id: orders?.entities[id].id,
            name: orders?.entities[id].shipping.fullName,
            date,
            items: orders?.entities[id].items.length,
            totalCost: orders?.entities[id].totalCost,
            status: "Completed",
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
              headerTitle="Orders"
              breadCrumbs={
                <MuiBreadcrumbs
                  crumbs={[{ label: "Dashboard", to: "/admin-dash" }, "Orders"]}
                />
              }
            />
          </Grid>
          <Grid item xs={8} sm={12} md={12} lg={12}>
            <DataGrid
              columns={columns}
              rows={orderContent}
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
                background: darkMode ? "rgb(22, 28, 36)" : "#fff",
                color: darkMode ? "#fff" : "#000",
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

  return <div>{content}</div>;
};

export default OrderList;
