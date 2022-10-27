import express from "express";
import { getUser, addUser, deleteUser, changeEmail, login, getAllUser } from "../controller/user-controller.js";
import { verifyUserToken } from "../middleware/auth.js";

function getUsersRoutes() {
    const router = express.Router();
    
    router.get("/allusers", getAllUser);
    router.get("/:username", getUser);
    router.post("", (req, res) => addUser(req, res, false));
    router.delete("", deleteUser);
    router.put("", verifyUserToken, changeEmail);
    router.post("/login", login);

  return router;
}

export { getUsersRoutes };