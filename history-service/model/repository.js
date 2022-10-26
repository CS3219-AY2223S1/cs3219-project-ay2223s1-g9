import HistoryModel from './history-model.js';
import config from '../config/config.js'

//Set up mongoose conection
import mongoose from 'mongoose'

let mongoDb = config.ENV == "PROD" ? config.DB_CLOUD_URI : config.DB_LOCAL_URI;

mongoose.connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true})

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createHistory(params) {
    return new HistoryModel(params)
}

export async function getHistoryByUsername(params) {
    return await HistoryModel.find({ username: params.username }).sort({createdAt: -1})
}