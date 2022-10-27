import { useState, useEffect, useReducer } from "react";

import io from "socket.io-client";
import Peer from "peerjs";

import { RoomContext } from "./RoomContext";

const SOCKET_ROUTE = "http://localhost:8010";
const socket = io(SOCKET_ROUTE);

export const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState({
    personOne: "",
    personTwo: "",
    roomId: "",
    difficulty: "",
  });
  const [question, setQuestion] = useState({
    title: "",
    data: <p>question data here</p>,
  });

  const [me, setMe] = useState(null);
  const [myStream, setMyStream] = useState(null);

  useEffect(() => {
    socket.on("question", (questionData) => {
      setQuestion({
        ...question,
        title: questionData.questionTitle,
        data: questionData.question,
      });
    });

    const peer = new Peer();
    setMe(peer);

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
      value={{ room, setRoom, me, myStream, socket, question }}
    >
      {children}
    </RoomContext.Provider>
  );
};
