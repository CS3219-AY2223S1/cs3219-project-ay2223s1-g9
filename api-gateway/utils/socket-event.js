import { v4 as uuidv4 } from "uuid";

import { SOCKET_EVENT } from "../constant/constant.js";
import {
  deleteMatchingRoom,
  createMatchingRoom,
  createCollaboration,
  getQuestion,
} from "../utils/socket-apis.js";

export const matchingUsers = async (
  roomDifficulty,
  username,
  timer,
  socket,
  io
) => {
  const roomId = uuidv4();
  timer = setTimeout(async () => await deleteMatchingRoom(roomId), 30000);
  const response = await createMatchingRoom(username, roomDifficulty, roomId);
  if (response.status === 500) {
    throw new Error(
      "Internal Server Error at the matching service microservice"
    );
  }
  const matchRoom = response.data;
  socket.join(matchRoom.roomId);

  if (matchRoom.personTwoUsername) {
    io.to(matchRoom.roomId).emit(SOCKET_EVENT.MATCH_SUCCESS, matchRoom);
    await deleteMatchingRoom(roomId);
  }
};

export const matchingSuccessful = (timer) => {
  clearTimeout(timer);
};

export const userJoinRoom = async (io, roomId, roomDifficulty) => {
  try {
    try {
      const questionResponse = await getQuestion(roomDifficulty);
      const questionJSON = questionResponse.data.data;

      const collabResponse = await createCollaboration(
        roomId,
        roomDifficulty,
        questionJSON.question_content,
        questionJSON.question_title
      );

      io.to(roomId).emit(SOCKET_EVENT.QUESTION, {
        question: collabResponse.data.question,
        questionTitle: collabResponse.data.questionTitle,
      });
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export const userWritingCode = (socket, roomId, code) => {
  socket.broadcast.to(roomId).emit(SOCKET_EVENT.UPDATE_CODE, code);
};

export const userLeaveRoom = (socket, roomId) => {
  socket.leave(roomId);
};
