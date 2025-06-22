import React, {useContext, useEffect} from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
    
    
     const { captain } = useContext(CaptainDataContext)
           
    return (
        <div className='relative z-10 bg-white p-6 m-4 rounded-xl shadow-lg min-h-screen'>
            <div className='flex items-center justify-between mb-8'>
                <div className='flex items-center gap-3'>
                    <img
                        className='h-12 w-12 rounded-full object-cover border border-gray-300'
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
                        alt="Captain"
                    />
                    <h4 className='text-xl font-semibold text-gray-800 capitalize'>
                        {captain?.fullname?.firstname + " " + captain?.fullname?.lastname}
                    </h4>
                </div>
                <div className='text-right'>
                    <h4 className='text-2xl font-bold text-green-600'>₹295.20</h4>
                    <p className='text-sm text-gray-500'>Earned</p>
                </div>
            </div>
            
            <div className='flex p-6 bg-white shadow-md rounded-xl justify-center gap-8 items-start'>
                <div className='text-center'>
                    <i className="ri-timer-2-line text-4xl text-blue-500 mb-3"></i>
                    <h5 className='text-2xl font-medium text-gray-800 mb-1'>10.2</h5>
                    <p className='text-sm text-gray-500'>Hours Online</p>
                </div>
                <div className='text-center'>
                    <i className="ri-speed-up-line text-4xl text-red-500 mb-3"></i>
                    <h5 className='text-2xl font-medium text-gray-800 mb-1'>10.2</h5>
                    <p className='text-sm text-gray-500'>Speed Index</p>
                </div>
                <div className='text-center'>
                    <i className="ri-booklet-line text-4xl text-yellow-500 mb-3"></i>
                    <h5 className='text-2xl font-medium text-gray-800 mb-1'>10.2</h5>
                    <p className='text-sm text-gray-500'>Trips Completed</p>
                </div>
            </div>

            
            <div className="mt-8 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Today's Summary</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Total Distance</p>
                            <p className="text-lg font-medium text-gray-800">124.5 km</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Average Rating</p>
                            <p className="text-lg font-medium text-gray-800">4.8 ⭐</p>
                        </div>
                    </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Recent Activity</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Trip to Airport</span>
                            <span className="text-sm font-medium text-green-600">+₹85.50</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">City Center Ride</span>
                            <span className="text-sm font-medium text-green-600">+₹45.20</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">Mall Pickup</span>
                            <span className="text-sm font-medium text-green-600">+₹32.80</span>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Performance Bonus</h3>
                    <p className="text-sm text-gray-600 mb-2">Great job! You've maintained excellent ratings.</p>
                    <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                        Bonus Eligible: ₹50.00
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;