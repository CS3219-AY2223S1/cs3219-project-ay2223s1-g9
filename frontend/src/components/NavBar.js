import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
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
import { MdAccountCircle } from "react-icons/md";
import { useState, useContext } from "react";
import { URL_USER_SVC, URI_USER_SVC } from "../configs";
import axios from "axios";
import { AuthContext } from "../AuthContext";
import { STATUS_CODE_SUCCESS, STATUS_CODE_BAD_REQUEST } from "../constants";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  //const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleChange = (event) => {
    setIsDialogOpen(true);
    // setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        URL_USER_SVC + "/update",
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
      alert("pw changed");
    }
  };

  const handleDelete = async () => {
    const res = await axios
      .delete(URL_USER_SVC, {
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
      .post(URI_USER_SVC + "/logout", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .catch((err) => {
        if (err.response.status === STATUS_CODE_BAD_REQUEST) {
          alert(err);
        } else {
          alert("Please try again later");
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      const jwt = res.data; //store jwt, change as needed
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            peerPrep
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {user && (
                <Typography marginRight={"5px"}>{user.username}</Typography>
              )}

              <MdAccountCircle />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleChange}>Change password</MenuItem>
              <MenuItem onClick={handleDelete}>Delete account</MenuItem>
              <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
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
    </Box>
  );
}
