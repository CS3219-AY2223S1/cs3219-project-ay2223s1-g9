import { createContext } from "react";

const RoomContext = createContext();
const Pages = {
  HomePage: "homepage",
  MatchingPage: "matchingPage",
  RoomPage: "roomPage",
};

export { RoomContext, Pages };
