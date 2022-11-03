import { useState, useContext } from "react";

import { RoomContext, Pages } from "../contexts/RoomContext";
import MatchingPage from "./MatchingPage";
import HomePage from "./HomePage";
import RoomPage from "./RoomPage";

export const NavigationPage = () => {
  const { page } = useContext(RoomContext);
  const [difficulty, setDifficulty] = useState("");
  console.log(page);
  return (
    <>
      {page === Pages.HomePage && (
        <HomePage difficulty={difficulty} setDifficulty={setDifficulty} />
      )}
      {page === Pages.MatchingPage && <MatchingPage difficulty={difficulty} />}
      {page === Pages.RoomPage && <RoomPage />}
    </>
  );
};
