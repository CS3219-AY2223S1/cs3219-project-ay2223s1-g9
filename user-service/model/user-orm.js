import { createUser, checkUser, deleteUser, blackListToken } from './repository.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { NotFoundError, DuplicateEntryError, WrongPasswordError} from '../exceptions/exceptions.js';
import config from '../config/config.js';

const generateJWT = (user) => {
    return jwt.sign({
        username: user.username
    }, config.SECRET_TOKEN, { expiresIn: config.TOKEN_EXPIRY })
}

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    const user = await checkUser({username});
    if (user.length === 0) {
        const newUser = await createUser({username, password});
        newUser.save();
        return newUser;     
    } else {
        throw new DuplicateEntryError("Username already exist in database");
    }
}

export async function ormDeleteUser(token) {
    const { username } = jwt.decode(token)
    const user = await checkUser({username});
    if (user.length !== 0) {
        await deleteUser({username})
        const blacklistToken = await blackListToken({token})
        blacklistToken.save()
        return true
    } else {
        throw new NotFoundError("User does not exist in database");
    }
}

export async function ormUpdateUser(token, password) {
    const { username } = jwt.decode(token)
    const user = await checkUser({username});
    if (user.length !== 0) {
        user[0].password = password
        user[0].save();
        return true; 
    } else {
        throw new NotFoundError("User does not exist in database");
    }
}

export async function ormLoginUser(username, password) {
    const user = await checkUser({username})
    if (user.length === 0) {
        throw new NotFoundError("User does not exist in database")
    }

    if (await bcrypt.compare(password,user[0].password)) {
        const token = generateJWT(user[0])
        return {token}
    } else {
        throw new WrongPasswordError("Authentication Failed")
    }
}

export async function ormLogoutUser(token) {
    const blacklistToken = await blackListToken({token})
    blacklistToken.save()
    return true
}
