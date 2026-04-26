import React from 'react'
import { useState } from 'react'

const LoginForm = () => {

    const [client , setClient]=useState({})
  return (
     <div className='absolute top-16 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-6 w-80 z-50 transition-colors duration-300'>
          <h3 className='text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100'>Create Account</h3>
          <form className='space-y-3'>
            <input
              type='text'
              placeholder='Full Name'
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            />
            <input
              type='email'
              placeholder='Email'
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            />
            <input
              type='password'
              placeholder='Password'
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors'
            />
            <button
              type='submit'
              className='w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all'
            >
              Sign Up
            </button>
          </form>
          <p className='text-sm text-gray-600 dark:text-gray-400 mt-4 text-center'>
            Already have an account? <a href='#' className='text-blue-500 hover:underline'>Sign In</a>
          </p>
        </div>
  )
}

export default LoginForm