import { useState, useEffect } from "react";

import io from "socket.io-client";
import Peer from "peerjs";
import { API_GATEWAY_URL } from "../configs";

import { RoomContext, Pages } from "./RoomContext";

const SOCKET_ROUTE = API_GATEWAY_URL;
let socket = null;

const initializeSocket = (token) => {
  socket = io(SOCKET_ROUTE, {
    auth: { token },
  });
};

export const RoomProvider = ({ children }) => {
  const [page, setPage] = useState(Pages.HomePage);
  const [room, setRoom] = useState({
    personOne: "",
    personTwo: "",
    roomId: "",
    difficulty: "",
  });
  const [me, setMe] = useState(new Peer());
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => setMyStream(stream));
    } catch (err) {
      console.log("error setting up stream");
    }
  }, []);

  return (
    <RoomContext.Provider
      value={{
        page,
        setPage,
        room,
        setRoom,
        socket,
        me,
        myStream,
        initializeSocket,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
