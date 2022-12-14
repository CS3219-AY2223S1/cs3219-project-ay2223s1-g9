import QuestionModel from './question-model.js'
import config from "../config/config.js"

//Set up mongoose conection
import mongoose from 'mongoose'

let mongoDb = config.ENV == "PROD" ? config.DB_CLOUD_URI : config.DB_LOCAL_URI;

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createQuestion(params) {
    return new QuestionModel(params)
}

export async function getQuestionsByDifficulty(params) {
    return await QuestionModel.find({ question_difficulty: params.difficulty})
}