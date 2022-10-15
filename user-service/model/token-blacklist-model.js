import mongoose from 'mongoose';
import config from '../config/config.js';

var Schema = mongoose.Schema

let TokenModelSchema = new Schema({
    token:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: config.TOKEN_EXPIRY,
        default: Date.now
    }
})

export default mongoose.model('TokenModel', TokenModelSchema)