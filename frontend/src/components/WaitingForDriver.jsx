import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0 cursor-pointer"
        onClick={() => props.waitingForDriver(false)}
      >
        <i className="text-3xl text-grey-500 ri-arrow-down-wide-line"></i>
      </h5>

   
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md mb-4">
        <div className="text-right w-full">
          <h2 className="text-lg font-bold text-black capitalize">
            {props.ride?.captain.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold text-gray-700 -mt-1 -mb-1">
            {props.ride?.captain.vehicle.plate}
          </h4>
          
          <h1 className="text-lg font-semibold text-orange-600">{props.ride?.otp}</h1>
        </div>
      </div>

      {/* Ride Details */}
      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-2">
          {/* Pickup */}
          <div className="flex items-center gap-4 p-3 border-b-2 bg-white rounded-md mb-2 shadow-sm">
            <i className="ri-map-pin-user-fill text-green-500 text-xl"></i>
            <div>
              <h3 className="text-lg font-medium text-gray-800">562/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">{props.ride?.pickup}</p>
            </div>
          </div>

          {/* Destination */}
          <div className="flex items-center gap-4 p-3 border-b-2 bg-white rounded-md mb-2 shadow-sm">
            <i className="ri-map-pin-2-fill text-red-500 text-xl"></i>
            <div>
              <h3 className="text-lg font-medium text-gray-800">562/11-A</h3>
              <p className="text-sm text-gray-600 -mt-1">{props.ride?.destination}</p>
            </div>
          </div>

          {/* Fare */}
          <div className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm">
            <i className="ri-currency-line text-yellow-500 text-xl"></i>
            <div>
              <h3 className="text-lg font-medium text-gray-800">₹{props.ride?.fare}</h3>
              <p className="text-sm text-gray-600 -mt-1">Cash Payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver
