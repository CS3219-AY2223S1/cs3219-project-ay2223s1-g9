import { useState, useContext } from "react";

import { PageContext, Pages } from "../contexts/PageContext";
import { RoomProvider } from "../contexts/RoomProvider";
import MatchingPage from "./MatchingPage";
import HomePage from "./HomePage";
import RoomPage from "./RoomPage";

export const NavigationPage = () => {
  const { page } = useContext(PageContext);
  const [difficulty, setDifficulty] = useState("");

  return (
    <RoomProvider>
      {page === Pages.HomePage && (
        <HomePage difficulty={difficulty} setDifficulty={setDifficulty} />
      )}
      {page === Pages.MatchingPage && <MatchingPage difficulty={difficulty} />}
      {page === Pages.RoomPage && <RoomPage />}
    </RoomProvider>
  );
};
