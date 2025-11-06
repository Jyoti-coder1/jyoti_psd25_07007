import express from "express";
import { bookTickets, cancelBooking } from "../controllers/ticket.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/book", authenticate, bookTickets);
router.patch("/cancel/:id", authenticate, cancelBooking);

export default router;