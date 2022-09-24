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
import { useContext } from "react";
import { AuthContext } from "../AuthContext";

const RoomPage = () => {
  const { user } = useContext(AuthContext); // contains user.username and user.token
  console.log(user);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100%"}
      padding={"4rem"}
      justifyContent={"center"}
    >
      <Typography>room?</Typography>
      <Typography>user: {user.username ? user.username : ""}</Typography>
    </Box>
  );
};

export default RoomPage;
