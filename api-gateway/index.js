import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";

import user_service_router from "./routes/user-service-route.js";
import { SOCKET_EVENT, API_PATH, HTTP_METHODS } from "./constant/constant.js";
import config from "./config/config.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(user_service_router);

io.on(SOCKET_EVENT.CONNECTION, (socket) => {
  console.log("New socket has been connected");
  let roomId = "";

  // MATCHING SERVICE
  socket.on(
    SOCKET_EVENT.MATCH,
    async ({ username, roomDifficulty }, callback) => {
      try {
        const response = await axios({
          method: HTTP_METHODS.POST,
          url: `${config.MATCHING_SERVICE_URL}${API_PATH.CREATE_MATCH}`,
          data: {
            username,
            roomDifficulty,
            roomId: socket.id,
          },
        });
        if (response.status === 500) {
          throw new Error(
            "Internal Server Error at the matching service microservice"
          );
        }
        const matchRoom = response.data;
        roomId = matchRoom.roomId;
        socket.join(matchRoom.roomId);

        if (matchRoom.personTwoUserName) {
          io.to(matchRoom.roomId).emit(SOCKET_EVENT.MATCH_SUCCESS, matchRoom);
          return;
        }
      } catch (err) {
        console.log(err);
        // callback(err);
      }
    }
  );

  const timer = setTimeout(() => {
    socket.emit(SOCKET_EVENT.MATCH_UNSUCCESS);
  }, 30000);

  socket.on(SOCKET_EVENT.MATCH_SUCCESS, () => {
    clearTimeout(timer);
  });

  // COLLABORATION & QUESTION SERVICE
  socket.on(SOCKET_EVENT.WRITE_CODE, async ({ roomId, code }) => {
    socket.broadcast.to(roomId).emit(SOCKET_EVENT.UPDATE_CODE, code);
  });

  socket.on(SOCKET_EVENT.JOIN_ROOM, async ({ roomDifficulty }) => {
    try {
      const questionResponse = await axios({
        method: HTTP_METHODS.GET,
        url: "http://localhost:8002/api/question?difficulty=" + roomDifficulty,
      });
      const questionJSON = questionResponse.data.data;

      const collabResponse = await axios({
        method: HTTP_METHODS.POST,
        url: `${config.COLLABORATION_SERVICE_URL}${API_PATH.CREATE_COLLAB}`,
        data: {
          roomId,
          roomDifficulty,
          question: questionJSON.question_content,
          questionTitle: questionJSON.question_title,
        },
      });
      io.to(roomId).emit(SOCKET_EVENT.QUESTION, {
        question: collabResponse.data.question,
        questionTitle: collabResponse.data.questionTitle,
      });
    } catch (err) {
      console.log(err);
    }
  });

  // DISCONNECTING
  socket.on(SOCKET_EVENT.DISONNECTION, async () => {
    console.log("A socket has been disconnected");
    if (roomId !== "") {
      await axios({
        method: HTTP_METHODS.DELETE,
        url: `${config.MATCHING_SERVICE_URL}${API_PATH.DELETE_MATCH}` + roomId,
      });
    }
  });
});

httpServer.listen(8010, () =>
  console.log("api-gateway listening on port 8010")
);
