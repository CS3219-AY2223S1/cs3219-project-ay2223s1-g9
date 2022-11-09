import express from 'express'
import { fetchQuestionsFromLeetcode, getRandomQuestionByDifficulty } from "../controller/question-controller.js"
import { API_PATH } from '../constant/constant.js'

const router = express.Router()

router.route(API_PATH.FETCH_LEETCODE_QUESTION)
    .get(fetchQuestionsFromLeetcode)
    
router.route(API_PATH.GET_RANDOM_QUESTION)
    .get(getRandomQuestionByDifficulty)

export default router