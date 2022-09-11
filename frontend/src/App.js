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

function App() {
  return (
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
          </Routes>
        </Router>
      </Box>
    </div>
  );
}

export default App;
