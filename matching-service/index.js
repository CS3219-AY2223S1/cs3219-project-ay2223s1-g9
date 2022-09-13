import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { ormCreateMatch, ormDeleteMatchRoom } from "./model/matching-orm.js";
import { event } from "./constant/constant.js";

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

io.on(event.CONNECTION, (socket) => {
  console.log("New socket has been connected");
  let roomId = "";

  socket.on(event.MATCH, async ({ username, roomDifficulty }, callback) => {
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

    if (matchRoom.personTwoUsername) {
      io.to(matchRoom.roomId).emit(event.MATCH_SUCCESS, matchRoom);
      return;
    }
  });

  const timer = setTimeout(() => {
    socket.emit(event.MATCH_UNSUCCESS);
  }, 30000);

  socket.on(event.MATCH_SUCCESS, () => {
    clearTimeout(timer);
  });

  socket.on(event.DISONNECTION, async () => {
    console.log("A socket has been disconnected");
    if (roomId !== "") {
      await ormDeleteMatchRoom(roomId);
    }
  });
});

httpServer.listen(8001, () => {
  console.log("App is listening on port 8001");
});
