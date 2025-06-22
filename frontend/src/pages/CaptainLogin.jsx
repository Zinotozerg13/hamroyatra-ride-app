import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const captainData = {
        email: email,
        password: password
      }

      // Debug logs
      console.log('Attempting login with:', { email, password: '***' })
      console.log('API URL:', `${import.meta.env.VITE_BASE_URL}/captains/login`)
      console.log('Request data:', captainData)

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`, 
        captainData
      )

      console.log('Login response:', response)
      console.log('Response data:', response.data)
      console.log('Response status:', response.status)

      // Check for success status codes (200 or 201)
      if (response.status === 200 || response.status === 201) {
        const data = response.data
        
        console.log('Login successful, setting captain:', data.captain)
        console.log('Token received:', data.token)
        
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }

      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Full error object:', error)
      console.error('Error response:', error.response)
      console.error('Error request:', error.request)
      console.error('Error message:', error.message)
      
      if (error.response) {
        // Server responded with error status
        console.log('Server error status:', error.response.status)
        console.log('Server error data:', error.response.data)
        setError(error.response.data.message || `Login failed: ${error.response.status}`)
      } else if (error.request) {
        // Request made but no response
        console.log('No response received:', error.request)
        setError('Network error. Please check your connection.')
      } else {
        // Something else happened
        console.log('Request setup error:', error.message)
        setError('An unexpected error occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />

        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            disabled={isLoading}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
            disabled={isLoading}
          />

          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base disabled:opacity-50'
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className='text-center'>
          Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link>
        </p>
      </div>

      <div>
        <Link
          to='/login'
          className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default Captainlogin