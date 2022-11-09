import { useState, useContext, useEffect } from "react";
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
import Countdown from "react-countdown";

import { AuthContext } from "../AuthContext";
import { RoomContext, Pages } from "../contexts/RoomContext";
import BodyCopyLarge from "../components/atoms/BodyCopyLarge";
import BodyCopy from "../components/atoms/BodyCopy";
import LinkText from "../components/atoms/LinkText";

const MatchingPage = ({ difficulty }) => {
  const { user, setUser } = useContext(AuthContext); // contains user.username and user.token
  const { setRoom, socket, setPage } = useContext(RoomContext);
  const waitTime = 30000;
  const [key, setKey] = useState(0);

  const handleTryAgain = () => {
    key == 0 ? setKey(1) : setKey(0);
  };

  useEffect(() => {
    socket.emit(
      "match",
      {
        username: user.username,
        roomDifficulty: difficulty,
      },
      (error) => {
        console.log("error", error);
      }
    );

    socket.on("matchSuccess", (matchRoom) => {
      setRoom({
        personOne: matchRoom.personOneUsername,
        personTwo: matchRoom.personTwoUsername,
        roomId: matchRoom.roomId + "",
        difficulty: matchRoom.roomDifficulty,
      });
      setPage(Pages.RoomPage);
    });
  }, [key]);

  const Completionist = () => (
    <span>
      <Box>
        <BodyCopyLarge text={"No match found"} />
      </Box>
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        marginTop={"30px"}
      >
        <LinkText onClick={() => setPage(Pages.ProblemsPage)} text={"Return"} />
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
        <Box
          width={"60%"}
          display={"flex"}
          alignItems={"center"}
          flexDirection={"column"}
        >
          <BodyCopyLarge text={"Finding you a match..."} />

          <Box
            width={"100%"}
            height={"30px"}
            border={"solid 1px white"}
            position={"relative"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            marginBottom={"40px"}
            marginTop={"40px"}
          >
            <BodyCopy style={{ zIndex: 2 }}>{props.seconds} seconds</BodyCopy>

            <Box
              width={`${((waitTime - props.total) / waitTime) * 100}%`}
              height={"30px"}
              backgroundColor={
                difficulty == "Easy"
                  ? "#15c79c"
                  : difficulty == "Medium"
                  ? "#f4dc87"
                  : "#fd6584"
              }
              position={"absolute"}
              left={0}
            ></Box>
          </Box>
        </Box>
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
      backgroundColor={"black"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
        height={"100%"}
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
