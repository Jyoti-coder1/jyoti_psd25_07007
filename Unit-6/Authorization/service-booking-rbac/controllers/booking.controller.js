const Booking = require('../models/Booking');
const User = require('../models/User');

exports.createBooking = async (req, res) => {
    try {
        const { serviceName, requestedAt, notes } = req.body;
        if (!serviceName || !requestedAt) return res.status(400).json({ message: 'serviceName and requestedAt required' });

        const booking = await Booking.create({
            serviceName,
            requestedAt: new Date(requestedAt),
            createdBy: req.user.id,
            notes
        });
        return res.status(201).json({ message: 'Booking created', booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.getBookings = async (req, res) => {
    try {
        const { role, id } = req.user;
        let bookings;
        if (role === 'admin') {
            bookings = await Booking.find().populate('createdBy', 'name email role');
        } else {
            bookings = await Booking.find({ createdBy: id }).populate('createdBy', 'name email role');
        }
        return res.json(bookings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (booking.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
        if (booking.status !== 'pending') return res.status(400).json({ message: 'Only pending bookings can be updated' });

        const { serviceName, requestedAt, notes } = req.body;
        if (serviceName) booking.serviceName = serviceName;
        if (requestedAt) booking.requestedAt = new Date(requestedAt);
        if (notes) booking.notes = notes;

        await booking.save();
        return res.json({ message: 'Booking updated', booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findById(bookingId);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        if (req.user.role === 'admin') {
            await booking.remove();
            return res.json({ message: 'Booking deleted by admin' });
        }

        if (booking.createdBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not allowed' });
        if (booking.status !== 'pending') return res.status(400).json({ message: 'Only pending bookings can be cancelled' });

        booking.status = 'cancelled';
        await booking.save();
        return res.json({ message: 'Booking cancelled' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.approveBooking = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.status !== 'pending') return res.status(400).json({ message: 'Only pending bookings can be approved' });

        booking.status = 'approved';
        await booking.save();
        return res.json({ message: 'Booking approved', booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};

exports.rejectBooking = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Booking not found' });
        if (booking.status !== 'pending') return res.status(400).json({ message: 'Only pending bookings can be rejected' });

        booking.status = 'rejected';
        await booking.save();
        return res.json({ message: 'Booking rejected', booking });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};