import express from "express";
import { getUsersRoutes } from "./users.js";
import { getAdminRoutes } from "./admin.js";

function getRoutes() {
  const router = express.Router();
  
  router.use("/user", getUsersRoutes());
  router.use("/admin", getAdminRoutes());

  return router;
}

export { getRoutes };