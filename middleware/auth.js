import jwt from "jsonwebtoken";

export async function verifyUserToken(req, res, next) {
    if (!(req.body &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")) {
        return res.status(401).json({ message: "Missing JWT token!" });
    }

    let privateKey = process.env.JWT_PRIVATE_KEY;
    const username = req.body.username;
    const tokenFromUser = req.headers.authorization.split(" ")[1];
    
    try {
        const payload = jwt.verify(tokenFromUser, privateKey, function (err, decoded) {
            if (err) {
              throw err;
            }
            return decoded;
        });

        if (username != payload.username) {
            return res.status(401).json({ message : "Unauthorized user!"});
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid JWT token!" });
    }
}

export async function verifyAdminToken(req, res, next) {
    if (!(req.body &&
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer")) {
        return res.status(401).json({ message: "Missing JWT token!" });
    }

    let privateKey = process.env.JWT_PRIVATE_KEY;
    const username = req.body.username;
    const tokenFromUser = req.headers.authorization.split(" ")[1];
    
    try {
        const payload = jwt.verify(tokenFromUser, privateKey, function (err, decoded) {
            if (err) {
              throw err;
            }
            return decoded;
        });

        if (username != payload.username) {
            return res.status(401).json({ message : "Unauthorized user!"});
        }

        if (payload.role != "admin") {
            return res.status(401).json({ message : "Unauthorized access!"});
        }

        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid JWT token!" });
    }
}