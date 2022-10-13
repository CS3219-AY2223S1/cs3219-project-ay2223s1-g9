import { ormCreateUser as _createUser } from "../model/user-orm.js";
import { ormDeleteUser as _deleteUser } from "../model/user-orm.js";
import { ormUpdateUser as _updateUser } from "../model/user-orm.js";
import { ormLoginUser as _loginUser } from "../model/user-orm.js";
import { ormLogoutUser as _logoutUser } from "../model/user-orm.js";
import { getToken as _verifyToken} from "../model/repository.js"
import jwt from 'jsonwebtoken'
import { StatusCodes } from "http-status-codes"

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
      if (resp.err) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: "Could not create a new user!",
          error: resp.err.message,
        });
      } else {
        console.log(`Created new user ${username} successfully!`);
        return res.status(StatusCodes.CREATED).json({
          message: `Created new user ${username} successfully!`,
          id: resp._id,
        });
      }
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Username and/or Password are missing!" });
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
    if (resp.err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Could not delete user!", error: resp.err.message });
    } else {
      console.log(`Delete user successfully!`);
      return res.status(StatusCodes.OK).json({ message: `Delete user successfully!` });
    }
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
    if (resp.err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Could not update user!", error: resp.err.message });
    } else {
      console.log(`Updated user successfully!`);
      return res.status(StatusCodes.OK).json({ message: `Updated user successfully!` });
    }
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
      if (resp.err) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ message: "Failed to login", error: resp.err.message });
      } else {
        return res
          .status(StatusCodes.OK)
          .json({ message: "Logged in successfully", token: resp.token });
      }
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Missing field/s in logging in!" });
    }
  } catch (err) {
    next(err);
  }
}

export async function logoutUser(req, res, next) {
  try {
    const token = getToken(req)
    const resp = await _logoutUser(token);
    if (resp.err) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Could not logout user", error: resp.err.message });
    } else {
      return res.status(StatusCodes.OK).json({ message: "User logged out successfully" });
    }
  } catch (err) {
    next(err);
  }
}

export async function verifyToken(req, res, next) {
  try {
    const token = getToken(req)

    const tokenArr = await _verifyToken({token})
    console.log(tokenArr)
    if (tokenArr.length > 0) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication Failed"})
    }

    if (token) {
      try {
          jwt.verify(token, process.env.SECRET_TOKEN)
          return res.status(StatusCodes.OK).json({message: "Authenticated"})
      } catch (err) {
          return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication Failed", error: err.message})
      }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication Failed", error: "Invalid Token"})
    }
  } catch (err) {
    next(err);
  }
}
