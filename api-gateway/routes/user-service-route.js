import express from "express";
import {
  createProxyMiddleware,
  responseInterceptor,
} from "http-proxy-middleware";
import config from "../config/config.js";
import { API_PATH } from "../constant/constant.js";
import { authenticate } from "../middleware/authentication.js";
const router = express.Router();

router.post(
  API_PATH.USER,
  createProxyMiddleware(API_PATH.USER, {
    target: `${config.USER_SERVICE_URL}${API_PATH.USER}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PATH.USER}`]: "",
    },
    //     onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
    //         let data = JSON.parse(responseBuffer.toString('utf8'));

    //         // manipulate JSON data here
    //         data = Object.assign({}, data, { extra: 'foo bar' });

    //         // return manipulated JSON
    //         return JSON.stringify(data);
    //     })
  })
);

router.post(
  API_PATH.UPDATE_USER,
  authenticate,
  createProxyMiddleware(API_PATH.UPDATE_USER, {
    target: `${config.USER_SERVICE_URL}${API_PATH.UPDATE_USER}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PATH.UPDATE_USER}`]: "",
    },
  })
);

router.delete(
  API_PATH.USER,
  authenticate,
  createProxyMiddleware(API_PATH.USER, {
    target: `${config.USER_SERVICE_URL}${API_PATH.USER}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PATH.USER}`]: "",
    },
  })
);

router.post(
  API_PATH.LOGIN,
  createProxyMiddleware(API_PATH.LOGIN, {
    target: `${config.USER_SERVICE_URL}${API_PATH.LOGIN}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PATH.LOGIN}`]: "",
    },
  })
);

router.post(
  API_PATH.LOGOUT,
  authenticate,
  createProxyMiddleware(API_PATH.LOGOUT, {
    target: `${config.USER_SERVICE_URL}${API_PATH.LOGOUT}`,
    changeOrigin: true,
    pathRewrite: {
      [`^${API_PATH.LOGOUT}`]: "",
    },
  })
);

export default router;
