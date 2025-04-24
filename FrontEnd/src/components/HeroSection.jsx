import React from 'react'
import Hero from '../assets/Hero.webp'
import Locator from '../assets/locator.gif'
import { Link } from 'react-router-dom'
const HeroSection = () => {
  return (
    <>
      <div className='relative mx-3 mt-8 mb-3 rounded-lg h-[35rem] overflow-hidden'>
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${Hero})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5, // Only applies to the background
          }}
        ></div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
          <img src={Locator} alt="locator" className="h-32 md:h-[10rem] rounded-full mb-4 border-4 border-dotted" />
          <h2 className="sm:text-2xl md:text-3xl font-bold">Campus Navigator</h2>
          <p className="text-lg md:text-xl">Computer Science Department</p>
          <div className="relative inline-flex items-center justify-center">
           <span className="absolute top-8 inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></span>
           <button className="relative top-8 px-6 py-3 bg-linear-65 from-[#9000A2] to-[#B8039D] text-white font-semibold rounded-full z-10 hover:bg-purple-700 cursor-pointer">
             <Link to="/navigator">Navigate</Link>
          </button>
</div>

        </div>
      </div>
    </>
  )
}

export default HeroSection
