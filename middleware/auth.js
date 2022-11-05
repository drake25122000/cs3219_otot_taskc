import jwt from "jsonwebtoken";
import { roles } from "../roles.js";

export async function verifyUserToken(req, res, next) {
    if (!(req.body &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")) {
        return res.status(401).json({ message: "Missing JWT token!" });
    }

    const privateKey = process.env.JWT_PRIVATE_KEY;
    const usernameBody = req.body.username;
    const usernameParam = req.params.username;

    const tokenFromUser = req.headers.authorization.split(" ")[1];
    try {
        const payload = jwt.verify(tokenFromUser, privateKey, function (err, decoded) {
            if (err) {
                throw err;
            }
            return decoded;
        });

        if (usernameParam != payload.username && usernameBody != payload.username) {
            return res.status(401).json({ message : "Unauthorized user!"});
        }

        req.username = payload.username
        req.role = payload.role;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid JWT token!" });
    }
}

export function grantAccess(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next();
        } catch (error) {
            next(error);
        }
    }
}
