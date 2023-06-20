import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLayout from "./components/Layouts/Admins/AdminLayout";
import AdminDash from "./pages/admin/AdminDash";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* PRIVATE ROUTES */}
      <Route path="admin-dash" element={<AdminLayout />}>
        <Route index element={<AdminDash />} />
      </Route>
    </Routes>
  );
}

export default App;
