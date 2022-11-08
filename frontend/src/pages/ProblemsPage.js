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
import HistoryList from "../components/organisms/HistoryList";
import BodyCopyLarge from "../components/atoms/BodyCopyLarge";
import Heading4 from "../components/atoms/Heading4";

const ProblemsPage = ({ setDifficulty, user }) => {
  const { setPage } = useContext(RoomContext);
  // const { user, setUser } = useContext(AuthContext);
  const [history, setHistory] = useState([{}]);
  const [question, setQuestion] = useState("");
  const [stats, setStats] = useState();
  const [donut, setDonut] = useState();
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

  useEffect(() => {
    let total = history.length;
    let easy = 0;
    let med = 0;
    let hard = 0;
    history.map((item) => {
      if (item.roomDifficulty == "Easy") {
        easy++;
      } else if (item.roomDifficulty == "Medium") {
        med++;
      } else {
        hard++;
      }
    });
    setStats({ easy: easy, med: med, hard: hard, total: total });
    setDonut({
      easy: (easy / total) * 360,
      med: (med / total) * 360,
      hard: (hard / total) * 360,
    });
  }, [history]);

  const getHistory = async () => {
    console.log("attempting to get history");
    const res = await axios
      .get(
        API_GATEWAY_URL + "/api/history",
        //"http://localhost:8004" + "/api/history",
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
        <div className={styles.pastAttempts__content}>
          <div className={styles.pastAttempts__history}>
            <HistoryList history={history} user={user} />
          </div>
          {stats && (
            <div className={styles.pastAttempts__stats}>
              <div
                className={styles.pastAttempts__donut}
                style={{
                  background: `conic-gradient( #15c79c 0deg ${donut.easy}deg
              , #f4dc87 ${donut.easy}deg ${
                    donut.easy + donut.med
                  }deg, #fd6584 ${donut.med}deg 360deg`,
                }}
              >
                <div className={styles.pastAttempts__hole}>
                  <Heading4 text={stats.total} style={{ margin: 0 }} />
                  <div className={styles.pastAttempts__text}>
                    <BodyCopy
                      text={"problems attempted"}
                      style={{ textAlign: "center", margin: 0 }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.pastAttempts__legend}>
                <div className={styles.pastAttempts__group}>
                  <div
                    className={`${styles.pastAttempts__circle} ${styles.pastAttempts__easy}`}
                  ></div>
                  <BodyCopy text={stats.easy} />
                </div>
                <div className={styles.pastAttempts__group}>
                  <div
                    className={`${styles.pastAttempts__circle} ${styles.pastAttempts__med}`}
                  ></div>
                  <BodyCopy text={stats.med} />
                </div>
                <div className={styles.pastAttempts__group}>
                  <div
                    className={`${styles.pastAttempts__circle} ${styles.pastAttempts__hard}`}
                  ></div>
                  <BodyCopy text={stats.hard} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </StandardPage>
  );
};

export default ProblemsPage;
