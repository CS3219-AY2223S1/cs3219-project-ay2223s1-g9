import express from 'express'
import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware"
import config from "../config/config.js"
import { API_PATH } from "../constant/constant.js"
import authenticate from "../middleware/authentication.js";

const router = express.Router()

router.get(API_PATH.GET_HISTORY, authenticate, createProxyMiddleware(API_PATH.GET_HISTORY, {
    target: `${config.HISTORY_SERVICE_URL}${API_PATH.GET_HISTORY}`,
    changeOrigin: true,
    pathRewrite: {
        [`^${API_PATH.GET_HISTORY}`]: "",
    },
    selfHandleResponse: true,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes, req, res) => {
        let data = JSON.parse(responseBuffer.toString('utf8'));
        data["data"].forEach((entry) => {
            const date = new Date(entry.createdAt)
            entry.createdAt = date.toLocaleDateString()
        })

        return JSON.stringify(data)
    }),
}))

export default router