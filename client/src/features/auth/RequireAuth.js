import React from "react";
import useAuth from "../../utils/hooks/useAuth";
import { Outlet } from "react-router-dom";
import { useLocation, Navigate } from "react-router-dom";
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { role } = useAuth();

  let content;
  if (role?.length > 0) {
    content = allowedRoles.includes(...role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
  }

  return content;
};

export default RequireAuth;
