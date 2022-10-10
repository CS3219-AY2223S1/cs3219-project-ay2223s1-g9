import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element, children, ...rest }) => {
  const { user } = useContext(AuthContext);

  return localStorage.getItem("user") || user ? (
    children
  ) : (
    <Navigate replace to={"/login"} />
  );
};

export default ProtectedRoute;
