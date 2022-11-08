import { ormGetHistoryByUsername as _getHistoryByUsername } from "../model/history-orm.js";
import { ormCreateHistory as _createHistory } from "../model/history-orm.js";
import { MissingFieldError } from "../exceptions/exceptions.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

function getToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}

export async function createHistory(req, res, next) {
  try {
    const { userOne, userTwo, roomId, question_title, roomDifficulty } = req.body;
    if (userOne && userTwo && roomId && question_title && roomDifficulty) {
      await _createHistory({ username: userOne, roomId, question_title, roomDifficulty });
      await _createHistory({ username: userTwo, roomId, question_title, roomDifficulty });
      console.log(`Created new history for ${userOne} successfully`);
      console.log(`Created new history for ${userTwo} successfully`);
      return res.status(StatusCodes.CREATED).json({
        message: `Created new history for ${userOne} and ${userTwo} successfully`,
      });
    } else {
      throw new MissingFieldError("Missing field to create history");
    }
  } catch (err) {
    next(err);
  }
}

export async function getHistoryByUsername(req, res, next) {
  try {
    const { username } = jwt.decode(getToken(req));
    if (username) {
      const resp = await _getHistoryByUsername(username);
      console.log(`Get history list for ${username} successfully`);
      return res.status(StatusCodes.OK).json({
        message: `Get history list for ${username} successfully`,
        data: resp,
      });
    } else {
      throw new MissingFieldError("Missing username");
    }
  } catch (err) {
    next(err);
  }
}
