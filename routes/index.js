import express from "express";
import { getUsersRoutes } from "./users.js";

function getRoutes() {
  const router = express.Router();
  
  router.use("/user", getUsersRoutes());

  return router;
}

export { getRoutes };