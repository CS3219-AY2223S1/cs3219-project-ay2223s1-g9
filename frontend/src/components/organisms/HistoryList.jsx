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
    <div>
      <div></div>
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
  );
};

export default HistoryList;
