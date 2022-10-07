import {
  createCollaboration,
  findCollaboration,
  removeCollab,
} from "./collaboration-repository.js";
import request from "async-request";

export const ormInitiateCollaboration = async ({ roomId, roomDifficulty }) => {
  try {
    const collab = await findCollaboration({ roomId });
    if (collab.err) {
      const response = await request(
        "http://localhost:8002/api/question?difficulty=" + roomDifficulty
      );
      const questionJSON = JSON.parse(response.body).data;
      const newCollab = await createCollaboration({
        roomId,
        roomDifficulty,
        question: questionJSON.question_content,
        questionTitle: questionJSON.question_content,
      });
      await newCollab.save();
      return newCollab;
    }
    // await removeCollab({ roomId });
    return collab;
  } catch (err) {
    console.log("There is issues in initiating collaboration");
    return { err };
  }
};
