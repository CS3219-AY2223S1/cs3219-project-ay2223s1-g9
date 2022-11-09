import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StandardPage from "../components/templates/StandardPage";
import BodyCopyLarge from "../components/atoms/BodyCopyLarge";
import SecondaryNavBar from "../components/molecules/SecondaryNavBar";
import styles from "./HomePage.module.scss";
import Heading2 from "../components/atoms/Heading2";
import PrimaryButton from "../components/atoms/PrimaryButton";

const HomePage = () => {
  const [isMatching, setIsMatching] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const handleSelectDifficulty = (event) => {
    setIsMatching(true);
    setDifficulty(event.currentTarget.id);
  };

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
            <PrimaryButton
              text={"start now"}
              onClick={() => {
                navigate("/login");
              }}
            />
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
