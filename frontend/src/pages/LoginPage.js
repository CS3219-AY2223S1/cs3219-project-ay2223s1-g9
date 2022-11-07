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
import { API_GATEWAY_URL } from "../configs";
import { API_PATH } from "../constants";
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
import Logo from "../assets/icons/LogoIcon";
import BodyCopy from "../components/atoms/BodyCopy";
import PrimaryButton from "../components/atoms/PrimaryButton";
import StandardPage from "../components/templates/StandardPage";
import SecondaryNavBar from "../components/molecules/SecondaryNavBar";
import AuthCard from "../components/organisms/AuthCard";
import LinkText from "../components/atoms/LinkText";

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
      .post(API_GATEWAY_URL + API_PATH.LOGIN_PATH, { username, password })
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

      navigate("/problems");
    }
  };

  const closeDialog = () => setIsDialogOpen(false);

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Error");
    setDialogMsg(msg);
  };

  return (
    <StandardPage header={<SecondaryNavBar />}>
      <AuthCard
        title={"Login"}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        buttonText={"login"}
        footer={
          <>
            <BodyCopy>
              Need an account? <LinkText text={"Sign up"} link={"/signup"} />
            </BodyCopy>
          </>
        }
        handleSubmit={handleLogIn}
      />
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMsg}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>OK</Button>
        </DialogActions>
      </Dialog>
    </StandardPage>
  );
}

export default LoginPage;
