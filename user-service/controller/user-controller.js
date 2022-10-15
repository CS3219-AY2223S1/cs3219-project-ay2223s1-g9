import { ormCreateUser as _createUser } from "../model/user-orm.js";
import { ormDeleteUser as _deleteUser } from "../model/user-orm.js";
import { ormUpdateUser as _updateUser } from "../model/user-orm.js";
import { ormLoginUser as _loginUser } from "../model/user-orm.js";
import { ormLogoutUser as _logoutUser } from "../model/user-orm.js";
import { getToken as _verifyToken} from "../model/repository.js"
import jwt from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes"
import { AuthenticationError, InvalidTokenError, MissingFieldError } from "../exceptions/exceptions.js"
import config from "../config/config.js";

function getToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token;
}

export async function registerUser(req, res, next) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const resp = await _createUser(username, password);
      console.log(resp);
      console.log(`Created new user ${username} successfully!`);
      return res.status(StatusCodes.CREATED).json({
        message: `Created new user ${username} successfully!`,
        id: resp._id,
      });
    } else {
      throw new MissingFieldError("Username and/or Password are missing!")
    }
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const token = getToken(req);
    const resp = await _deleteUser(token);
    console.log(resp);
    console.log(`Delete user successfully!`);
    return res.status(StatusCodes.OK).json({ message: `Delete user successfully!` });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const token = getToken(req);
    const { password } = req.body;
    const resp = await _updateUser(token, password);
    console.log(resp);
    console.log(`Updated user successfully!`);
    return res.status(StatusCodes.OK).json({ message: `Updated user successfully!` });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const resp = await _loginUser(username, password);
      console.log(resp);
      return res
        .status(StatusCodes.OK)
        .json({ message: "Logged in successfully", token: resp.token });
    } else {
      throw new MissingFieldError("Missing field/s for logging in!")
    }
  } catch (err) {
    next(err);
  }
}

export async function logoutUser(req, res, next) {
  try {
    const token = getToken(req)
    const resp = await _logoutUser(token);
    return res.status(StatusCodes.OK).json({ message: "User logged out successfully" });
  } catch (err) {
    next(err);
  }
}

export async function verifyToken(req, res, next) {
  try {
    const token = getToken(req)

    const tokenArr = await _verifyToken({token})
    if (tokenArr.length > 0) {
      throw new AuthenticationError("Authentication Failed")
    }

    try {
        jwt.verify(token, config.SECRET_TOKEN)
        return res.status(StatusCodes.OK).json({message: "Authenticated"})
    } catch (err) {
      throw new InvalidTokenError(err.message)
    }
  } catch (err) {
    next(err);
  }
}
