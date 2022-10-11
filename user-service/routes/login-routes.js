import express from 'express'
import { loginUser, logoutUser, verifyToken } from '../controller/user-controller.js'

const router = express.Router()

router.route('/login')
    .post(loginUser)

router.route('/logout')
    .post(logoutUser)

router.route('/verifyToken')
    .get(verifyToken)

export default router