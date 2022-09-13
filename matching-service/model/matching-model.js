import mongoose from "mongoose";
import { roomDifficultyLevel } from "../constant/constant.js";

var Schema = mongoose.Schema;
let MatchRoomModelSchema = new Schema({
  personOneUsername: {
    type: String,
    required: true,
  },
  personTwoUsername: {
    type: String,
    default: "",
  },
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
  isRoomAvailable: {
    type: Boolean,
    default: true,
  },
  roomDifficulty: {
    type: String,
    required: true,
    validate(value) {
      const difficultyLevel = value.toLowerCase();
      if (
        difficultyLevel !== roomDifficultyLevel.EASY &&
        difficultyLevel !== roomDifficultyLevel.MEDIUM &&
        difficultyLevel !== roomDifficultyLevel.HARD
      ) {
        throw new Error("The difficulty you have selected is invalid!");
      }
    },
  },
});

export default mongoose.model("MatchRoomModel", MatchRoomModelSchema);
