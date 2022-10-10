import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { useCookies } from "react-cookie";

const ProtectedRoute = ({ element, children, ...rest }) => {
  const { user } = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(["user"]);

  return cookies.token || user ? children : <Navigate replace to={"/login"} />;
};

export default ProtectedRoute;
