import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLayout from "./components/Layouts/Admins/AdminLayout";
import Users from "./pages/admin/Users";
import EditUser from "./components/Features/users/EditUser";
import AddUser from "./components/Features/users/AddUser";
import Unauthorized from "./components/Errors/Unauthorized";
import Overview from "./pages/admin/Overview";
import Orders from "./pages/admin/Orders";
import ListProducts from "./components/Features/products/ListProducts";
import AddProducts from "./components/Features/products/AddProduct";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PRIVATE ADMIN ROUTES */}
      <Route path="admin-dash" element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="users">
          <Route index element={<Users />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
        <Route path="products">
          <Route index element={<ListProducts />} />
          <Route path="add" element={<AddProducts />} />
        </Route>

        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
