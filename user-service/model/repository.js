import UserModel from './user-model.js';
import TokenModel from './token-blacklist-model.js'
import 'dotenv/config'

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});

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

export async function updateUser(params) {
  return await UserModel.findOneAndUpdate({username: params.username}, {password: params.password})
}

export async function blackListToken(params) {
  return new TokenModel(params)
}

export async function getToken(params) {
  return TokenModel.find({token: params.token})
}