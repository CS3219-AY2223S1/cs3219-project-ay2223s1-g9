import express from "express";
import {
  ormInitiateCollaboration,
  ormFindCollaborationRoom,
} from "../model/collaboration-orm.js";
import { API_PATH } from "../constant/constant.js";

const collabRouter = new express.Router();

collabRouter.post(API_PATH.CREATE_COLLABORATION, async (req, res, next) => {
  // const {roomId, roomDifficulty, question, questionTitle} = req.body;
  try {
    const collab = await ormInitiateCollaboration(req.body);
    res.send(collab);
  } catch (err) {
    next();
  }
});

collabRouter.get(API_PATH.GET_COLLABORATION, async (req, res, next) => {
  try {
    const collaboration = await ormFindCollaborationRoom(req.query.roomId);
    res.send(collaboration);
  } catch (err) {
    next();
  }
});

export default collabRouter;
