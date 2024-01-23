import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { useGetOrdersQuery, selectOrderById } from "./ordersApiSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminHeader from "components/UI/Headers/AdminHeader";
import MuiBreadcrumbs from "components/UI/Breadcrumbs/MuiBreadcrumbs";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { ThemeContext } from "App";

const EditOrder = () => {
  const params = useParams();
  const { id } = params;

  const { darkMode } = useContext(ThemeContext);

  const order = useSelector((state) => selectOrderById(state, id));
  const {
    data: orders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrdersQuery();

  const date = new Date(order?.createdAt ? order.createdAt : null);

  const formattedDate = format(date, "dd MMM yyyy", {
    locale: enUS,
  });
  const formattedTime = format(date, "h:mm a", {
    locale: enUS,
  });

  console.log("Order:", order);
  return (
    <Grid container>
      <Grid item xs={11} sm={11} md={11} lg={11} mb={6} sx={{ p: "10px" }}>
        <AdminHeader
          headerTitle="Edit Order"
          breadCrumbs={
            <MuiBreadcrumbs
              crumbs={[
                { label: "Dashboard", to: "/admin-dash" },
                { label: "Orders", to: "/admin-dash/orders" },
                `#${order?.id}`.substring(0, 4),
              ]}
            />
          }
          btn={false}
        />
        <div>
          <Typography
            sx={{ fontSize: "0.875rem", fontWeight: 600, opacity: 0.8 }}
          >
            {formattedDate}, {formattedTime}
          </Typography>
        </div>
      </Grid>

      {/* LEFT */}
      <Grid
        item
        xs={12}
        sm={12}
        lg={6}
        sx={{
          background: darkMode ? "rgb(22, 28, 36)" : "#eeeeee",
          padding: "2rem",
          borderRadius: "10px",
          margin: "1rem",
        }}
      >
        {/* TOP */}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Details
          </Typography>
          <ModeEditIcon />
        </Grid>
        {/* BOTTOM */}
        {order?.items.map((item) => (
          <Grid
            item
            xs={12}
            key={item.cart_id}
            sx={{
              margin: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <img
              src={`${process.env.REACT_APP_BACKEND_DOMAIN}/${item.images[0]}`}
              alt="img"
              style={{
                maxWidth: "60px",
                maxHeight: "60px",
                borderRadius: "2px",
              }}
            />
            <div style={{ display: "flex" }}>
              <Typography sx={{ marginRight: "1rem" }}>
                x{item.quantity}
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>${item.price}</Typography>
            </div>
          </Grid>
        ))}
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Subtotal</Typography>
            <p style={{ fontWeight: "bold" }}>-</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Shipping</Typography>
            <p style={{ fontWeight: "bold" }}> -</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Discount</Typography>
            <p style={{ fontWeight: "bold" }}>-</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Taxes</Typography>
            <p style={{ fontWeight: "bold" }}>-</p>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ marginRight: "1rem" }}>Total</Typography>
            <p style={{ fontWeight: "bold" }}>{order.totalCost}</p>
          </div>
        </Grid>
      </Grid>

      {/* RIGHT */}
      <Grid
        item
        xs={12}
        lg={4}
        sx={{
          background: darkMode ? "rgb(22, 28, 36)" : "#eeeeee",
          padding: "2rem",
          borderRadius: "10px",
          margin: "1rem",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            Customer Info
          </Typography>
          <ModeEditIcon />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EditOrder;
