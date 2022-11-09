import {
  createCollaboration,
  findCollaborationRoom,
} from "./collaboration-repository.js";
import _ from "lodash";

export const ormInitiateCollaboration = async ({
  roomId,
  roomDifficulty,
  question,
  questionTitle,
}) => {
  const newCollab = await createCollaboration({
    roomId,
    roomDifficulty,
    question,
    questionTitle,
  });
  await newCollab.save();
  return newCollab;
};

export const ormFindCollaborationRoom = async (roomId) => {
  return await findCollaborationRoom(roomId);
};
