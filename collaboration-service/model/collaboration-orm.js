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
  try {
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
    // Probably do deletion here, since the second person found the collaboration already. There is no use for this record.
    return { collab };
  } catch (err) {
    console.log("Error in creating collaboration");
    return { err };
  }
};

export const ormDeleteCollaboration = async (roomId) => {
  try {
    return { deletedCollab: removeCollab({ roomId }) };
  } catch (err) {
    console.log("ERROR: Could not delete the collaboration");
    return { err };
  }
};
