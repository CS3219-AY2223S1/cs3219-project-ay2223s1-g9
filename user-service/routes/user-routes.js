import express from 'express'
import { registerUser, deleteUser, updateUser } from '../controller/user-controller.js'
import authentication from "../middleware/authentication.js"

const router = express.Router()

router.route('/')
    .post(registerUser)
    .delete(authentication, deleteUser)

router.route('/update')
    .post(authentication, updateUser)

export default router