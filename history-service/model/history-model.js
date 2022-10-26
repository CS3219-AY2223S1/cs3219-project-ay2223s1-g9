import mongoose from 'mongoose'

var Schema = mongoose.Schema
let HistoryModelSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    roomId: {
        type: String,
        required: true,
    },
    question_title: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model("HistoryModel", HistoryModelSchema);