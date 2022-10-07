import express from 'express'
import { getRandomQuestionByDifficulty } from "../controller/question-controller.js"

const router = express.Router()

router.route('/:difficulty?')
    .get(getRandomQuestionByDifficulty)

export default router