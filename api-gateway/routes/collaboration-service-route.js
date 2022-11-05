import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import config from "../config/config.js";
import { API_PATH } from "../constant/constant.js";
import { authenticate } from "../middleware/authentication.js";

const router = express.Router();

router.get(
  API_PATH.GET_COLLAB_ROOM,
  authenticate,
  createProxyMiddleware(API_PATH.GET_COLLAB_ROOM, {
    target: `${config.COLLABORATION_SERVICE_URL}${API_PATH.GET_COLLAB_ROOM}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PATH.GET_COLLAB_ROOM}`]: "",
    },
  })
);

export default router;
