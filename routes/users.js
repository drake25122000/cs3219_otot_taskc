import express from "express";
import { getUser, addUser, deleteUser, changeEmail, login, getAllUser } from "../controller/user-controller.js";
import { verifyUserToken, grantAccess } from "../middleware/auth.js";

function getUsersRoutes() {
    const router = express.Router();
    
    router.get("/:username", verifyUserToken, grantAccess("readOwn", "profile") ,getUser);
    router.post("", (req, res) => addUser(req, res, false));
    router.delete("", verifyUserToken, grantAccess("deleteOwn", "profile"), deleteUser);
    router.put("", verifyUserToken, grantAccess("updateOwn", "profile") , changeEmail);
    router.post("/login", login);

  return router;
}

export { getUsersRoutes };