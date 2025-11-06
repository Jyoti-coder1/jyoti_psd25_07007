import express from "express";
import { adminReport } from "../controllers.ticket.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware";
const router = express.Router();

router.get("/report", authenticate, authorizeRoles("admin"), adminReport);

export default router;