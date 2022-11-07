import { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";

import { RoomContext, Pages } from "../contexts/RoomContext";
import MatchingPage from "./MatchingPage";
import ProblemsPage from "./ProblemsPage";
import RoomPage from "./RoomPage";

export const NavigationPage = () => {
  const { page, initializeSocket } = useContext(RoomContext);
  const [cookies] = useCookies(["user"]);
  const [difficulty, setDifficulty] = useState("");
  const [isSettingUp, setIsSettingUp] = useState(true);

  useEffect(() => {
    if (isSettingUp) {
      setIsSettingUp(false);
      initializeSocket(cookies.token);
    }
  }, []);

  return (
    <>
      {page === Pages.ProblemsPage && (
        <ProblemsPage difficulty={difficulty} setDifficulty={setDifficulty} />
      )}
      {page === Pages.MatchingPage && <MatchingPage difficulty={difficulty} />}
      {page === Pages.RoomPage && <RoomPage />}
    </>
  );
};
