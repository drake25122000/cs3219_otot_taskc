import { 
    ormCreateUser as _createUser, 
    ormGetUser as _getUser, 
    ormChangeEmail as _changeEmail, 
    ormDeleteUser as _deleteUser,
    ormGetAllUser as _getAllUser, 
} from "../model/user-orm.js";
import jwt from "jsonwebtoken";

export async function getAllUser(req, res) {
    const allUsers = await _getAllUser();

    return res.status(201)
                .json(allUsers);
}

export async function addUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (username && email && password) {
            const resp = await _createUser(username, email, password);
            if (resp.err) {
                if (
                    resp.err.name &&
                    resp.err.name === "MongoServerError" &&
                    resp.err.code === 11000
                ) {
                    return res.status(409).json({ message: "Duplicate user!" });
                }
                return res
                    .status(400)
                    .json({ message: "Could not create a new user!" });
            } else {
                return res
                    .status(201)
                    .json({ message: `Created new user ${username} successfully!` });
            }
        } else {
            return res
            .status(400)
            .json({ message: "Username and/or Password are missing!" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when creating new user!" });
    }
}

export async function getUser(req, res) {
    try {
        const username = req.params.username;

        if (username) {
            const resp = await _getUser(username);
            if (resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not get user with " + username + " as the username!" });
            } else {
                return res
                    .status(201)
                    .json({
                        username: resp.username,
                        email: resp.email
                    });
            }
        } else {
            return res
            .status(400)
            .json({ message: "Username is missing!" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when getting a user!" });
    }
}

export async function changeEmail(req, res) {
    try {
        const { username, email, newEmail } = req.body;

        if (username) {
            const resp = await _changeEmail(username, email, newEmail);
            if (resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not get user with " + username + " as the username!" });
            } else {
                return res
                    .status(201)
                    .json({ message: `Succesfully update email of ${username}!` });
            }
        } else {
            return res
            .status(400)
            .json({ message: "Username is missing!" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when getting a user!" });
    }
}

export async function deleteUser(req, res) {
    try {
        const { username } = req.body;

        if (username) {
            const resp = await _deleteUser(username);
            if (resp == undefined) {
                return res
                    .status(400)
                    .json({ message: `Username does not exist in the database!` });
            } else {
                return res
                    .status(201)
                    .json(resp);
            }
        } else {
            return res
            .status(400)
            .json({ message: "Username is missing!" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when getting a user!" });
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body;
        if (username && password) {
            const user = await _getUser(username, password);
            if (user.err) {
                return res.status(400).json({ message: "Could not sign in!" });
            } else {
                console.log(`Signed in user ${username} successfully!`);
        
                let token = await generateToken(user);
        
                const updated = await _addToken(username, token);
        
                return res.status(201).json({
                    username: username,
                    token: token,
                });
            }
        } else {
          return res
            .status(400)
            .json({ message: "Username and/or Password are missing!" });
        }
    } catch (err) {
        return res.status(500).json({ message: "Could not found user" });
    }
}

export async function generateToken(user) {
    let privateKey = process.env.JWT_PRIVATE_KEY;
  
    let token = await jwt.sign(
        {
            username: user.username,
            hashedPassword: user.hashedPassword,
            _id: user._id,
        },
      privateKey,
      { expiresIn: "1h" }
    );
    return token;
}