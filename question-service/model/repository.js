import QuestionModel from './question-model.js'

//Set up mongoose conection
import mongoose from 'mongoose'

let mongoDb = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));