import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import ForgotPassword from "./features/auth/ForgotPassword";
import AdminLayout from "./components/Layouts/Admins/AdminLayout";
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

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="unauthorized" element={<Unauthorized />} />

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
    </Routes>
  );
}

export default App;
