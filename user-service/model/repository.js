import UserModel from './user-model.js';
import TokenModel from './token-blacklist-model.js'
import config from "../config/config.js"

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = config.ENV == "PROD" ? config.DB_CLOUD_URI : config.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) {
  return new UserModel(params)
}

export async function checkUser(params) {
  return await UserModel.find({ username: params.username})
}

export async function deleteUser(params) {
  return await UserModel.findOneAndDelete({username: params.username})
}

export async function blackListToken(params) {
  return new TokenModel(params)
}

export async function getToken(params) {
  return TokenModel.find({token: params.token})
}