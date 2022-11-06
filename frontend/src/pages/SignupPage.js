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
import { URL_USER_SVC, URI_USER_SVC } from "../configs";
import {
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_SUCCESS,
} from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import StandardPage from "../components/templates/StandardPage";
import SecondaryNavBar from "../components/molecules/SecondaryNavBar";
import AuthCard from "../components/organisms/AuthCard";
import LinkText from "../components/atoms/LinkText";
import BodyCopy from "../components/atoms/BodyCopy";

import { useCookies } from "react-cookie";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMsg, setDialogMsg] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [cookies, setCookie] = useCookies(["user"]);

  const navigate = useNavigate();
  const handleSignup = async () => {
    setIsSignupSuccess(false);
    const res = await axios
      .post(URL_USER_SVC, { username, password })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          setErrorDialog("This username already exists");
        } else {
          setErrorDialog("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_CREATED) {
      setSuccessDialog("Account successfully created");
      setIsSignupSuccess(true);
    }
  };

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

  const setSuccessDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Success");
    setDialogMsg(msg);
  };

  const setErrorDialog = (msg) => {
    setIsDialogOpen(true);
    setDialogTitle("Error");
    setDialogMsg(msg);
  };

  return (
    <StandardPage header={<SecondaryNavBar />}>
      <AuthCard
        title={"Sign Up"}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        buttonText={"Create Account"}
        footer={
          <>
            <BodyCopy>
              Have an account?{" "}
              <LinkText text={"Sign in"} link={"/signup"} />
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
    // <Box
    //   display={"flex"}
    //   flexDirection={"column"}
    //   width={"30%"}
    //   padding={"4rem"}
    // >
    //   <Typography variant={"h3"} marginBottom={"2rem"}>
    //     Sign Up
    //   </Typography>
    //   <TextField
    //     label="Username"
    //     variant="standard"
    //     value={username}
    //     onChange={(e) => setUsername(e.target.value)}
    //     sx={{ marginBottom: "1rem" }}
    //     autoFocus
    //   />
    //   <TextField
    //     label="Password"
    //     variant="standard"
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     sx={{ marginBottom: "2rem" }}
    //   />
    //   <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
    //     <Button variant={"outlined"} onClick={handleSignup}>
    //       Create account
    //     </Button>
    //   </Box>
    //   <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
    //     <Typography>
    //       or <Link to={"/login"}> login</Link>
    //     </Typography>
    //   </Box>

    //   <Dialog open={isDialogOpen} onClose={closeDialog}>
    //     <DialogTitle>{dialogTitle}</DialogTitle>
    //     <DialogContent>
    //       <DialogContentText>{dialogMsg}</DialogContentText>
    //     </DialogContent>
    //     <DialogActions>
    //       {isSignupSuccess ? (
    //         <>
    //           <Button onClick={closeDialog}>Cancel</Button>
    //           <Button onClick={handleLogIn}>Log in</Button>
    //         </>
    //       ) : (
    //         <Button onClick={closeDialog}>Done</Button>
    //       )}
    //     </DialogActions>
    //   </Dialog>
    // </Box>
  );
}

export default SignupPage;
