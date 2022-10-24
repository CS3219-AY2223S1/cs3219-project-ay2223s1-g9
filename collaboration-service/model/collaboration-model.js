import mongoose from "mongoose";

var Schema = mongoose.Schema;
let CollaborationModelSchema = new Schema({
  roomId: {
    type: String,
    unique: true,
    required: true,
  },
  roomDifficulty: {
    type: String,
  },
  questionTitle: {
    type: String,
    default: "",
  },
  question: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: "60d",
    default: Date.now,
  },
});

export default mongoose.model("CollaborationModel", CollaborationModelSchema);
