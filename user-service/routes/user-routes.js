import express from 'express'
import { registerUser, deleteUser } from '../controller/user-controller.js'
import authentication from "../middleware/authentication.js"

const router = express.Router()

router.route('/register')
    .post(registerUser)

router.route('/delete')
    .delete(authentication, deleteUser)

router.route('/update')
    .post(authentication)

export default router