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

const ProblemsPage = () => {
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
    <div>
      {!isMatching && (
        <div>
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
          </Box>
        </div>
      )}
      {isMatching && (
        <MatchingPage
          setIsMatching={setIsMatching}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      )}
    </div>
  );
};

export default ProblemsPage;
