import MatchRoomModel from "./matching-model.js";
import mongoose from "mongoose";

// the url is for local set up only.
mongoose.connect("mongodb://127.0.0.1:27017/matching-service-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export const createMatchRoom = async ({ username, roomDifficulty, roomId }) => {
  return new MatchRoomModel({
    personOneUsername: username,
    roomDifficulty,
    roomId,
  });
};

export const findAvailableRoomAndMatch = async ({
  roomDifficulty,
  username,
}) => {
  let matchRoom = await MatchRoomModel.findOneAndUpdate(
    {
      roomDifficulty,
      isRoomAvailable: true,
    },
    {
      isRoomAvailable: false,
      personTwoUsername: username,
    },
    {
      runValidators: true,
    }
  );

  if (!matchRoom) {
    return { err: "No room available" };
  }
  matchRoom.personTwoUsername = username;
  matchRoom.isRoomAvailable = false;
  return matchRoom;
};

export const removeMatch = async (id) => {
  return MatchRoomModel.findOneAndRemove({ roomId: id });
};

// /Users/Admin/mongodb/bin/mongod.exe --dbpath=/Users/Admin/mongodb-data
