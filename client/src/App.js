import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLayout from "./components/Layouts/Admins/AdminLayout";
import AdminDash from "./pages/admin/AdminDash";
import Users from "./pages/admin/Users";
import EditUser from "./components/Features/users/EditUser";
import AddUser from "./components/Features/users/AddUser";
import Unauthorized from "./components/Errors/Unauthorized";
import Overview from "./pages/admin/Overview";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";

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
        <Route index element={<AdminDash />} />
        <Route path="overview" element={<Overview />} />
        <Route path="users">
          <Route index element={<Users />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit" element={<EditUser />} />
        </Route>
        <Route path="products">
          <Route index element={<Products />} />
        </Route>

        <Route path="orders" element={<Orders />} />
      </Route>

      <Route path="unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
