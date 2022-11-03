import { useState, useContext } from "react";

import { PageContext } from "../contexts/PageContext";
import { RoomProvider } from "../contexts/RoomProvider";
import MatchingPage from "./MatchingPage";
import HomePage from "./HomePage";
import RoomPage from "./RoomPage";

export const NavigationPage = () => {
  const { page } = useContext(PageContext);
  const [difficulty, setDifficulty] = useState("");

  return (
    <RoomProvider>
      {page === 0 && (
        <HomePage difficulty={difficulty} setDifficulty={setDifficulty} />
      )}
      {page === 1 && <MatchingPage difficulty={difficulty} />}
      {page === 2 && <RoomPage />}
    </RoomProvider>
  );
};
