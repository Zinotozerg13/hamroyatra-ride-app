const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.services');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const Captain = require('../models/captain.model');


module.exports.createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

       

       
        if (!req.user) {
            return res.status(401).json({ 
                message: 'User not authenticated. Please login first.' 
            });
        }

        if (!req.user._id) {
            return res.status(400).json({ 
                message: 'User ID not found in request.' 
            });
        }

        const { pickup, destination, vehicleType } = req.body;

        // Validate required fields
        if (!pickup || !destination || !vehicleType) {
            return res.status(400).json({ 
                message: 'Missing required fields: pickup, destination, vehicleType' 
            });
        }

   

        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            pickupCoordinates.lat,
            pickupCoordinates.lng,
            2  // 2 km radius
        );

        ride.otp = '';
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        // Send notifications to captains
        captainsInRadius.forEach(captain => {
           
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });

        // Send response back to client
        return res.status(201).json({
            success: true,
            message: 'Ride created successfully',
            ride: rideWithUser,
            captainsNotified: captainsInRadius.length
        });

    } catch (err) {
        console.error('Create ride error:', err);
        return res.status(500).json({ 
            message: 'Internal server error',
            error: err.message 
        });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    

    try {
        
        if (!req.captain) {
            return res.status(401).json({ message: 'Captain not authenticated' });
        }

        const ride = await rideService.confirmRide({ rideId,captain:req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}
module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;

    try {
        const ride = await rideService.startRide({ rideId, otp, captain: req.captain });

       

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}