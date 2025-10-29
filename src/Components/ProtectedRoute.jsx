import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  // If user not logged in → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is not in allowed list → redirect to home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Otherwise → render the child component
  return children;
};

export default ProtectedRoute;
