import { createContext } from "react";
const PageContext = createContext();

const Pages = {
  HomePage: "homepage",
  MatchingPage: "matchingPage",
  RoomPage: "roomPage",
};

export { PageContext, Pages };
