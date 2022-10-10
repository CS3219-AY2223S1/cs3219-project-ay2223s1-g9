import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useCookies } from "react-cookie";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    // const currentUser = localStorage.getItem("user");
    // if (currentUser) {
    //   setUser(JSON.parse(currentUser));
    // }

    if (cookies) {
      const currentUser = { username: cookies.username, token: cookies.token };
      setUser(currentUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
