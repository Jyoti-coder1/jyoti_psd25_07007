import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true, enum: ["concert", "sports", "conference", "comedy"] },
    date: { type: Date, required: true },
    basePrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model("Event", eventSchema);