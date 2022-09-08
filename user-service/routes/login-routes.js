import express from 'express'
import { registerUser, loginUser } from '../controller/user-controller.js'

const router = express.Router()

router.route('/registerUser')
    .post(registerUser)

router.route('/login')
    .post(loginUser)
    
export default router