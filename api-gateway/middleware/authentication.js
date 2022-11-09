import axios from "axios";
import config from "../config/config.js";
import { API_PATH } from "../constant/constant.js";
import { HTTP_STATUS_CODE } from "../constant/constant.js";

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token && (await isValidToken(token))) {
    next();
  } else {
    return res
      .status(HTTP_STATUS_CODE.UNAUTHORIZED)
      .json({ message: "Authentication Failed", error: "Invalid Token" });
  }
};

export const socketAuthenticate = async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token && (await isValidToken(token))) {
    console.log("You are authenticated");
    next();
  } else {
    console.log("You are unauthenticated");
    next(new Error("You are unauthenticated"));
  }
};

const isValidToken = async (token) => {
  try {
    await axios.get(`${config.USER_SERVICE_URL}${API_PATH.VERIFY_TOKEN}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// export default authenticate;
