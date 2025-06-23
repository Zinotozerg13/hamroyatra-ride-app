
import React,{ useState, useRef ,useContext,useEffect}  from 'react';
import { useGSAP } from '@gsap/react';
import 'remixicon/fonts/remixicon.css'
import gsap from 'gsap';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const vehicleFoundRef = useRef(null)
   const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
       const [ vehicleType, setVehicleType ] = useState(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
   const [ activeField, setActiveField ] = useState(null)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const vehiclePanelRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    
     const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
     const [ vehicleFound, setVehicleFound ] = useState(false)
const [ fare, setFare ] = useState({})
const [ ride, setRide ] = useState(null)

 const navigate = useNavigate()

 const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

   
    useEffect(() => {
        socket.emit("join", { userType: "user", userId: user?._id })
    }, [ user ])

    socket.on('ride-confirmed', ride => {


        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride) 
        
    })

     socket.on('ride-started', ride => {
        
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })


     const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
     
        setPickupSuggestions(response.data);
    } catch (error) {
        console.error("Error fetching pickup suggestions:", error);
        setPickupSuggestions([]); // Fallback to empty array to prevent crashing
    }
};

const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
       
        setDestinationSuggestions(response.data);
    } catch (error) {
        console.error("Error fetching destination suggestions:", error);
        setDestinationSuggestions([]); // Fallback to empty array to prevent crashing
    }
};
    
  const submitHandler=(e)=>{
    
    e.preventDefault()
  }
  useGSAP(() => {
  if (panelOpen) {
    gsap.to(panelRef.current, {
      height: '70%',
      padding: 24,
    });
    gsap.to(panelCloseRef.current, {
      opacity: 1,
    });
  } else {
    gsap.to(panelRef.current, {
      height: '0%',
      padding: 0,
    });
    gsap.to(panelCloseRef.current, {
      opacity: 0,
    });
  }
}, { dependencies: [panelOpen] });
// Add this useEffect to set initial positions
useEffect(() => {
    // Set initial positions for all panels
    gsap.set([vehiclePanelRef.current, confirmRidePanelRef.current, vehicleFoundRef.current, waitingForDriverRef.current], {
        y: '100%'
    });
}, []);

// Updated GSAP animations - replace your existing useGSAP hooks with these:

useGSAP(function () {
    if (confirmRidePanel) {
        gsap.to(confirmRidePanelRef.current, {
            y: '0%',
            duration: 0.3,
            ease: "power2.out"
        })
    } else {
        gsap.to(confirmRidePanelRef.current, {
            y: '100%',
            duration: 0.3,
            ease: "power2.out"
        })
    }
}, [confirmRidePanel])

useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            y: '0%',
            duration: 0.3,
            ease: "power2.out"
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            y: '100%',
            duration: 0.3,
            ease: "power2.out"
        })
    }
}, [vehiclePanel])

useGSAP(function () {
    if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
            y: '0%',
            duration: 0.3,
            ease: "power2.out"
        })
    } else {
        gsap.to(vehicleFoundRef.current, {
            y: '100%',
            duration: 0.3,
            ease: "power2.out"
        })
    }
}, [vehicleFound])

useGSAP(function () {
    if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
            y: '0%',
            duration: 0.3,
            ease: "power2.out"
        })
    } else {
        gsap.to(waitingForDriverRef.current, {
            y: '100%',
            duration: 0.3,
            ease: "power2.out"
        })
    }
}, [waitingForDriver])
   async function findTrip() {
        setVehiclePanel(true)
        setPanelOpen(false)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })


        setFare(response.data)


    }

    async function createRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

   
}

  return (
   <div className="h-screen relative overflow-hidden">
     
      <img
  className="w-40 absolute left-5 top-5"
  src="https://api.logo.com/api/v2/images?design=lg_hwDq6ygKPAJ804ZIQ0&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=6cb619ead44b1e2d364bfcf58b5d4bbcbb25c681b1a28cdc1a4e998bdbb7bc69"
  alt="Uber Logo"
/>

      <div className="h-screen w-screen">
          <LiveTracking />
      </div>

     
       
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[35%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <h4 className="text-[0.8rem] text-red-600 font-semibold">Plz type slowly</h4>

                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>
                    <button
                    onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
            </div>
     <div ref={vehiclePanelRef} className='fixed translate-y-full w-full z-10 bottom-0 bg-white px-4 py-8 pt-12'>
      <VehiclePanel
                    setVehicleType={setVehicleType}
                    createRide={createRide}
                    fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
     </div>

     <div ref={confirmRidePanelRef} className='fixed translate-y-full w-full z-10 bottom-0 bg-white px-4 py-8 pt-12'>
      <ConfirmRide
                    createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}

                    setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
</div>

     <div ref={vehicleFoundRef}className='fixed translate-y-full w-full z-10 bottom-0 bg-white px-4 py-8 pt-12'>
    <LookingForDriver
     createRide={createRide}
                    pickup={pickup}
                    destination={destination}
                    fare={fare}
                    vehicleType={vehicleType}
                     setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} setWaitingForDriver={setWaitingForDriver} />
</div>


     <div  ref={waitingForDriverRef} className='fixed translate-y-full w-full z-10 bottom-0 bg-white px-4 py-8 pt-12'>
   <WaitingForDriver 
   ride={ride}
    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
</div>
            
    </div>
    
  );
};

export default Home;
