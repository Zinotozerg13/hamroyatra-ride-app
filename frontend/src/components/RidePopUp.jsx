import React, { useState } from 'react'

const RidePopUp = (props) => {
    
    const demoRide = {
        user: {
            fullname: {
                firstname: "Swastima",
                lastname: "Gautam"
            }
        },
        pickup: "Balaju, Kathmandu",
        destination: "Baisdhara, Kathmandu", 
        fare: 115
    };

    
    const ride = props.ride || demoRide;

    return (
        <div className="relative z-20 bg-white p-4 rounded-t-2xl shadow-2xl">
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel && props.setRidePopupPanel(false)
            }}>
                <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
            </h5>
            
            <h3 className='text-2xl font-semibold mb-5 mt-4'>New Ride Available!</h3>
            
            <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3'>
                    <img 
                        className='h-12 rounded-full object-cover w-12' 
                        src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" 
                        alt="User" 
                    />
                    <h2 className='text-lg font-medium'>
                        {ride?.user.fullname.firstname + " " + ride?.user.fullname.lastname}
                    </h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-green-600 text-xl ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup Location</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-red-600 text-xl ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="text-green-600 text-xl ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                        </div>
                    </div>
                </div>
                
                <div className='mt-5 w-full'>
                    <button 
                        onClick={() => {
                             props.setConfirmRidePopupPanel(true)
                        props.confirmRide()

                        }} 
                        className='bg-green-600 hover:bg-green-700 w-full text-white font-semibold p-3 px-10 rounded-lg transition-colors duration-200'
                    >
                        Accept Ride
                    </button>
                    
                    <button 
                        onClick={() => {
                            props.setRidePopupPanel && props.setRidePopupPanel(false)
                        }} 
                        className='mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold p-3 px-10 rounded-lg transition-colors duration-200'
                    >
                        Ignore
                    </button>
                </div>
            </div>
        </div>
    )
}

// Demo wrapper component to show the popup
const RidePopUpDemo = () => {
    const [showPopup, setShowPopup] = useState(true);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const handleConfirmRide = () => {
        alert("Ride accepted! Navigating to pickup location...");
    };

    if (!showPopup) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <button 
                    onClick={() => setShowPopup(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    Show New Ride Popup
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 relative">
            {/* Simulated map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <p className="text-gray-500 text-lg">Map Background</p>
            </div>
            
            {/* Popup overlay */}
            <div className="fixed bottom-0 left-0 right-0 z-10">
                <RidePopUp 
                    setRidePopupPanel={setShowPopup}
                    setConfirmRidePopupPanel={setShowConfirmPopup}
                    confirmRide={handleConfirmRide}
                />
            </div>
        </div>
    );
};

export default RidePopUp;