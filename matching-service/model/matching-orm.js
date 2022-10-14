import {
  createMatchRoom,
  findAvailableRoomAndMatch,
  removeMatch,
} from "./matching-repository.js";

export const ormCreateMatch = async ({ username, roomDifficulty, roomId }) => {
  try {
    const availableMatchRoom = await findAvailableRoomAndMatch({
      username,
      roomDifficulty,
    });
    if (availableMatchRoom.err) {
      const newMatchRoom = await createMatchRoom({
        username,
        roomDifficulty,
        roomId,
      });
      await newMatchRoom.save();
      return { matchRoom: newMatchRoom };
    }
    return {
      matchRoom: availableMatchRoom,
    };
  } catch (err) {
    console.log("ERROR: Could not create new match");
    return { err };
  }
};

export const ormDeleteMatchRoom = async (id) => {
  try {
    return { deletedMatchRoom: await removeMatch(id) };
  } catch (err) {
    console.log("ERROR: Could not delete the match room");
    return { err };
  }
};
