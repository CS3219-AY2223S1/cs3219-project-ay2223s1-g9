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

const HomePage = () => {
  const handleSelectDifficulty = (event) => {
    alert(event.currentTarget.id);
  };
  return (
    <div
      style={{
        padding: "0 !important",
      }}
    >
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
            id={"easy"}
            variant={"outlined"}
            onClick={handleSelectDifficulty}
          >
            Easy
          </Button>
          <Button
            id={"medium"}
            variant={"outlined"}
            onClick={handleSelectDifficulty}
          >
            Medium
          </Button>
          <Button
            id={"hard"}
            variant={"outlined"}
            onClick={handleSelectDifficulty}
          >
            Hard
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default HomePage;
