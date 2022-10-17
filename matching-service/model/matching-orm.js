import {
  createMatchRoom,
  findAvailableRoomAndMatch,
  removeMatch,
} from "./matching-repository.js";

export const ormCreateMatch = async ({ username, roomDifficulty, roomId }) => {
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
};

export const ormDeleteMatchRoom = async (id) => {
  return { deletedMatchRoom: await removeMatch(id) };
};
