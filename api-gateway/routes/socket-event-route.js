import { createServer } from "http";
import { Server } from "socket.io";

import { SOCKET_EVENT } from "../constant/constant.js";
import { socketAuthenticate } from "../middleware/authentication.js";

import {
  matchingUsers,
  matchingSuccessful,
  userJoinRoom,
  userWritingCode,
  userLeaveRoom,
} from "../utils/socket-event.js";

export const initiateSocket = (app) => {
  const httpServer = createServer(app);
  const io = new Server(httpServer, { cors: { origin: "*" } });

  io.use(socketAuthenticate);

  io.on(SOCKET_EVENT.CONNECTION, (socket) => {
    console.log("New socket has been connected");

    // MATCHING SERVICE
    let timer = null;

    socket.on(SOCKET_EVENT.MATCH, async ({ username, roomDifficulty }) => {
      await matchingUsers(roomDifficulty, username, timer, socket, io);
    });

    socket.on(SOCKET_EVENT.MATCH_SUCCESS, () => {
      matchingSuccessful(timer);
    });

    // COLLABORATION & QUESTION SERVICE
    socket.on(SOCKET_EVENT.WRITE_CODE, async ({ roomId, code }) => {
      userWritingCode(socket, roomId, code);
    });

    socket.on(
      SOCKET_EVENT.JOIN_ROOM,
      async ({ roomDifficulty, roomId, userOne, userTwo }) => {
        await userJoinRoom(io, roomId, roomDifficulty, userOne, userTwo);
      }
    );

    socket.on(SOCKET_EVENT.LEAVE_ROOM, ({ roomId }) => {
      userLeaveRoom(socket, roomId);
    });

    // COMMUNICATION
    socket.on(SOCKET_EVENT.SEND_STREAM, ({ peerId, roomId }) => {
      socket.broadcast.to(roomId).emit("receiveStream", { peerId });
    });

    socket.on(SOCKET_EVENT.TOGGLE_PEER_STREAM, ({ roomId, showStream }) => {
      socket.broadcast.to(roomId).emit("togglePeerStream", { showStream });
    });

    socket.on(SOCKET_EVENT.DISONNECTION, async () => {
      console.log("A socket has been disconnected");
    });
  });

  return httpServer;
};
