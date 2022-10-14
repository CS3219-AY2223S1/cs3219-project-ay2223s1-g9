import { useState, useEffect } from "react";
import { SocketContext } from "./SocketContext";

import io from "socket.io-client";

export const SocketProvider = ({ children }) => {
  const SOCKET_ROUTE = "http://localhost:8010";
  const socket = io(SOCKET_ROUTE);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
