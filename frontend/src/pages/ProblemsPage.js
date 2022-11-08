import { useContext, useEffect, useState } from "react";
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
import StandardPage from "../components/templates/StandardPage";
import PrimaryNavBar from "../components/molecules/PrimaryNavBar";
import Heading3 from "../components/atoms/Heading3";
import BodyCopy from "../components/atoms/BodyCopy";
import styles from "./ProblemsPage.module.scss";
import MatchCard from "../components/molecules/MatchCard";
import userEvent from "@testing-library/user-event";

const ProblemsPage = ({ setDifficulty, user }) => {
  const { setPage } = useContext(RoomContext);
  // const { user, setUser } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState("");
  console.log(history);
  const handleSelectDifficulty = (event) => {
    setDifficulty(event.currentTarget.id);
    setPage(Pages.MatchingPage);
  };

  useEffect(() => {
    //  console.log("token", user.token);
    getHistory();
    // startMatch();
  }, []);

  const getHistory = async () => {
    console.log("attempting to get history");
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
      console.log("hist", historyList);
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
      const data = res.data;
      setQuestion(data);

      console.log("HII", data);
    }
  };

  return (
    <StandardPage
      header={<PrimaryNavBar />}
      contentStyle={{ alignItems: "flex-start", flexDirection: "column" }}
    >
      <div className={styles.matching__div}>
        <Heading3 text={"Problem Matching"} style={{ textAlign: "center" }} />
        <BodyCopy style={{ textAlign: "center" }}>
          Select your difficulty level and we will match you with someone of the
          same chosen level and assign a random question of that difficulty.
        </BodyCopy>
        <div className={styles.matching__cards}>
          <MatchCard
            id={"Easy"}
            title={"EASY"}
            content={"Takes 20–30 minutes to solve"}
            color={"green"}
            buttonText={"Match Now"}
            disable={false}
            onClick={handleSelectDifficulty}
            isMatching={false}
          />
          <MatchCard
            id={"Medium"}
            title={"MEDIUM"}
            content={"Takes 30–40 minutes to solve"}
            color={"yellow"}
            disable={false}
            onClick={handleSelectDifficulty}
            isMatching={false}
          />
          <MatchCard
            id={"Hard"}
            title={"HARD"}
            content={"Takes 40-50 minutes to solve"}
            color={"red"}
            buttonText={"Match Now"}
            disable={false}
            onClick={handleSelectDifficulty}
            isMatching={false}
          />
        </div>
      </div>
      <div className={styles.pastAttempts__div}>
        <Heading3 text={"Past Attempts"} style={{ textAlign: "center" }} />
        <div>
          {history.map((question) => (
            <div
              style={{ color: "white", border: "white solid 1px" }}
              onClick={() => getQuestion(question.roomId)}
            >
              {question.createdAt}
              {question.question_title}
              {/* {question.roomId} */}
            </div>
          ))}
        </div>
        {/* {question ? question : ""} */}
      </div>
    </StandardPage>
  );
};

export default ProblemsPage;
