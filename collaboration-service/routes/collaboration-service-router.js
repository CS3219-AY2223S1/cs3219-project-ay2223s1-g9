import express from "express";
import { ormInitiateCollaboration } from "../model/collaboration-orm.js";

const collabRouter = new express.Router();

collabRouter.post("/createCollab", async (req, res) => {
  // const {roomId, roomDifficulty, question, questionTitle} = req.body;
  try {
    const collab = await ormInitiateCollaboration(req.body);
    res.send(collab);
  } catch (err) {
    res.status(500).send();
  }
});

export default collabRouter;
