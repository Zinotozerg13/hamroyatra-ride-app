import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const FinishRide = (props) => {
  const navigate = useNavigate()

  async function endRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId: props.ride._id,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if (response.status === 200) {
      navigate('/captain-home')
    }
  }

  return (
    <div className='bg-white p-4 rounded-t-2xl'>
      
      <h5
        className='p-1 text-center w-[93%] absolute top-0 cursor-pointer'
        onClick={() => props.setFinishRidePanel(false)}
      >
        <i className="text-3xl text-gray-700 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold text-black mb-5'>Finish this Ride</h3>

      
      <div className='flex items-center justify-between p-4 border-2 border-yellow-400 bg-yellow-50 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover border-2 border-yellow-300'
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt="User"
          />
          <h2 className='text-lg font-semibold text-gray-800'>
            {props.ride?.user.fullname.firstname}
          </h2>
        </div>
        <h5 className='text-lg font-bold text-green-700'>2.2 KM</h5>
      </div>

   
      <div className='flex flex-col items-center gap-3 w-full mt-5'>
      
        <div className='flex items-center gap-4 p-3 border-b  w-full rounded-md'>
          <i className="ri-map-pin-user-fill text-green-500 text-xl"></i>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>562/11-A</h3>
            <p className='text-sm text-gray-600 -mt-1'>{props.ride?.pickup}</p>
          </div>
        </div>

        
        <div className='flex items-center gap-4 p-3 border-b  w-full rounded-md'>
          <i className="ri-map-pin-2-fill text-red-500 text-xl"></i>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>562/11-A</h3>
            <p className='text-sm text-gray-600 -mt-1'>{props.ride?.destination}</p>
          </div>
        </div>

        
        <div className='flex items-center gap-4 p-3  w-full rounded-md'>
          <i className="text-yellow-400 ri-currency-line  text-xl"></i>
          <div>
            <h3 className='text-lg font-semibold text-gray-800'>NPR{props.ride?.fare}</h3>
            <p className='text-sm text-gray-600 -mt-1'>Cash Payment</p>
          </div>
        </div>
      </div>

      
      <div className='mt-8 w-full'>
        <button
          onClick={endRide}
          className='w-full bg-green-600 hover:bg-green-700 text-white font-semibold text-lg py-3 rounded-lg transition'
        >
          Finish Ride
        </button>
      </div>
    </div>
  )
}

export default FinishRide
