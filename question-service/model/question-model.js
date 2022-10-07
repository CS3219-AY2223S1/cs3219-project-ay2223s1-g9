import mongoose from 'mongoose'

var Schema = mongoose.Schema
let QuestionModelSchema = new Schema({
    question_id: {
        type: Number,
        required: true,
        unique: true,
    },
    question_difficulty: {
        type: String,
        required: true,
    },
    question_title: {
        type: String,
        required: true,
    },
    question_content: {
        type: String,
        required: true,
    }
})

export default mongoose.model('QuestionModel', QuestionModelSchema)