import React from 'react'

import { Hourglass } from 'ldrs/react'
import 'ldrs/react/Hourglass.css'
const LoadingPage = () => {
  return (
    <div className='h-screen bg-[#1D1A1C] flex flex-col items-center justify-center'>
         <Hourglass
           size="70"
           bgOpacity="0.1"
           speed="1.75"
           color="#CD00E7" 
         /> 
         <p className='text-white text-lg animate-pulse'>Loading...</p>
    </div>
  )
}

export default LoadingPage



// Default values shown
