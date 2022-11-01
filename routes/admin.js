import express from "express";
import { addUser, getAllUser } from "../controller/user-controller.js";
import { verifyUserToken, grantAccess } from "../middleware/auth.js";

function getAdminRoutes() {
    const router = express.Router();

    router.post("", (req, res) => addUser(req, res, true));
    router.get("/allusers/:username", verifyUserToken, grantAccess("readAny", "profile") ,(req, res) => getAllUser(req, res, true));

  return router;
}

export { getAdminRoutes };