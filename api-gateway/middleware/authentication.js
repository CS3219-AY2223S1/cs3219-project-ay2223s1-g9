import axios from 'axios'
import config from "../config/config.js"
import { HTTP_STATUS_CODE } from "../constant/constant.js"

const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if (token && await isValidToken(token)) {
        next()
    } else {
        return res.status(HTTP_STATUS_CODE.UNAUTHORIZED).json({message: "Authentication Failed", error: "Invalid Token"})
    }
}

const isValidToken = async (token) => {
    try {
        await axios.get(`${config.USER_SERVICE_URL}${constant.VERIFY_TOKEN}`, { headers: {
            Authorization: `Bearer ${token}`
        }})
        return true
    } catch (err) {
        return false
    }
}

export default authenticate
