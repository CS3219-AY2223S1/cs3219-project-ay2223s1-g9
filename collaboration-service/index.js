import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { event } from "./constant/constant.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on(event.CONNECTION, (socket) => {
  console.log("New socket has been connected");

  socket.on(event.JOIN_ROOM, async ({ roomId, roomDifficulty }) => {
    socket.join(roomId);

    // TODO: Get question from question microservice, store into db.
    // TODO: Use ormCreateCollaboration function. Have not check whether it is correct.
    // TODO: Emit an event to tell frontend the question for both users.
  });

  socket.on(event.WRITE_CODE, async ({ roomId, code }) => {
    socket.broadcast.to(roomId).emit(event.UPDATE_CODE, code);
  });

  socket.on(event.DISONNECTION, () => {
    console.log("A socket has been disconnected");
  });
});

httpServer.listen(8002, () => {
  console.log("App is listening on port 8002");
});
