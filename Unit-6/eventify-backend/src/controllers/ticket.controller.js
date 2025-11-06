import Ticket from "../models/ticket.model.js";
import Event from "../models/event.model.js";
import { sendToUserAndSuperAdmin } from "../utils/sendEmail.js";
import mongoose from "mongoose";

export const bookTickets = async (req, res) => {
    try {
        const userId = req.user._id;
        const { eventId, quantity } = req.body;
        if (!eventId || !quantity || quantity <= 0) return res.status(400).json({ message: "Invalid input" });

        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ message: "Event not found" });

        const totalAmount = event.basePrice * quantity;
        const ticket = new Ticket({
            userId,
            eventId,
            quantity,
            totalAmount
        });
        await ticket.save();

        const html = `
            <h3>Eventify - Booking Confirmed</h3>
            <p>Your booking is confirmed!</p>
            <p><strong>Event:</strong> ${event.name}</p>
            <p><strong>Tickets:</strong> ${quantity}</p>
            <p><strong>Total Amount:</strong> ₹${totalAmount}</p>
        `;
        try {
            await sendToUserAndSuperAdmin({ userEmail: req.user.email, subject: "Booking Confirmed - Eventify", html });
        } catch (err) {
            console.error("Email error:", err);
        }

        return res.status(201).json({ message: "Tickets booked successfully", bookingId: ticket._id, totalAmount });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await Ticket.findById(ticketId).populate("eventId");
        if (!ticket) return res.status(404).json({ message: "Ticket not found" });
        if (ticket.userId.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to cancel this booking" });
        }
        ticket.status = "cancelled";
        await ticket.save();

        const html = `
            <h3>Eventify - Booking Cancelled</h3>
            <p>Your booking for <strong>${ticket.eventId.name}</strong> has been cancelled.</p>
        `;
        try {
            await sendToUserAndSuperAdmin({ userEmail: req.user.email, subject: "Booking Cancelled - Eventify", html });
        } catch (err) {
            console.error("Email error:", err);
        }

        return res.json({ message: "Booking cancelled successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const adminReport = async (req, res) => {
    try {
        const pipeline = [
            { $match: { status: "booked" } },
            {
                $lookup: {
                    from: "events",
                    localField: "eventId",
                    foreignField: "_id",
                    as: "event"
                }
            },
            { $unwind: "$event" },
            {
                $group: {
                    _id: "$event.category",
                    bookings: { $sum: 1 },
                    revenue: { $sum: "$totalAmount" }
                }
            },
            {
                $project: {
                    category: "$_id",
                    bookings: 1,
                    totalTickets: 1,
                    revenue: 1,
                    _id: 0
                }
            }
        ];

        const categoryBreakdown = await Ticket.aggregate(pipeline);

        // total revenue & total bookings
        const totals = await Ticket.aggregate([
            { $match: { status: "booked" } },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$totalAmount" },
                    totalBookings: { $sum: 1 }
                }
            }
        ]);

        const totalRevenue = totals[0]?.totalRevenue || 0;
        const totalBookings = totals[0]?.totalBookings || 0;

        // avgSpendPerUser: compute spend per user then avg
        const perUser = await Ticket.aggregate([
            { $match: { status: "booked" } },
            {
                $group: {
                    _id: "$userId",
                    spend: { $sum: "$totalAmount" }
                }
            },
            {
                $group: {
                    _id: null,
                    avgSpend: { $avg: "$spend" }
                }
            }
        ]);
        const avgSpendPerUser = perUser[0]?.avgSpend || 0;

        return res.json({
            summary: {
                totalBookings,
                totalRevenue,
                avgSpendPerUser: Math.round(avgSpendPerUser) // round for readability
            },
            categoryBreakdown
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
