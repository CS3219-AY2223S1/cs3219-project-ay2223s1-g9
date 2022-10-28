import express from 'express'
import { createHistory, getHistoryByUsername } from "../controller/history-controller.js"
import { API_PATH } from '../constant/constant.js'

const router = express.Router()

router.route(API_PATH.HISTORY)
    .post(createHistory)
    .get(getHistoryByUsername)

export default router