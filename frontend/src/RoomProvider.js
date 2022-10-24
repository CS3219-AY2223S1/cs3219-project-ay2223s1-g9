import { useState } from "react";
import { RoomContext } from "./RoomContext";

import io from "socket.io-client";

const SOCKET_ROUTE = "http://localhost:8010";
const socket = io(SOCKET_ROUTE);

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({
    personOne: "",
    personTwo: "",
    roomId: "",
    difficulty: "",
  });

  return (
    <RoomContext.Provider value={{ room, setRoom, socket }}>
      {children}
    </RoomContext.Provider>
  );
};
