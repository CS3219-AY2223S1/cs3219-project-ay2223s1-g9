import Heading4 from "../atoms/Heading4";
import LinkText from "../atoms/LinkText";
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
import styles from "./AuthCard.module.scss";
import BodyCopy from "../atoms/BodyCopy";
import PrimaryButton from "../atoms/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";

const LoginCard = ({
  username = "",
  setUsername,
  password,
  setPassword,
  handleSubmit,
}) => {
  const [usernameFocus, setUsernameFocus] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.addEventListener("click", function (e) {
      const btn = document.querySelector("#usernameField");
      if (e.target !== btn) {
        setUsernameFocus(false);
      }
    });
  }, []);

  useEffect(() => {
    console.log(username);
    console.log(username !== "");
  }, [username]);

  return (
    <div className={styles.wrapper}>
      <Heading4 text={"Login"} />
      <form className={styles.form}>
        <div className={styles.field__wrapper}>
          <input
            className={styles.field__input}
            type="text"
            //placeholder="Username"
            value={username}
            id={"usernameField"}
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => setUsernameFocus(true)}
          />
          <div
            className={`${styles["field__label"]} ${
              usernameFocus || username !== ""
                ? styles["field__label--focus"]
                : ""
            }`}
          >
            Username
          </div>
        </div>

        <input
          className={styles.field}
          type="password"
          //placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton text={"login"} onClick={handleSubmit} />
      </form>

      <BodyCopy>
        Need an account? <LinkText>Sign up</LinkText>
      </BodyCopy>
    </div>
  );
};

export default LoginCard;
