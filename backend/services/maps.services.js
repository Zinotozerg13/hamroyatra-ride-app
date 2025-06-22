const axios = require('axios');
const CaptainModel = require('../models/captain.model');
// Get coordinates from address
module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(address)}&format=json`;

    try {
        const response = await axios.get(url);
        
        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error("No coordinates found for address");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        throw error;
    }
};

// Get distance and time between two locations
module.exports.getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.LOCATIONIQ_API_KEY;
    
    // Get coordinates
    const originCoords = await module.exports.getAddressCoordinate(origin);
    const destCoords = await module.exports.getAddressCoordinate(destination);
    
    // Calculate straight-line distance (good enough for most cases)
    const distance = calculateDistance(
        originCoords.lat, originCoords.lng, 
        destCoords.lat, destCoords.lng
    );
    
    // Estimate driving time (assume 50 km/h average speed)
    const estimatedMinutes = Math.round((distance * 1.3) / 50 * 60); // 1.3 factor for roads
    
    return {
        distance: {
            text: `${distance.toFixed(2)} km`,
            value: distance * 1000 // in meters
        },
        duration: {
            text: `${estimatedMinutes} mins`,
            value: estimatedMinutes * 60 // in seconds
        }
    };
};

// Simple distance calculation
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
              Math.cos(lat1 * Math.PI/180) * Math.cos(lat2 * Math.PI/180) * 
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

 
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.LOCATIONIQ_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${encodeURIComponent(input)}&format=json`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.length > 0) {
            return response.data.map(location => location.display_name).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error('Error fetching autocomplete suggestions:', err.message);
        throw err;
    }
};
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
    // radius in km
    const captains = await CaptainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });
    return captains;
}
