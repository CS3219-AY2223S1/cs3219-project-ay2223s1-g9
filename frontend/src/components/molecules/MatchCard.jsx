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

const MatchCard = ({ title, content, color, disable, buttonText }) => {
  const { user, setUser } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  return (
    <div className={styles.wrapper}>
      <BodyCopy text={title} bold={"bold"} />
      <BodyCopy text={content} style={{ textAlign: "center" }} />
      <SecondaryButton text={buttonText} color={color} disable={disable} />
    </div>
  );
};

export default MatchCard;
