import express from "express";
import {
  ormInitiateCollaboration,
  ormFindMultipleCollaboration,
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

collabRouter.get(
  API_PATH.GET_MULTIPLE_COLLABORATION,
  async (req, res, next) => {
    try {
      const collaborations = await ormFindMultipleCollaboration(
        req.query.roomId
      );
      res.send(collaborations);
    } catch (err) {
      next();
    }
  }
);

export default collabRouter;
