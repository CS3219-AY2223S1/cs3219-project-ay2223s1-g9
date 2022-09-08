import mongoose from 'mongoose';

var Schema = mongoose.Schema

let TokenModelSchema = new Schema({
    token:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: process.env.TOKEN_EXPIRY,
        default: Date.now
    }
})

export default mongoose.model('TokenModel', TokenModelSchema)