import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    quantity: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" },
    bookedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Ticket", ticketSchema);