import express from "express";
import { ormCreateMatch, ormDeleteMatchRoom } from "../model/matching-orm.js";

const matchRouter = new express.Router();

matchRouter.post("/createMatch", async (req, res) => {
  try {
    const { username, roomDifficulty, roomId } = req.body;
    const { matchRoom, err } = await ormCreateMatch({
      username,
      roomDifficulty,
      roomId,
    });
    if (err) {
      throw new Error(err);
    }
    res.send(matchRoom);
  } catch (err) {
    res.status(500).send();
  }
});

matchRouter.delete("/deleteMatch/:roomId", async (req, res) => {
  const _roomId = req.params.roomId;
  const deletedRoom = await ormDeleteMatchRoom(_roomId);
  res.send(deletedRoom);
});

export default matchRouter;
