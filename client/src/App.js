import { Routes, Route } from "react-router-dom";
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
import Details from "./pages/storefront/checkout/Details";
import Payment from "./pages/storefront/checkout/Payment";
import Summary from "./pages/storefront/checkout/Summary";

function App() {
  return (
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
            <Route path="details" element={<Details />} />
            <Route path="payment" element={<Payment />} />
            <Route path="review" element={<Summary />} />
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

              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* END */}
    </Routes>
  );
}

export default App;
