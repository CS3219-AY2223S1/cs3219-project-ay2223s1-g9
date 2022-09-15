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
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState, useContext } from "react";
import Countdown from "react-countdown";
import io from "socket.io-client";
import { AuthContext } from "../AuthContext";

const MatchingPage = ({ setIsMatching, difficulty, setDifficulty }) => {
  const { user } = useContext(AuthContext); // contains user.username and user.token
  const waitTime = 30000;
  const SOCKET_ROUTE = "http://localhost:8001";
  const [key, setKey] = useState(0);

  const navigate = useNavigate();
  const handleReturn = () => {
    setIsMatching(false);
  };
  const handleTryAgain = () => {
    key == 0 ? setKey(1) : setKey(0);
  };

  useEffect(() => {
    const socket = io(SOCKET_ROUTE);
    socket.emit(
      "match",
      { username: user.username, roomDifficulty: difficulty },
      (error) => {
        console.log(error);
      }
    );

    socket.on("matchSuccess", (matchRoom) => {
      console.log(matchRoom);
      /*
      matchRoom object for reference.
      {
        _id: new ObjectId("63209dcde3bd1a4c9964874b"),
        personOneUsername: 'Jerry',
        personTwoUsername: 'Jerry',
        roomId: 'iIe6WLDWULeb7tT6AAAB',
        isRoomAvailable: false,
        roomDifficulty: 'easy',
        __v: 0
      }
      */
      socket.disconnect();
      navigate("/room");
    });

    socket.on("matchUnsuccess", () => {
      socket.disconnect();
    });
  }, [key]);

  const Completionist = () => (
    <span>
      <Box>
        <Typography>No match found</Typography>
      </Box>
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Button onClick={handleTryAgain}>Try Again</Button>
        <Button onClick={handleReturn}>Return</Button>
      </Box>
    </span>
  );

  const renderer = (props /*hours, minutes, seconds, completed*/) => {
    if (props.completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          <Typography variant={"h6"} marginBottom={"20px"}>
            Finding you a match...
          </Typography>

          <Box
            width={"100%"}
            height={"30px"}
            border={"solid 1px #1976D2"}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={"40px"}
          >
            <Typography zIndex={2}>{props.seconds} seconds</Typography>
            <Box
              width={`${((waitTime - props.total) / waitTime) * 100}%`}
              height={"30px"}
              backgroundColor={"#1976D2"}
              position={"absolute"}
              left={0}
            ></Box>
          </Box>
          <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
            <Button onClick={handleReturn}>Cancel</Button>
          </Box>
        </span>
      );
    }
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      height={"100vh"}
      width={"100%"}
      padding={"8rem"}
      justifyContent={"center"}
      sx={{ boxSizing: "border-box" }}
    >
      <Box
        backgroundColor={"#1976D220"}
        padding={"1rem 2rem"}
        borderRadius={"5px"}
      >
        <Countdown
          date={Date.now() + waitTime}
          key={key}
          intervalDelay={0}
          precision={2}
          renderer={renderer}
        />
      </Box>
    </Box>
  );
};

export default MatchingPage;
