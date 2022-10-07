import express from 'express'
import { fetchQuestionsFromLeetcode, getRandomQuestionByDifficulty } from "../controller/question-controller.js"

const router = express.Router()

router.route('/:fetch')
    .get(fetchQuestionsFromLeetcode)
    
router.route('/:difficulty?')
    .get(getRandomQuestionByDifficulty)

export default router