import React from 'react';

const ConfirmRide = (props) => {
  return (
    <div className="relative bg-white rounded-t-3xl shadow-xl px-6 py-6 w-full max-w-md mx-auto">
      
     
      <div
        onClick={() => props.setConfirmRidePanel(false)}
        className="absolute top-2 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <i className="ri-arrow-down-wide-line text-2xl text-gray-400"></i>
      </div>

      
      <h2 className="text-xl font-bold text-center mb-6 mt-6">
        Confirm Your Ride
      </h2>

      <div className="space-y-5">
        
        <div className="flex items-start gap-4">
          <i className="ri-map-pin-user-fill text-xl text-green-600 mt-1"></i>
          <div>
            <p className="text-sm font-semibold text-gray-800">Pickup</p>
            <p className="text-sm text-gray-600">{props.pickup || 'New Road, Kathmandu'}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <i className="ri-map-pin-fill text-xl text-red-500 mt-1"></i>
          <div>
            <p className="text-sm font-semibold text-gray-800">Destination</p>
            <p className="text-sm text-gray-600">{props.destination || 'Pulchowk, Lalitpur'}</p>
          </div>
        </div>

       
        <div className="flex items-start gap-4">
          <i className="ri-wallet-3-fill text-xl text-yellow-500 mt-1"></i>
          <div>
            <p className="text-sm font-semibold text-gray-800">Estimated Fare</p>
            <p className="text-sm text-gray-600">NPR {props.fare?.[props.vehicleType] || 350} (Cash)</p>
          </div>
        </div>
      </div>

      
      <button
        onClick={() => {
          props.setVehicleFound(true);
          props.createRide();
          props.setConfirmRidePanel(false);
        }}
        className="w-full mt-6 bg-green-600 text-white font-semibold py-3 rounded-xl text-center hover:bg-green-700 transition"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
