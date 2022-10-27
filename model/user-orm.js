import {
    getAllUser,
    createUser,
    getUser,
    deleteUser,
    changeEmail,
    loginUser,
    createAdmin
} from "./repository.js";

export async function ormCreateAdmin(username, email, password) {
    try {
        const newUser = await createAdmin({ username, email, password });
        await newUser.save();
        return true;
    } catch (err) {
        return { err };
    }
}

export async function ormGetAllUser() {
    
    const allUsers = getAllUser();

    return allUsers;
}  
// CREATE FUNCTION
export async function ormCreateUser(username, email, password) {
    try {
        const newUser = await createUser({ username, email, password });
        await newUser.save();
        return true;
    } catch (err) {
        return { err };
    }
}

export async function ormGetUser(username) {
    const user = await getUser({ username });

    if (user == null) {
        const err = "No user with " + username + " as the username."
        return { err };
    }
    return user;
    
}

export async function ormLogin(username, password) {
    const user = await loginUser(username, password);

    if (user == null) {
        const err = "No user with " + username + " as the username."
        return { err };
    }
    return user;
}

// UPDATE FUNCTION
export async function ormChangeEmail(
    username,
    email,
    newEmail
) {
    try {
        const updatedUser = await changeEmail({
            username,
            email,
            newEmail,
        });
        return updatedUser;
    } catch (err) {
        return { err };
    }
}

// TODO : Accept token
export async function ormDeleteUser(username) {
    const isDeleted = await deleteUser(username);
    return isDeleted;
}