import { createUser, checkUser } from './repository.js';

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

