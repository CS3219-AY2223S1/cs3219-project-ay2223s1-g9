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
const io = new Server(httpServer);

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
    // socket.emit("")
  });

  socket.on("disconnect", async () => {
    if (roomId !== "") {
      await ormDeleteMatchRoom(roomId);
      // have to ask client side to disconnect.
      // socket.broadcast.to(roomId).emit("client disconnect");
    }
  });
});

httpServer.listen(8001, () => {
  console.log("App is listening on port 8001");
});
