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
import { useState } from "react";
import axios from "axios";
import { URI_USER_SVC } from "../configs";
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_SUCCESS,
} from "../constants";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const [jwt, setJwt] = useState(); //set upon successful loginr

  const handleLogIn = async () => {
    const res = await axios
      .post(URI_USER_SVC + "/login", { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          setErrorDialog("Wrong username or password");
        } else {
          setErrorDialog("Please try again later");
        }
        console.log(err);
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      const jwt = res.data; //store jwt, change as needed
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
