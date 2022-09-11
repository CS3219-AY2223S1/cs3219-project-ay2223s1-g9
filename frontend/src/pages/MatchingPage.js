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
import { useState } from "react";
import Countdown from "react-countdown";

const MatchingPage = ({ setIsMatching, difficulty, setDifficulty }) => {
  const waitTime = 5000;
  const [key, setKey] = useState(0);

  const navigate = useNavigate();
  const handleReturn = () => {
    setIsMatching(false);
  };
  const handleTryAgain = () => {
    key == 0 ? setKey(1) : setKey(0);
  };

  useEffect(() => {
    // this function runs whenever the timer reloads
    // set this place to be where the matching thing reloads
    const matchFound = false;
    if (matchFound) {
      navigate("/room");
    }
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
