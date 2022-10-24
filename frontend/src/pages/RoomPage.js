import { Room } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
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
import { RoomContext } from "../RoomContext";
import { SocketContext } from "../SocketContext";
import CodeEditor from "../components/CodeEditor";

const RoomPage = () => {
  const { user, setUser } = useContext(AuthContext); // contains user.username and user.token
  const { room, setRoom } = useContext(RoomContext);
  const { socket, setSocket } = useContext(SocketContext);
  const [question, setQuestion] = useState({
    title: "",
    data: <p>question data here</p>,
  });
  const navigate = useNavigate();

  useEffect(() => {
    window.onpopstate = (_) => {
      socket.emit("leaveRoom", { roomId: room.roomId });
      navigate("/");
    };
    if (user.username === room.personOne) {
      socket.emit("joinRoom", {
        roomDifficulty: room.difficulty,
        roomId: room.roomId,
      });
    }

    socket.on("question", (questionData) => {
      console.log(questionData);
      setQuestion({
        ...question,
        title: questionData.questionTitle,
        data: questionData.question,
      });
    });
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
          <Typography>{room.roomId}</Typography>
        </Box>
        <Box display={"flex"} flexDirection={"row"}>
          <Typography>Users: </Typography>
          <Typography>{room.personOne + ", " + room.personTwo}</Typography>
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
          <Box>{<Typography>Difficulty: {room.difficulty}</Typography>}</Box>
          <Box flex={1}>
            <Typography
              dangerouslySetInnerHTML={{ __html: question.data }}
            ></Typography>
          </Box>
        </Box>
        <Box
          border={"red 1px solid"}
          padding={"1rem"}
          height={"100%"}
          flex={1}
          sx={{ boxSizing: "border-box" }}
        >
          <CodeEditor socket={socket} roomId={room.roomId} />
        </Box>
      </Box>
    </Box>
  );
};

export default RoomPage;
