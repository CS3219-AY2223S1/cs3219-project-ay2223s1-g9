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

const ProblemsPage = ({ setDifficulty }) => {
  const { setPage } = useContext(RoomContext);
  const { user, setUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);

  const handleSelectDifficulty = (event) => {
    setDifficulty(event.currentTarget.id);
    setPage(Pages.MatchingPage);
  };

  useEffect(() => {
    console.log("token", user.token);
    getHistory();
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

  return (
    <StandardPage
      header={<PrimaryNavBar />}
      contentStyle={{ alignItems: "flex-start" }}
    >
      <div className={styles.matching__div}>
        <Heading3 text={"Problem Matching"} style={{ textAlign: "center" }} />
        <BodyCopy style={{ textAlign: "center" }}>
          Select your difficulty level and we will match you with someone of the
          same chosen level and assign a random question of that difficulty.
        </BodyCopy>
        <div>
          <MatchCard
            title={"EASY"}
            content={"Takes 20–30 minutes to solve"}
            color={"green"}
            buttonText={"Match Now"}
            disable={false}
          />
        </div>
      </div>

      {/* <NavBar />
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
      </Box> */}
    </StandardPage>
  );
};

export default ProblemsPage;
