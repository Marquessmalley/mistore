import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme.js";
import Login from "./features/auth/login/Login";
import Signup from "./features/auth/Signup";
import ForgotPassword from "./features/auth/ForgotPassword";
import Home from "./pages/storefront/index";
import AdminLayout from "./components/Layouts/Admins/AdminLayout";
import StoreFrontLayout from "./components/Layouts/StoreFront/StoreFrontLayout";
import Users from "./pages/admin/Users";
import AddUser from "./features/users/AddUser";
import EditUser from "./features/users/EditUser";
import Unauthorized from "./components/Errors/Unauthorized";
import Overview from "./pages/admin/Overview";
import Orders from "./pages/admin/Orders";
import ProductsList from "./features/products/ProductsList";
import EditProduct from "./features/products/EditProduct";
import AddProducts from "./features/products/AddProduct";
import Prefetch from "./features/users/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import Splash from "./pages/storefront/Splash";
import Products from "./pages/storefront/product/Products";
import Product from "./pages/storefront/product/Product";
import About from "./pages/storefront/About";
import Cart from "./pages/storefront/checkout/Cart";
import CheckoutLayout from "./components/Layouts/StoreFront/CheckoutLayout";
import Payment from "./pages/storefront/checkout/Payment";
import OrderStatus from "./pages/storefront/checkout/OrderStatus";
import OrderList from "features/orders/OrderList.js";
import EditOrder from "features/orders/EditOrder.js";

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const toggleTheme = () => {
    console.log("running");
    return setDarkMode((prevState) => !prevState);
  };

  const currentTheme = theme(darkMode ? "dark" : "light");

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <Routes>
          {/* PUBLIC ROUTES */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* STOREFRONT */}
          <Route path="/" element={<Splash />} />

          <Route element={<Prefetch />}>
            <Route path="store" element={<StoreFrontLayout />}>
              <Route index element={<Home />} />

              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<Product />} />

              <Route path="about" element={<About />} />

              <Route element={<CheckoutLayout />}>
                <Route path="cart" element={<Cart />} />

                <Route path="payment" element={<Payment />} />
                <Route path="status" element={<OrderStatus />} />
              </Route>
            </Route>
          </Route>

          {/* PRIVATE ADMIN ROUTES */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
              <Route element={<Prefetch />}>
                <Route path="admin-dash" element={<AdminLayout />}>
                  <Route index element={<Overview />} />
                  <Route path="users">
                    <Route index element={<Users />} />
                    <Route path="add" element={<AddUser />} />
                    <Route path=":id" element={<EditUser />} />
                  </Route>
                  <Route path="products">
                    <Route index element={<ProductsList />} />
                    <Route path="add" element={<AddProducts />} />
                    <Route path=":id" element={<EditProduct />} />
                  </Route>
                  <Route path="orders">
                    <Route index element={<OrderList />} />
                    <Route path=":id" element={<EditOrder />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>

          {/* END */}
        </Routes>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
}

export default App;
