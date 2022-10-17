import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

import { SOCKET_EVENT } from "../constant/constant.js";
import {
  deleteMatchingRoom,
  createMatchingRoom,
  createCollaboration,
  getQuestion,
} from "./socket-apis.js";

export const initiateSocket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.on(SOCKET_EVENT.CONNECTION, (socket) => {
    console.log("New socket has been connected");
    let roomId = uuidv4();

    // MATCHING SERVICE
    let timer = null;

    socket.on(
      SOCKET_EVENT.MATCH,
      async ({ username, roomDifficulty }, callback) => {
        try {
          roomId = uuidv4();

          timer = setTimeout(
            async () => await deleteMatchingRoom(roomId),
            30000
          );

          const response = await createMatchingRoom(
            username,
            roomDifficulty,
            roomId
          );
          if (response.status === 500) {
            throw new Error(
              "Internal Server Error at the matching service microservice"
            );
          }
          const matchRoom = response.data;
          roomId = matchRoom.roomId;
          socket.join(matchRoom.roomId);

          if (matchRoom.personTwoUsername) {
            io.to(matchRoom.roomId).emit(SOCKET_EVENT.MATCH_SUCCESS, matchRoom);
            await deleteMatchingRoom(roomId);
          }
        } catch (err) {
          console.log(err);
          // callback(err);
        }
      }
    );

    socket.on(SOCKET_EVENT.MATCH_SUCCESS, async () => {
      clearTimeout(timer);
    });

    // COLLABORATION & QUESTION SERVICE
    socket.on(SOCKET_EVENT.WRITE_CODE, async ({ roomId, code }) => {
      socket.broadcast.to(roomId).emit(SOCKET_EVENT.UPDATE_CODE, code);
    });

    socket.on(SOCKET_EVENT.JOIN_ROOM, async ({ roomDifficulty }) => {
      try {
        const questionResponse = await getQuestion(roomDifficulty);
        const questionJSON = questionResponse.data.data;

        const collabResponse = await createCollaboration(
          roomId,
          roomDifficulty,
          questionJSON.question_content,
          questionJSON.question_title
        );
        io.to(roomId).emit(SOCKET_EVENT.QUESTION, {
          question: collabResponse.data.question,
          questionTitle: collabResponse.data.questionTitle,
        });
      } catch (err) {
        console.log(err);
      }
    });

    socket.on(SOCKET_EVENT.LEAVE_ROOM, async ({ roomId }) => {
      socket.leave(roomId);
    });

    socket.on(SOCKET_EVENT.DISONNECTION, async () => {
      console.log("A socket has been disconnected");
    });
  });

  return httpServer;
};
