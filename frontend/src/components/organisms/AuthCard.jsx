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

const AuthCard = ({
  title = "Login",
  username = "",
  setUsername,
  password = "",
  setPassword,
  buttonText = "",
  footer = "",
  handleSubmit,
}) => {
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    html.addEventListener("click", function (e) {
      const usernameField = document.querySelector("#usernameField");
      const passwordField = document.querySelector("#passwordField");

      if (e.target !== usernameField) {
        setUsernameFocus(false);
      }
      if (e.target !== passwordField) {
        setPasswordFocus(false);
      }
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <Heading4 text={title} />
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

        <div className={styles.field__wrapper}>
          <input
            className={styles.field__input}
            type="password"
            //placeholder="Password"
            value={password}
            id={"passwordField"}
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => {
              setPasswordFocus("hello");
            }}
          />
          <div
            className={`${styles["field__label"]} ${
              passwordFocus || password !== ""
                ? styles["field__label--focus"]
                : ""
            }`}
          >
            Password
          </div>
        </div>
        <PrimaryButton text={buttonText} onClick={handleSubmit} />
      </form>
      {footer}
    </div>
  );
};

export default AuthCard;
