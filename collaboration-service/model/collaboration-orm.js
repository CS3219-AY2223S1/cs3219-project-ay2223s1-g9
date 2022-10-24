import {
  createCollaboration,
  findMultipleCollaborations,
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

export const ormFindMultipleCollaboration = async (roomIds) => {
  const collaborations = await findMultipleCollaborations(roomIds);
  const filteredKeysCollabs = [];
  collaborations.forEach((collab) =>
    filteredKeysCollabs.push(
      _.pick(collab, ["roomId", "roomDifficulty", "questionTitle", "question"])
    )
  );
  return filteredKeysCollabs;
};
