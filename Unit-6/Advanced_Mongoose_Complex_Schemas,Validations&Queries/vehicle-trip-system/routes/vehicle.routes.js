const express = require('express');
const router = express.Router();
const {
    createVehicle, getVehicles, updateVehicle, deleteVehicle,
    addTrip, updateTrip, deleteTrip,
    vehiclesLongTrips, vehiclesFromCities, vehiclesAfterDate, vehiclesCarTruck
} = require('../controllers/vehicle.controller');

// Vehicle CRUD
router.post('/vehicles', createVehicle);
router.get('/vehicles', getVehicles);
router.put('/vehicles/:id', updateVehicle);
router.delete('/vehicles/:id', deleteVehicle);

// Trip CRUD
router.post('/vehicles/:id/trips', addTrip);
router.put('/vehicles/:id/trips/:tripId', updateTrip);
router.delete('/vehicles/:id/trips/:tripId', deleteTrip);

// Advanced Queries
router.get('/vehicles/trips/long', vehiclesLongTrips);
router.get('/vehicles/trips/cities', vehiclesFromCities);
router.get('/vehicles/trips/after-date', vehiclesAfterDate);
router.get('/vehicles/type/car-truck', vehiclesCarTruck);

module.exports = router;