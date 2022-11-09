import express from "express";
import { ormCreateMatch, ormDeleteMatchRoom } from "../model/matching-orm.js";
import { API_PATH } from "../constant/constant.js";

const matchRouter = new express.Router();

matchRouter.post(API_PATH.CREATE_MATCH, async (req, res, next) => {
  try {
    const { username, roomDifficulty, roomId } = req.body;
    const { matchRoom } = await ormCreateMatch({
      username,
      roomDifficulty,
      roomId,
    });
    res.send(matchRoom);
  } catch (err) {
    next()
  }
});

matchRouter.delete(API_PATH.DELETE_MATCH, async (req, res, next) => {
  try {
    const _roomId = req.params.roomId;
    const deletedRoom = await ormDeleteMatchRoom(_roomId);
    res.send(deletedRoom);
  } catch (err) {
    next()
  }
});

export default matchRouter;
