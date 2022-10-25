import CollaborationModel from "./collaboration-model.js";
import mongoose from "mongoose";
import config from "../config/config.js";

let mongoDB = config.ENV == "PROD" ? config.DB_CLOUD_URI : config.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

export const createCollaboration = async (data) => {
  return new CollaborationModel(data);
};

export const findMultipleCollaborations = async (roomIds) => {
  return CollaborationModel.find({
    roomId: {
      $in: roomIds,
    },
  });
};

export const removeCollab = async ({ roomId }) => {
  return CollaborationModel.findOneAndRemove({ roomId });
};
