import express from 'express'
import { registerUser, deleteUser, updateUser } from '../controller/user-controller.js'

const router = express.Router()

router.route('/')
    .post(registerUser)
    .delete(deleteUser)

router.route('/update')
    .post(updateUser)

export default router