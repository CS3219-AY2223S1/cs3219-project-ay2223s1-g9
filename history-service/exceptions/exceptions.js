import { StatusCodes } from "http-status-codes"

export class DuplicateEntryError extends Error {
    constructor(message) {
        super(message)
        this.name = "Duplicate Entry"
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class MissingFieldError extends Error {
    constructor(message) {
        super(message)
        this.name = "Missing Field"
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class NotFoundError extends Error {
    constructor(message) {
        super(message)
        this.name = "Not Found"
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export class WrongPasswordError extends Error {
    constructor(message) {
        super(message)
        this.name = "Wrong Password"
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export class AuthenticationError extends Error {
    constructor(message) {
        super(message)
        this.name = "Authentication Failed"
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

export class InvalidTokenError extends Error {
    constructor(message) {
        super(message)
        this.name = "Invalid Token"
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}