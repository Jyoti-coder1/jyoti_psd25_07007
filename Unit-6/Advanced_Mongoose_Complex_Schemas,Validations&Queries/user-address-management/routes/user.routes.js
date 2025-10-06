const express = require('express');
const router = express.Router();
const { createUser, addAddress, getSummary, getUserById, deleteAddress } = require('../controllers/user.controller');

router.post('/users', createUser);
router.post('/users/:userId/address', addAddress);
router.get('/users/summary', getSummary);
router.get('/users/:userId', getUserById);
router.delete('/users/:userId/address/:addressId', deleteAddress);

module.exports = router;