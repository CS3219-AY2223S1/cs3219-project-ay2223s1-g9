import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { event } from "./constant/constant.js";
import { ormInitiateCollaboration } from "./model/collaboration-orm.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on(event.CONNECTION, (socket) => {
  console.log("New socket has been connected");

  socket.on(
    event.JOIN_ROOM,
    async ({ roomId, roomDifficulty, isCreatingRoom }) => {
      socket.join(roomId);
      if (isCreatingRoom) {
        const collab = await ormInitiateCollaboration({
          roomId,
          roomDifficulty,
          isCreatingRoom,
        });
        io.to(roomId).emit("question", {
          question: collab.question,
          questionTitle: collab.questionTitle,
        });
      }
    }
  );

  socket.on(event.WRITE_CODE, async ({ roomId, code }) => {
    socket.broadcast.to(roomId).emit(event.UPDATE_CODE, code);
  });

  socket.on(event.DISONNECTION, () => {
    console.log("A socket has been disconnected");
  });
});

httpServer.listen(8004, () => {
  console.log("App is listening on port 8004");
});
