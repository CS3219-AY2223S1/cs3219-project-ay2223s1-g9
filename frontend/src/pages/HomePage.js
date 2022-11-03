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
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MatchingPage from "./MatchingPage";
import StandardPage from "../components/templates/StandardPage";
import BodyCopyLarge from "../components/atoms/BodyCopyLarge";
import SecondaryNavBar from "../components/molecules/SecondaryNavBar";
import styles from "./HomePage.module.scss";
import Heading2 from "../components/atoms/Heading2";
import PrimaryButton from "../components/atoms/PrimaryButton";

const HomePage = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const handleSelectDifficulty = (event) => {
    setIsMatching(true);
    setDifficulty(event.currentTarget.id);
  };
  useEffect(() => {
    console.log(isMatching);
  }, [isMatching]);

  return (
    <StandardPage header={<SecondaryNavBar />}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <Heading2>Collaborative problem solving </Heading2>
          <BodyCopyLarge>
            PEERPREP lets you practice solving popular technical interview
            questions with your peers in real-time using a collaborative code
            editor.
          </BodyCopyLarge>
          <div className={styles.content__button}>
            <PrimaryButton text={"start now"} />
          </div>
        </div>
        <div className={styles.image}>
          <img
            src={require("../assets/images/collab.png")}
            width="493"
            height="323"
          />
        </div>
      </div>
    </StandardPage>
  );
};

export default HomePage;
