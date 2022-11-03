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

const LoginCard = ({ username, setUsername }) => {
  return (
    <div className={styles.wrapper}>
      <Heading4 text={"Login"} />
      <form className={styles.form}>
        <input className={styles.field} type="text" placeholder="Username" />
        <input
          className={styles.field}
          type="password"
          placeholder="Password"
        />
        <PrimaryButton text={"login"} />
      </form>

      <BodyCopy>
        Need an account? <LinkText>Sign up</LinkText>
      </BodyCopy>
    </div>
  );
};

export default LoginCard;
