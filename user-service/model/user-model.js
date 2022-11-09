import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

var Schema = mongoose.Schema
let UserModelSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
})

UserModelSchema.pre('save', async function() {
    const user = this
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
})

export default mongoose.model('UserModel', UserModelSchema)
