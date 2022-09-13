import jwt from "jsonwebtoken"
import { getToken } from "../model/repository.js"

const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    const tokenArr = await getToken({token})
    if (tokenArr.length > 0) {
        return res.status(401).json({message: "Authentication Failed"})
    }

    if (token) {
        try {
            jwt.verify(token, process.env.SECRET_TOKEN)
        } catch (err) {
            return res.status(401).json({message: "Authentication Failed", error: "Invalid Token"})
        }
    } else {
        return res.status(401).json({message: "Authentication Failed", error: "Invalid Token"})
    }

    next()
}

export default authenticate