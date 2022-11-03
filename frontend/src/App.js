import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import { NavigationPage } from "./pages/NavigationPage";
import { AuthContext } from "./AuthContext";
import { useEffect, useState, useContext } from "react";
import { AuthProvider } from "./AuthProvider";
import { PageProvider } from "./contexts/PageProvider";
import ProtectedRoute from "./ProtectedRoute";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <div className="App">
          <Box display={"flex"} flexDirection={"column"}>
            <Router>
              <Routes>
                <Route
                  exact
                  path="/"
                  //element={<Navigate replace to="/login" />}
                  element={
                    <ProtectedRoute>
                      <PageProvider>
                        <NavigationPage />
                      </PageProvider>
                    </ProtectedRoute>
                  }
                />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
              </Routes>
            </Router>
          </Box>
        </div>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default App;
