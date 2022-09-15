import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import LoginPage from "./pages/LoginPage.js";
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
