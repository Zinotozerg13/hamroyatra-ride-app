import React from 'react'
import logo from "../assets/uber.png"; 
import { Link } from 'react-router-dom';
const Start = () => {
  return (
    <div className='bg-cover bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
      <img className="w-40 ml-8 "src="https://api.logo.com/api/v2/images?design=lg_hwDq6ygKPAJ804ZIQ0&format=webp&width=2000&background=transparent&fit=contain&quality=100&u=55983ce62c5b7a9a67dcb88cbb04cec0a66367846a7942256cc2c9ed34685d5e"></img>
      <div className='bg-white pb-7 py-5 px-10'>
      <h1 className='text-2xl font-bold'>Get started with Yatra</h1>
   <Link to="/login"className="flex  items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-2">
            Continue
          </Link></div>
      </div>
  )
}

export default Start