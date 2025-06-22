
import { Link, useNavigate } from 'react-router-dom';
import React, { useState,useContext } from 'react';
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'


const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [userData, setUserData] = useState({})
   
    const{user,setUser}=useContext(UserDataContext)
    const navigate=useNavigate();
  const submitHandler=async (e)=>
  {
    e.preventDefault()
    const loginUser={
      email:email,
      password:password
    }
    console.log(loginUser);
    try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, loginUser);
    

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token',data.token) 
      navigate("/home");
  } }catch (error) {
    console.log("Registration failed:", error);
  }
  
    setEmail('')
    setpassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
     <div><img className="w-40  mb-10" src="https://api.logo.com/api/v2/images?design=lg_hwDq6ygKPAJ804ZIQ0&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=6cb619ead44b1e2d364bfcf58b5d4bbcbb25c681b1a28cdc1a4e998bdbb7bc69" />
     <form onSubmit={submitHandler}>

        <h3 className=' text-lg font-medium mb-2'>Whats your email?</h3>
        <input 
        value={email} 
        onChange={(e)=>{setEmail(e.target.value)}}
        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg  placeholder:text-base" 
        required type='email'
        placeholder='email@example.com'/>

         <h3 className='text-lg font-medium mb-2'>Password</h3>
        <input 
        value={password}
         onChange={(p)=>{setpassword(p.target.value)}}
         className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg  placeholder:text-base" 
           required type='password'
           placeholder='*******'/>

        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg  placeholder:text-base">Login</button>
               <p className='text-center'>New here? <Link to="/signup"className='text-blue-600'>Create new Account</Link></p>
        </form>
        </div>
        <div>

        <Link to="/captain-login" className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg  placeholder:text-base">Signin as captain</Link>
        </div>
    </div>
  )
}

export default UserLogin