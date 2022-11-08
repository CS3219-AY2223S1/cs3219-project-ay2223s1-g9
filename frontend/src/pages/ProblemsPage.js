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

import NavBar from "../components/NavBar";
import { RoomContext, Pages } from "../contexts/RoomContext";
import StandardPage from "../components/templates/StandardPage";
import PrimaryNavBar from "../components/molecules/PrimaryNavBar";
import Heading3 from "../components/atoms/Heading3";
import BodyCopy from "../components/atoms/BodyCopy";
import styles from "./ProblemsPage.module.scss";
import MatchCard from "../components/molecules/MatchCard";

const ProblemsPage = ({ setDifficulty }) => {
  const { setPage } = useContext(RoomContext);

  const handleSelectDifficulty = (event) => {
    console.log("WATS THE ID", event.currentTarget.id);
    setDifficulty(event.currentTarget.id);
    setPage(Pages.MatchingPage);
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
            // countdown={
            //   <Countdown
            //     date={Date.now() + waitTime}
            //     key={key}
            //     intervalDelay={0}
            //     precision={2}
            //     renderer={renderer}
            //   />
            // }
          />
          <MatchCard
            id={"Medium"}
            title={"MEDIUM"}
            content={"Takes 30–40 minutes to solve"}
            color={"yellow"}
            disable={false}
            onClick={handleSelectDifficulty}
            isMatching={false}
            // countdown={
            //   <Countdown
            //     date={Date.now() + waitTime}
            //     key={key}
            //     intervalDelay={0}
            //     precision={2}
            //     renderer={renderer}
            //   />
            // }
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
            // countdown={
            //   <Countdown
            //     date={Date.now() + waitTime}
            //     key={key}
            //     intervalDelay={0}
            //     precision={2}
            //     renderer={renderer}
            //   />
            // }
          />
        </div>
      </div>
    </StandardPage>
  );
};

export default ProblemsPage;
