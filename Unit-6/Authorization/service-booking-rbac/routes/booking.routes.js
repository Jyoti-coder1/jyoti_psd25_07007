const express = require('express');
const router = express.Router();
const bookingCtrl = require('../controllers/booking.controller');
const auth = require('../middleware/auth.middleware');
const { permit } = require('../middleware/rbac.middleware');

router.post('/', auth, bookingCtrl.createBooking);
router.get('/', auth, bookingCtrl.getBookings);
router.put('/:id', auth, bookingCtrl.updateBooking);
router.delete('/:id', auth, bookingCtrl.deleteBooking);
router.patch('/:id/approve', auth, permit('admin'), bookingCtrl.approveBooking);
router.patch('/:id/reject', auth, permit('admin'), bookingCtrl.rejectBooking);

module.exports = router;