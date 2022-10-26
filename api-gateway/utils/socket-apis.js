import axios from "axios";

import config from "../config/config.js";
import {
  API_PATH,
  HTTP_METHODS,
  API_QUERY_PATH,
} from "../constant/constant.js";

export const deleteMatchingRoom = async (roomId) => {
  await axios({
    method: HTTP_METHODS.DELETE,
    url: `${config.MATCHING_SERVICE_URL}${API_PATH.DELETE_MATCH}` + roomId,
  });
};

export const createMatchingRoom = async (username, roomDifficulty, roomId) => {
  return await axios({
    method: HTTP_METHODS.POST,
    url: `${config.MATCHING_SERVICE_URL}${API_PATH.CREATE_MATCH}`,
    data: {
      username,
      roomDifficulty,
      roomId,
    },
  });
};

export const getQuestion = async (roomDifficulty) => {
  return await axios({
    method: HTTP_METHODS.GET,
    url: `${config.QUESTION_SERVICE_URL}${API_QUERY_PATH.GET_RANDOM_QUESTION}${roomDifficulty}`,
  });
};

export const createCollaboration = async (
  roomId,
  roomDifficulty,
  question,
  questionTitle
) => {
  return await axios({
    method: HTTP_METHODS.POST,
    url: `${config.COLLABORATION_SERVICE_URL}${API_PATH.CREATE_COLLAB}`,
    data: {
      roomId,
      roomDifficulty,
      question,
      questionTitle,
    },
  });
};

export const createUserHistory = async (userOne, userTwo, roomId) => {
  return await axios({
    method: HTTP_METHODS.POST,
    url: `${config.HISTORY_SERVICE_URL}${API_PATH.CREATE_HISTORY}`,
    data: {
      userOne,
      userTwo,
      roomId,
    },
  });
};
