import React, { useContext, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!socket) return

        socket.on('ride-ended', () => {
            navigate('/home')
        })

        return () => {
            socket.off('ride-ended')
        }
    }, [socket, navigate])

    return (
        <div className='relative h-screen '>
            
            <Link to='/home' className='fixed right-2 top-2 h-9 w-9 bg-white shadow-md flex items-center justify-center rounded-full z-20'>
                <i className="text-base text-blue-600 ri-home-5-line"></i>
            </Link>

        
            <div className='h-full pb-[200px] overflow-hidden'>
                <LiveTracking />
            </div>

          
            <div className='fixed bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-2xl z-10'>
                
                <div className='text-center mb-3'>
                    <h2 className='text-base font-semibold text-gray-700 capitalize'>
                        {ride?.captain.fullname.firstname}
                    </h2>
                    <h4 className='text-md font-semibold text-gray-700 -mt-1'>
                        {ride?.captain.vehicle.plate}
                    </h4>
                    <p className='text-sm text-gray-500'>Verified Captain ✅</p>
                </div>

                
                <div className='flex flex-col gap-2'>
                    <div className='flex items-center gap-3 p-2  rounded-md'>
                        <i className="ri-map-pin-2-fill text-red-600 text-lg"></i>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-800'>562/11-A</h3>
                            <p className='text-xs text-gray-600 -mt-1'>{ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-3 p-2  rounded-md'>
                        <i className="ri-currency-line text-yellow-600 text-lg"></i>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-800'>₹{ride?.fare}</h3>
                            <p className='text-xs text-gray-600 -mt-1'>Cash Payment</p>
                        </div>
                    </div>
                </div>

               
                <Link to='/home' className='w-full mt-4 bg-green-600 hover:bg-green-700 transition text-white text-sm font-semibold py-2 rounded-md'>
                    Make a Payment
                </Link >
            </div>
        </div>
    )
}

export default Riding
