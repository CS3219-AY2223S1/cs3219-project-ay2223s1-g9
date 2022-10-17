import express from 'express'
import { registerUser, deleteUser, updateUser, loginUser, logoutUser, verifyToken } from '../controller/user-controller.js'
import { API_PATH } from '../constant/constant.js'

const router = express.Router()

router.route(API_PATH.LOGIN)
    .post(loginUser)

router.route(API_PATH.LOGOUT)
    .post(logoutUser)

router.route(API_PATH.VERIFY_TOKEN)
    .get(verifyToken)

router.route(API_PATH.USER)
    .post(registerUser)
    .delete(deleteUser)

router.route(API_PATH.UPDATE_USER)
    .post(updateUser)

export default router