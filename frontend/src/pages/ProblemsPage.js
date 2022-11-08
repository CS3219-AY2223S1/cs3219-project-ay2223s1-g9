import { useContext } from "react";
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
import axios from "axios";
import { API_GATEWAY_URL } from "../configs";
import { API_PATH } from "../constants";
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_SUCCESS,
} from "../constants";
import { AuthContext } from "../AuthContext";
import Countdown from "react-countdown";
import NavBar from "../components/NavBar";
import { RoomContext, Pages } from "../contexts/RoomContext";
import { useEffect } from "react";
import { useState } from "react";
import StandardPage from "../components/templates/StandardPage";
import PrimaryNavBar from "../components/molecules/PrimaryNavBar";
import ProfileDropdown from "../components/atoms/ProfileDropdown";
import Heading3 from "../components/atoms/Heading3";
import BodyCopy from "../components/atoms/BodyCopy";
import styles from "./ProblemsPage.module.scss";
import MatchCard from "../components/molecules/MatchCard";

const ProblemsPage = ({ difficulty, setDifficulty }) => {
  const { user, setUser } = useContext(AuthContext);
  const { setRoom, socket, setPage } = useContext(RoomContext);
  const [history, setHistory] = useState([]);
  const [key, setKey] = useState(0);

  const handleTryAgain = () => {
    key == 0 ? setKey(1) : setKey(0);
  };
  const waitTime = 30000;

  const handleSelectDifficulty = (event) => {
    setDifficulty(event.currentTarget.id);
    setPage(Pages.MatchingPage);
  };

  useEffect(() => {
    console.log("token", user.token);
    getHistory();
    // startMatch();
  }, []);

  const getHistory = async () => {
    const res = await axios
      .get(
        // API_GATEWAY_URL + "/api/history",
        "http://localhost:8004" + "/api/history",
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
          console.log("error: ", err);
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      const historyList = res.data.data;
      setHistory(historyList);
    }
  };

  const getQuestion = async (roomId) => {
    const res = await axios
      .get(
        // API_GATEWAY_URL + "/getCollab",
        "http://localhost:8003" + "/getCollab",
        { params: { roomId: roomId } },
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
          console.log("error: ", err);
        }
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      const historyList = res.data;
      // setHistory(historyList);

      console.log("HII", historyList);
      // console.log(history[0]);
    }
  };
  const Completionist = () => (
    <span>
      <Box>
        <Typography>No match found</Typography>
      </Box>
      <Box width={"100%"} display={"flex"} justifyContent={"space-between"}>
        <Button onClick={handleTryAgain}>Try Again</Button>
        <Button onClick={() => setPage(Pages.HomePage)}>Return</Button>
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
        </span>
      );
    }
  };

  const startMatch = () => {
    socket.emit(
      "match",
      {
        username: user.username,
        roomDifficulty: difficulty,
      },
      (error) => {
        console.log(error);
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
  };
  return (
    // <StandardPage
    //   header={<PrimaryNavBar />}
    //   contentStyle={{ alignItems: "flex-start" }}
    // >
    //   <div className={styles.matching__div}>
    //     <Heading3 text={"Problem Matching"} style={{ textAlign: "center" }} />
    //     <BodyCopy style={{ textAlign: "center" }}>
    //       Select your difficulty level and we will match you with someone of the
    //       same chosen level and assign a random question of that difficulty.
    //     </BodyCopy>
    //     <div className={styles.matching__cards}>
    //       <MatchCard
    //         id={"Easy"}
    //         title={"EASY"}
    //         content={"Takes 20–30 minutes to solve"}
    //         color={"green"}
    //         buttonText={"Match Now"}
    //         disable={false}
    //         onClick={handleSelectDifficulty}
    //         isMatching={false}
    //         // countdown={
    //         //   <Countdown
    //         //     date={Date.now() + waitTime}
    //         //     key={key}
    //         //     intervalDelay={0}
    //         //     precision={2}
    //         //     renderer={renderer}
    //         //   />
    //         // }
    //       />
    //       <MatchCard
    //         id={"Medium"}
    //         title={"MEDIUM"}
    //         content={"Takes 30–40 minutes to solve"}
    //         color={"yellow"}
    //         disable={false}
    //         onClick={handleSelectDifficulty}
    //         isMatching={false}
    //         // countdown={
    //         //   <Countdown
    //         //     date={Date.now() + waitTime}
    //         //     key={key}
    //         //     intervalDelay={0}
    //         //     precision={2}
    //         //     renderer={renderer}
    //         //   />
    //         // }
    //       />
    //       <MatchCard
    //         id={"Hard"}
    //         title={"HARD"}
    //         content={"Takes 40-50 minutes to solve"}
    //         color={"red"}
    //         buttonText={"Match Now"}
    //         disable={false}
    //         onClick={handleSelectDifficulty}
    //         isMatching={false}
    //         // countdown={
    //         //   <Countdown
    //         //     date={Date.now() + waitTime}
    //         //     key={key}
    //         //     intervalDelay={0}
    //         //     precision={2}
    //         //     renderer={renderer}
    //         //   />
    //         // }
    //       />
    //     </div>
    //   </div>
    //  </StandardPage>
    <>
      <NavBar />
      <Box
        display={"flex"}
        flexDirection={"column"}
        height={"100%"}
        padding={"4rem"}
        justifyContent={"center"}
      >
        <Typography variant={"h6"} marginBottom={"10px"}>
          Start coding!
        </Typography>
        <Typography>Select a difficulty level</Typography>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
          justifyContent={"flex-end"}
        >
          <Button
            id={"Easy"}
            variant={"outlined"}
            onClick={handleSelectDifficulty}
          >
            Easy
          </Button>
          <Button
            id={"Medium"}
            variant={"outlined"}
            onClick={handleSelectDifficulty}
          >
            Medium
          </Button>
          <Button
            id={"Hard"}
            variant={"outlined"}
            onClick={handleSelectDifficulty}
          >
            Hard
          </Button>
        </Box>
        <Box>
          <Button onClick={getHistory}>hi</Button>
          <Button
            onClick={() => {
              getQuestion("cfe8050-7910-40fe-b9e7-e6c40951f393");
            }}
          >
            bye
          </Button>
          {history && history[0] && (
            <Box>
              {history[0].createdAt}
              {history[0].question_title}
              {history[0].roomId}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ProblemsPage;
