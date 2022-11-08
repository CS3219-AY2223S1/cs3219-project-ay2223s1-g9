import Heading4 from "../atoms/Heading4";
import LinkText from "../atoms/LinkText";
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
import styles from "./HistoryList.module.scss";
import BodyCopy from "../atoms/BodyCopy";
import PrimaryButton from "../atoms/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";

const HistoryList = ({ history, getQuestion }) => {
  return (
    <>
      <div className={styles.history__wrapper}>
        <div className={`${styles.history__item} ${styles.history__title}`}>
          <div
            className={`${styles.history__itemColumn} ${styles["history__itemColumn--title"]}`}
          >
            <BodyCopy text={"Problems"} />
          </div>
          <div
            className={`${styles.history__itemColumn} ${styles["history__itemColumn--difficulty"]}`}
          >
            <BodyCopy text={"Difficulty"} />
          </div>
          <div
            className={`${styles.history__itemColumn} ${styles["history__itemColumn--date"]}`}
          >
            <BodyCopy text={"Date"} />
          </div>
        </div>
        <div className={styles.history__list}>
          {history.map((question, index) => (
            <div
              className={`${styles[`history__item`]} ${
                styles[`history__item--${index % 2 ? "even" : ""}`]
              }`}
              onClick={() => getQuestion(question.roomId)}
            >
              <div
                className={`${styles.history__itemColumn} ${styles["history__itemColumn--title"]}`}
              >
                <BodyCopy text={question.question_title} />
              </div>
              <div
                className={`${styles.history__itemColumn} ${
                  styles["history__itemColumn--difficulty"]
                } ${
                  styles[
                    `history__itemColumn--difficulty${question.roomDifficulty}`
                  ]
                }`}
              >
                <BodyCopy
                  text={question.roomDifficulty}
                  color={
                    question.roomDifficulty == "Easy"
                      ? "green"
                      : question.roomDifficulty == "Medium"
                      ? "yellow"
                      : question.roomDifficulty == "Hard"
                      ? "red"
                      : ""
                  }
                />
              </div>
              <div
                className={`${styles.history__itemColumn} ${styles["history__itemColumn--date"]}`}
              >
                <BodyCopy text={question.createdAt} />
              </div>

              {/* {question.roomId} */}
            </div>
          ))}
        </div>

        {/* {question ? question : ""} */}
      </div>
    </>
  );
};

export default HistoryList;
