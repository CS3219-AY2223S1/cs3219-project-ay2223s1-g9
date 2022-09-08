import jwt from "jsonwebtoken"
import { getToken } from "../model/repository.js"

const authenticate = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    const tokenArr = await getToken({token})
    if (tokenArr.length > 0) {
        return res.status(401).json({message: "Authenticated Failed"})
    }

    if (token) {
        jwt.verify(token, process.env.SECRET_TOKEN)
    } else {
        return res.status(401).json({message: "Authenticated Failed"})
    }

    next()
}

export default authenticate