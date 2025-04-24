import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Logo.png'


const Navbar = () => {

  return (
   <>
   <div className='p-3'>
  <nav className='sticky top-0 left-0  flex justify-start items-center py-3 px-3 bg-linear-65 from-purple-500 to-pink-500  drop-shadow-md z-20 rounded-lg'>
   <div className='flex items-center justify-start text-xl text-white font-semibold hover:text-[#1E041C] cursor-pointer'><img src={Logo} alt="logo" className='h-[3rem] rounded-full' /> <span className='ml-2'><Link to="/">CS Department Navigator</Link></span></div>
      
       
  </nav>
  </div>
   </>
  )
}

export default Navbar