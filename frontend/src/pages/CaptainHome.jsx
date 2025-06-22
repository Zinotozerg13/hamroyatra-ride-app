import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
       if (!captain) return;
  socket.emit('join', {
    userId: captain?._id,
    userType: 'captain'
  });
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    socket.emit('update-location-captain', {
                        userId: captain?._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

         return () => clearInterval(locationInterval)
    }, [])
useEffect(() => {
    if (!socket) return;

    
    console.log('Socket connected:', socket.connected);
    
    socket.on('connect', () => {
        console.log('Socket connected successfully');
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });

    const handleNewRide = (data) => {
        
        setRide(data);
        setRidePopupPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
        socket.off('new-ride', handleNewRide);
        socket.off('connect');
        socket.off('disconnect');
    };
}, [socket]);
    async function confirmRide() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
            rideId: ride?._id,
            captainId: captain?._id,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopupPanel(false)
        setConfirmRidePopupPanel(true)

    } catch (error) {
        console.error('Error confirming ride:', error);
        
        if (error.response?.status === 401) {
            
            console.error('Authentication failed. Token might be expired.');
            
            
            alert('Authentication failed. Please log in again.');
            
        } else {
            
            console.error('Failed to confirm ride:', error.response?.data || error.message);
            alert('Failed to confirm ride. Please try again.');
        }
    }
}

    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

    return (
        <div className='h-screen'>
  <div className='fixed top-0 left-0 right-0 p-6 flex items-center justify-between w-full z-10'>
    <img
      className="w-40"
      src="https://api.logo.com/api/v2/images?design=lg_hwDq6ygKPAJ804ZIQ0&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=6cb619ead44b1e2d364bfcf58b5d4bbcbb25c681b1a28cdc1a4e998bdbb7bc69"
      alt="Yatra Logo"
    />
    <Link to='/captain-home' className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow'>
      <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
  </div>
            <div className='h-3/5'>
                <div className='h-full w-full object-cover' >
                    <LiveTracking/>
                </div>

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
            </div>
        </div>
    )
}

export default CaptainHome