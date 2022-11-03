import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useContext } from "react";
import axios from "axios";
import { URI_USER_SVC } from "../configs";
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_SUCCESS,
} from "../constants";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Heading2 from "../components/atoms/Heading2";
import Heading3 from "../components/atoms/Heading3";
import Logo from "../assets/icons/Logo";
import BodyCopy from "../components/atoms/BodyCopy";
import PrimaryButton from "../components/atoms/PrimaryButton";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const handleLogIn = async () => {
    const res = await axios
      .post(URI_USER_SVC + "/login", { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          setErrorDialog("Missing username or password");
        } else if (err.response.status === 401) {
          setErrorDialog(err.response.data.error);
        } else {
          setErrorDialog("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      let token = res.data.token;
      const currentUser = { username: username, token: token };
      setUser(currentUser);

      setCookie("username", username, { path: "/" });
      setCookie("token", token, { path: "/" });

      navigate("/");
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Error");
    setDialogMsg(msg);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"30%"}
      padding={"4rem"}
    >
      <Box backgroundColor={"black"}>
        <Heading3 text={"hello"} />
        <Heading2 text={"hello"} />
        <Logo />
        <BodyCopy text={"hello"} />
        <PrimaryButton text={"button"} />
      </Box>
      <Typography variant={"h3"} marginBottom={"2rem"}>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: "1rem" }}
        autoFocus
      />
      <TextField
        label="Password"
        variant="standard"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: "2rem" }}
      />
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"flex-end"}
        sx={{ marginBottom: "1rem" }}
      >
        <Button variant={"outlined"} onClick={handleLogIn}>
          Log in
        </Button>
      </Box>
      <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
        <Typography>
          or <Link to={"/signup"}> create an account</Link>
        </Typography>
      </Box>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LoginPage;
