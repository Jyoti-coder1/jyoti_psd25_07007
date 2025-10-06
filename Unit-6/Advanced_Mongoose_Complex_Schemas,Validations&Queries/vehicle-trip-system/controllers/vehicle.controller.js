const Vehicle = require('../models/vehicle.model');

const createVehicle = async (req, res, next) => {
    try {
        const vehicle = new Vehicle(req.body);
        await vehicle.save();
        res.status(201).json({ message: "Vehicle created", vehicle });
    } catch (err) {
        next(err);
    }
};

const getVehicles = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
};

const updateVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json({ message: "Vehicle updated", vehicle });
    } catch (err) {
        next(err);
    }
};

const deleteVehicle = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
        res.json({ message: "Vehicle deleted" });
    } catch (err) {
        next(err);
    }
};

const addTrip = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        vehicle.trips.push(req.body);
        await vehicle.save();
        res.json({ message: "Trip added", vehicle });
    } catch (err) {
        next(err);
    }
};

const updateTrip = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        const trip = vehicle.trips.id(req.params.tripId);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        Object.assign(trip, req.body);
        await vehicle.save();
        res.json({ message: "Trip updated", vehicle });
    } catch (err) {
        next(err);
    }
};

const deleteTrip = async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

        const trip = vehicle.trips.id(req.params.tripId);
        if (!trip) return res.status(404).json({ message: "Trip not found" });

        trip.remove();
        await vehicle.save();
        res.json({ message: "Trip deleted", vehicle });
    } catch (err) {
        next(err);
    }
};

const vehiclesLongTrips = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find({ "trips.distance": { $gt: 200 } });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
};

const vehiclesFromCities = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find({ "trips.startLocation": { $in: ['Delhi', 'Mumbai', 'Bangalore'] } });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
};

const vehiclesAfterDate = async (req, res, next) => {
    try {
        const date = new Date('2024-01-01');
        const vehicles = await Vehicle.find({ "trips.startTime": { $gte: date } });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
};

const vehiclesCarTruck = async (req, res, next) => {
    try {
        const vehicles = await Vehicle.find({ type: { $in: ['car', 'truck'] } });
        res.json(vehicles);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createVehicle, getVehicles, updateVehicle, deleteVehicle,
    addTrip, updateTrip, deleteTrip,
    vehiclesLongTrips, vehiclesFromCities, vehiclesAfterDate, vehiclesCarTruck
};