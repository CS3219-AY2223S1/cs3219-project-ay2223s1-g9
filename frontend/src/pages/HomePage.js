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
import { PageContext, Pages } from "../contexts/PageContext";

const HomePage = ({ setDifficulty }) => {
  const { setPage } = useContext(PageContext);

  const handleSelectDifficulty = (event) => {
    setDifficulty(event.currentTarget.id);
    setPage(Pages.MatchingPage);
  };

  return (
    <>
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
    </>
  );
};

export default HomePage;
