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
import { RoomContext } from "../../contexts/RoomContext";
import BodyCopy from "./BodyCopy";
import styles from "./ProfileDropdown.module.scss";
import AccountIcon from "../../assets/icons/AccountIcon";

const ProfileDropdown = () => {
  const { user, setUser } = useContext(AuthContext);
  const { socket } = useContext(RoomContext);
  const [dropdown, setDropdown] = useState(false);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const navigate = useNavigate();

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (event) => {
    setIsDialogOpen(true);
    setDropdown(false);
    // setAuth(event.target.checked);
  };

  const handleConfirm = () => {
    if (password != "") {
      handleUpdate();
      setPassword("");
      setIsDialogOpen(false);
    }
  };

  const handleUpdate = async () => {
    const res = await axios
      .post(
        API_GATEWAY_URL + API_PATH.USER_UPDATE_PATH,
        { password },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          alert("This username already exists");
        } else {
          alert("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      alert("Password changed");
    }
  };

  const handleDelete = async () => {
    const res = await axios
      .delete(API_GATEWAY_URL + API_PATH.USER_PATH, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          alert("Could not delete user");
        } else {
          alert("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      alert("Delete user successfully");
      navigate("/login");
    }
  };

  const handleLogOut = async () => {
    const res = await axios
      .post(
        API_GATEWAY_URL + API_PATH.LOGOUT_PATH,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          alert(err);
        } else {
          alert("Please try again later");
          console.log("logout error: ", err);
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      removeCookie("username");
      removeCookie("token");
      socket.disconnect();
      alert("Logout successfully");
      navigate("/login");
    }
  };

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        setDropdown(!dropdown);
      }}
    >
      <AccountIcon />
      {user && <BodyCopy text={user.username} />}
      <div
        className={`${styles.dropdown} ${
          dropdown ? "" : styles["dropdown--hidden"]
        }`}
      >
        <div className={styles.dropdown__elem} onClick={handleChange}>
          <BodyCopy text={"Change Password"} />
        </div>
        <div className={styles.dropdown__elem} onClick={handleDelete}>
          <BodyCopy text={"Delete Account"} />
        </div>
        <div className={styles.dropdown__elem} onClick={handleLogOut}>
          <BodyCopy text={"Logout"} />
        </div>
      </div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>{"Update Password"}</DialogTitle>
        <DialogContent>
          <TextField
            label="New password"
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: "2rem" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>CANCEL</Button>
          <Button onClick={handleConfirm}>CONFIRM</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProfileDropdown;
