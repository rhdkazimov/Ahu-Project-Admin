import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const ProtectedLoginRouter = ({ children }) => {
  if (localStorage.getItem("tokenAdmin")) {
    return <Navigate to={ROUTES.ADMIN.HOME} />;
  }
  return children;
};
