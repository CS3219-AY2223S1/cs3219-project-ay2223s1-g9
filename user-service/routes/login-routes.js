import express from 'express'
import { registerUser, loginUser, logoutUser } from '../controller/user-controller.js'
import authentication from "../middleware/authentication.js"

const router = express.Router()

router.route('/login')
    .post(loginUser)

router.route('/logout')
    .post(authentication, logoutUser)

export default router