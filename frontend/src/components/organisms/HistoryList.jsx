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
import BodyCopyLarge from "../atoms/BodyCopyLarge";
import PrimaryButton from "../atoms/PrimaryButton";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { API_GATEWAY_URL } from "../../configs";
import {
  STATUS_CODE_CONFLICT,
  STATUS_CODE_CREATED,
  STATUS_CODE_BAD_REQUEST,
  STATUS_CODE_SUCCESS,
} from "../../constants";
const HistoryList = ({ history, user }) => {
  const [selected, setSelected] = useState();
  const [question, setQuestion] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id, roomId) => {
    console.log("IDDD", id);
    setSelected(id);
    getQuestion(roomId);
    setIsOpen(!isOpen);
  };

  const getQuestion = async (roomId) => {
    const res = await axios
      .get(
        API_GATEWAY_URL + "/getCollab",
        //"http://localhost:8003" + "/getCollab",
        {
          params: { roomId: roomId },

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
            <div className={`${styles[`history__itemWrapper`]}`}>
              <div
                className={`${styles[`history__item`]} ${
                  styles[`history__item--${index % 2 ? "even" : ""}`]
                }`}
                onClick={() => handleSelect(question._id, question.roomId)}
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
              </div>

              {question && selected == question._id && isOpen && (
                <div className={styles.question__wrapper}>
                  hello
                  <BodyCopyLarge>{question.title}</BodyCopyLarge>
                  <div
                    className={styles.question__data}
                    dangerouslySetInnerHTML={{ __html: question.question }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <BodyCopy>
          ew{selected} {question.id}
        </BodyCopy>
      </div>
    </>
  );
};

export default HistoryList;
