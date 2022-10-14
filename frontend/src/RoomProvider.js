import { useState } from "react";
import { RoomContext } from "./RoomContext";

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({
    personOne: "",
    personTwo: "",
    roomId: "",
    difficulty: "",
  });

  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
