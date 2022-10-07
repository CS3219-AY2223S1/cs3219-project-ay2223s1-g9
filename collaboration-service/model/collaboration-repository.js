import CollaborationModel from "./collaboration-model.js";
import mongoose from "mongoose";

// the url is for local set up only.
mongoose.connect("mongodb://127.0.0.1:27017/collaboration-service-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const createCollaboration = async (data) => {
  return new CollaborationModel(data);
};

export const findCollaboration = async ({ roomId }) => {
  const collab = await CollaborationModel.findOne({ roomId });

  if (!collab) {
    return { err: "Collaboration has not been set up" };
  }

  return collab;
};

export const removeCollab = async ({ roomId }) => {
  return CollaborationModel.findOneAndRemove({ roomId });
};
