import { createUser, checkUser, deleteUser, updateUser, blackListToken } from './repository.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateJWT = (user) => {
    return jwt.sign({
        username: user.username
    }, process.env.SECRET_TOKEN, { expiresIn: process.env.TOKEN_EXPIRY })
}

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const user = await checkUser({username});
        if (user.length === 0) {
            const salt = await bcrypt.genSalt()
            password = await bcrypt.hash(password, salt)
            const newUser = await createUser({username, password});
            newUser.save();
            return newUser;     
        } else {
            throw new Error("Username already exist in database");
        }
    } catch (err) {
        console.log('ERROR: Could not create new user');
        return { err };
    }
}

export async function ormDeleteUser(token) {
    try {
        const { username } = jwt.decode(token)
        await deleteUser({username})
        const blacklistToken = await blackListToken({token})
        blacklistToken.save()
        return true
    } catch (err) {
        console.log("ERROR: Could not delete user")
        return { err }
    }
}

export async function ormUpdateUser(token, password) {
    try {
        const { username } = jwt.decode(token)
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)
        await updateUser({username, password})
        return true
    } catch (err) {
        console.log("ERROR: Could not update user")
        return { err }
    }
}

export async function ormLoginUser(username, password) {
    try {
        const user = await checkUser({username})
        if (user.length === 0) {
            throw new Error("User not found")
        }

        if (await bcrypt.compare(password,user[0].password)) {
            const token = generateJWT(user[0])
            return {token}
        } else {
            throw new Error("Authentication Failed")
        }
    } catch (err) {
        console.log("ERROR: Could not verify user")
        return { err }
    }
}

export async function ormLogoutUser(token) {
    try {
        const blacklistToken = await blackListToken({token})
        blacklistToken.save()
        return true
    } catch (err) {
        console.log("ERROR: Could not blacklist token")
        return { err }
    }
}
