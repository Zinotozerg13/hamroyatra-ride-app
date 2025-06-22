import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'


const UserSignup = () => {

    
     const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({})

  const navigate=useNavigate();
  const{user,setUser}=React.useContext(UserDataContext)

         const submitHandler=async (e)=>
         {
           e.preventDefault()
             const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };


   

  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token) 
      navigate("/home"); 
    }
  } catch (error) {
    console.log("Registration failed:", error);
  }

    
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
     <div> <img
  className="w-40 mb-5"
  src="https://api.logo.com/api/v2/images?design=lg_hwDq6ygKPAJ804ZIQ0&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=6cb619ead44b1e2d364bfcf58b5d4bbcbb25c681b1a28cdc1a4e998bdbb7bc69"
  alt="Yatra Logo"
/>
     <form onSubmit={submitHandler}>

        <h3 className=' text-lg font-medium mb-2'>Whats your Name?</h3>
        <div className='flex gap-4 mb-5'>
        <input 
        className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg  placeholder:text-lg" 
        required type='text'
        value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
        placeholder='FirstName'/>
        <input 
        className="bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg  placeholder:text-lg" 
        required type='text'
            placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
        />
        </div>
       
        <h3 className=' text-lg font-medium mb-2'>Whats your email?</h3>
        <input 
        
        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg  placeholder:text-lg" 
        required type='email'
          value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
        placeholder='email@example.com'/>

         <h3 className='text-lg font-medium mb-2'>Password</h3>
        <input 
         className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg  placeholder:text-lg" 
           value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
           required type='password'
           placeholder='*******'/>

        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-3  w-full text-lg  placeholder:text-lg">Sign up</button>
               <p className='text-center'>Already have a Account? <Link to="/login"className='text-blue-600'>Login Here</Link></p>
        </form>
        </div>
        <div>

        <p className='text-xs'>By signing up, you agree to receive emails and updates from us regarding your account, promotions, and services.</p>
        </div>
    </div>
  )
}

export default UserSignup