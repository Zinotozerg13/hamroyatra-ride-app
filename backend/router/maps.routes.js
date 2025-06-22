const express = require('express');
const router = express.Router();
const{query}=require('express-validator')
const authMiddleware = require('../middleware/auth.middleware');
const mapController = require('../controller/map.controller');

router.get('/get-coordinates', 
    query('address').isString().isLength({min:3}),
    authMiddleware.authUser, mapController.getCoordinates);


router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
 query('origin').isString().isLength({min:3}),
authMiddleware.authUser,
mapController.getDistanceTime)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;
