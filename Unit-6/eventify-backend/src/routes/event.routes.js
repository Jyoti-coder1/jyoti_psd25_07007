import express from "express";
import { createEvent, listEvents } from "../controllers/event.controller.js";
import { authenticate, authorizeRoles } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", listEvents);
router.get("/", authenticate, authorizeRoles("admin"));

export default router;