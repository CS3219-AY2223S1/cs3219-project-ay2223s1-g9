import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import { Box } from "@mui/material";
import LoginPage from "./pages/LoginPage";
import { NavigationPage } from "./pages/NavigationPage";
import { AuthProvider } from "./AuthProvider";
import { RoomProvider } from "./contexts/RoomProvider";
import ProtectedRoute from "./ProtectedRoute";
import { CookiesProvider } from "react-cookie";
import "./styles/scss/global.scss";

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
                      <RoomProvider>
                        <NavigationPage />
                      </RoomProvider>
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
