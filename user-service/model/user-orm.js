import { createUser, checkUser } from './repository.js';
import jwt from 'jsonwebtoken'

const generateJWT = (user) => {
    console.log(process.env.TOKEN_EXPIRY)
    return jwt.sign({
        username: user.username
    }, process.env.SECRET_TOKEN, { expiresIn: process.env.TOKEN_EXPIRY })
}

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const user = await checkUser({username});
        if (user.length === 0) {
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

export async function ormLoginUser(username, password) {
    try {
        const user = await checkUser({username})
        if (user.length === 0) {
            throw new Error("Authentication Failed")
        }

        if (password === user[0].password) {
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
