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
  question: {
    type: String,
    required: true,
  },
});

export default mongoose.model("CollaborationModel", CollaborationModelSchema);
