import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { ormCreateMatch, ormDeleteMatchRoom } from "./model/matching-orm.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.get("/", (req, res) => {
  res.send("Hello World from matching-service");
});

io.on("connection", (socket) => {
  console.log("New socket has been connected");
  let roomId = "";

  socket.on("match", async ({ username, roomDifficulty }, callback) => {
    const { matchRoom, err } = await ormCreateMatch({
      username,
      roomDifficulty,
      roomId: socket.id,
    });
    if (err) {
      return callback(err);
    }
    roomId = matchRoom.roomId;
    socket.join(matchRoom.roomId);

    console.log(matchRoom);

    if (matchRoom.personTwoUsername) {
      io.to(matchRoom.roomId).emit("matchSuccess", matchRoom);
      return;
    }
  });

  const timer = setTimeout(() => {
    socket.emit("matchUnsuccess");
  }, 30000);

  socket.on("matchSuccess", () => {
    clearTimeout(timer);
  });

  socket.on("disconnect", async () => {
    console.log("A socket has been disconnected");
    if (roomId !== "") {
      await ormDeleteMatchRoom(roomId);
    }
  });
});

httpServer.listen(8001, () => {
  console.log("App is listening on port 8001");
});
