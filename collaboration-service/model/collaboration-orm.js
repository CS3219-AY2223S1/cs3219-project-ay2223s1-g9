import {
  createCollaboration,
  findCollaboration,
  removeCollab,
} from "./collaboration-repository";

export const ormCreateCollaboration = async ({
  roomId,
  roomDifficulty,
  question,
}) => {
  const collab = await findCollaboration({ roomId });

  if (collab.err) {
    const newCollab = await createCollaboration({
      roomId,
      roomDifficulty,
      question,
    });
    await newCollab.save();
    return { collab: newCollab };
  }
  return { collab };
};

export const ormDeleteCollaboration = async (roomId) => {
  try {
    return { deletedCollab: removeCollab({ roomId }) };
  } catch (err) {
    console.log("ERROR: Could not delete the collaboration");
    return { err };
  }
};
