import { AuthContext } from "../../AuthContext";
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
  Toolbar,
  AppBar,
  IconButton,
} from "@mui/material";
import { useState, useContext } from "react";
import { API_GATEWAY_URL } from "../../configs";
import { API_PATH } from "../../constants";
import axios from "axios";
import { STATUS_CODE_SUCCESS, STATUS_CODE_BAD_REQUEST } from "../../constants";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import BodyCopy from "../atoms/BodyCopy";
import styles from "./MatchCard.module.scss";
import AccountIcon from "../../assets/icons/AccountIcon";
import PrimaryButton from "../atoms/PrimaryButton";
import SecondaryButton from "../atoms/SecondaryButton";

const MatchCard = ({
  id,
  title,
  content,
  color,
  disable,
  buttonText,
  onClick,
  countdown,
  isMatching,
}) => {
  const { user, setUser } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  return (
    <div className={styles.wrapper}>
      <BodyCopy text={title} bold={"bold"} style={{ margin: 0 }} />
      {isMatching ? (
        countdown
      ) : (
        <BodyCopy text={content} style={{ textAlign: "center", margin: 0 }} />
      )}
      <SecondaryButton
        id={id}
        text={isMatching ? "matching..." : "match now"}
        color={color}
        disable={disable}
        onClick={onClick}
      />
    </div>
  );
};

export default MatchCard;
