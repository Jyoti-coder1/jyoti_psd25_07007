const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    requestedAt: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'cancelled'], default: 'pending' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    notes: String
});

module.exports = mongoose.model('Booking', bookingSchema);