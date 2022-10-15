import { StatusCodes } from "http-status-codes"

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    return res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({error: err.message})
}

export default errorHandlerMiddleware