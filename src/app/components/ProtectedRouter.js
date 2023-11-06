import React from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../../Routes/consts";

export const ProtectedRouter = ({ children }) => {
  if (localStorage.getItem("tokenAdmin")) {
    return children;
  }
  return <Navigate to={ROUTES.ADMIN.LOGIN} />;
};
