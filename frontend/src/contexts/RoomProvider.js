import { useState, useEffect } from "react";

import io from "socket.io-client";
import Peer from "peerjs";
import { v4 as uuidV4 } from "uuid";

import { RoomContext, Pages } from "./RoomContext";

const SOCKET_ROUTE = "http://localhost:8010";
const socket = io(SOCKET_ROUTE);

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
      value={{ page, setPage, room, setRoom, socket, me, myStream }}
    >
      {children}
    </RoomContext.Provider>
  );
};
