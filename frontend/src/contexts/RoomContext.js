import { createContext } from "react";

const RoomContext = createContext();
const Pages = {
  ProblemsPage: "problemsPage",
  MatchingPage: "matchingPage",
  RoomPage: "roomPage",
};

export { RoomContext, Pages };
