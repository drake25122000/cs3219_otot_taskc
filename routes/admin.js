import express from "express";
import { addUser } from "../controller/user-controller.js";
import { verifyAdminToken } from "../middleware/auth.js";

function getAdminRoutes() {
    const router = express.Router();

    router.post("", (req, res) => addUser(req, res, true));

  return router;
}

export { getAdminRoutes };