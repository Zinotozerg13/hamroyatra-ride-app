import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



  const ConfirmRidePopUp = (props) => {
    const [ otp, setOtp ] = useState('')
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        setError('');

        try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
        rideId: props.ride._id,
        otp: otp
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate('/captain-riding', { state: { ride: props.ride } });
    }
  } catch (err) {
    
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  }
};

    
  const ride = props.ride || {
    user: {
      fullname: {
        firstname: 'Swastima',
        lastname: 'Gautam'
      }
    },
    pickup: 'Balaju, Kathmandu',
    destination: 'Basundhara, Kathmandu',
    fare: 115
  };

 

  return (
    <div>
      <h5
        className='p-1 text-center w-[93%] absolute top-0'
        onClick={() => {
          props.setRidePopupPanel?.(false);
        }}
      >
        <i className="text-3xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>

      <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 rounded-full object-cover w-12'
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="User"
          />
          <h2 className='text-lg font-medium capitalize'>
            {ride.user.fullname.firstname + ' ' + ride.user.fullname.lastname}
          </h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-xl text-green-600 ri-map-pin-user-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-xl text-red-500 ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{ride.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-xl text-yellow-500 ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{ride.fare}</h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>

        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className='bg-gray-100 px-5 py-3 text-lg tracking-widest text-center font-mono rounded-xl w-full outline-none focus:ring-2 focus:ring-green-500'
              placeholder='••••'
              maxLength={4}
            
            />
            {error && (
  <p className="text-red-600 mt-2 text-sm text-center">
      setOtp('')
    {error}
  </p>
)}
            <div className='mt-6'>
              <button
                className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'
            >
                Confirm
             </button>
              <button
                onClick={() => {
                  props.setConfirmRidePopupPanel?.(false);
                  props.setRidePopupPanel?.(false);
                }}
                className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;