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
import { AuthContext } from "./AuthContext";
import { useEffect, useState, useContext } from "react";
import { AuthProvider } from "./AuthProvider";
import { RoomProvider } from "./contexts/RoomProvider";
import ProtectedRoute from "./ProtectedRoute";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <AuthProvider>
      <CookiesProvider>
        <RoomProvider>
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
                        <HomePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/room"
                    element={
                      <ProtectedRoute>
                        <RoomPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </Router>
            </Box>
          </div>
        </RoomProvider>
      </CookiesProvider>
    </AuthProvider>
  );
}

export default App;
