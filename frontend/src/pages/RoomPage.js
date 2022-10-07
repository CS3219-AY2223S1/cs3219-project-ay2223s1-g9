import { Room } from "@mui/icons-material";
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
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import CodeEditor from "../components/CodeEditor";

const RoomPage = () => {
  const { user, setUser } = useContext(AuthContext); // contains user.username and user.token
  const [question, setQuestion] = useState({
    data: <p>question data here</p>,
    difficulty: "harderest",
  });
  const [room, setRoom] = useState({ id: "1", users: "andey, bobhao" });
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`); //<---------- CODE FOR COLLAB SET HEREE

  useEffect(() => {
    const currentUser = localStorage.getItem("user");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
      padding={"1rem"}
      justifyContent={"center"}
      border={"blue 1px solid"}
      sx={{ boxSizing: "border-box" }}
    >
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
      >
        <Box display={"flex"} flexDirection={"row"}>
          <Typography>Room: </Typography>
          <Typography>{room.id}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography>Users: </Typography>
          <Typography>{room.users}</Typography>
        </Box>
      </Box>
      <Box display={"flex"} flexDirection={"row"} flex={1}>
        <Box
          border={"red 1px solid"}
          height={"100%"}
          flex={1}
          display={"flex"}
          flexDirection={"column"}
          padding={"1rem"}
          sx={{ boxSizing: "border-box" }}
          gap={"0.5rem"}
        >
          <Box>
            {<Typography>Difficulty: {question.difficulty}</Typography>}
          </Box>
          <Box flex={1}>
            <Typography>{question.data}</Typography>
          </Box>
        </Box>
        <Box
          border={"red 1px solid"}
          padding={"1rem"}
          height={"100%"}
          flex={1}
          sx={{ boxSizing: "border-box" }}
        >
          <CodeEditor code={code} setCode={setCode} />
        </Box>
      </Box>
    </Box>
  );
};

export default RoomPage;
