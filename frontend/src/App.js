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
import { useState } from "react";

function App() {
  const [user, setUser] = useState({ user: "", token: "" });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Box display={"flex"} flexDirection={"column"}>
          <Router>
            <Routes>
              <Route
                exact
                path="/"
                //element={<Navigate replace to="/login" />}
                element={<HomePage />}
              ></Route>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/room" element={<RoomPage />} />
            </Routes>
          </Router>
        </Box>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
