import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const center = {
    lat:  27.73792,
    lng: 85.306513
};

// Component to handle map centering
const MapController = ({ center }) => {
    const map = useMap();
    
    useEffect(() => {
        map.setView([center.lat, center.lng], map.getZoom());
    }, [center, map]);
    
    return null;
};

const LiveTracking = () => {
    const [currentPosition, setCurrentPosition] = useState(center);
    const LOCATIONIQ_API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY || 'your_locationiq_api_key_here';

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition(); // Initial position update
        const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div 
            className="fixed top-0 left-0 w-full h-full"
            style={{ pointerEvents: 'none', zIndex: -999 }}
        >
            <MapContainer
                center={[currentPosition.lat, currentPosition.lng]}
                zoom={15}
                style={{ width: '100%', height: '100%' }}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
                doubleClickZoom={false}
                touchZoom={false}
                keyboard={false}
            >
                 
                    <TileLayer
                        attribution='&copy; <a href="https://locationiq.com">LocationIQ</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                        url={`https://tiles.locationiq.com/v3/streets/r/{z}/{x}/{y}.png?key=${LOCATIONIQ_API_KEY}`}
                    />
                    
                    
                    {LOCATIONIQ_API_KEY === 'your_locationiq_api_key_here' && (
                        <TileLayer
                            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    )}
                    
                   
                    <Marker position={[currentPosition.lat, currentPosition.lng]}>
                        <Popup>
                            <div>
                                <strong>Your Current Location</strong><br />
                                Lat: {currentPosition.lat.toFixed(6)}<br />
                                Lng: {currentPosition.lng.toFixed(6)}
                            </div>
                        </Popup>
                    </Marker>
                    
                    <MapController center={currentPosition} />
                </MapContainer>
        </div>
    )
}

export default LiveTracking