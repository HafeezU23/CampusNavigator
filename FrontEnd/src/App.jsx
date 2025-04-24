import React from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Navigator from './components/Navigator'
import LoadingPage from './components/LoadingPage'
import { useEffect, useState } from 'react'
const App = () => {

  const [IsLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = setTimeout(()=>{
       setIsLoading(false)
    }, 4000)

     
  }, [])
  
  return (
      
      ( IsLoading ? (<LoadingPage/> ) : 
      <>
       <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/navigator' element={<Navigator />}></Route>
      
      </Routes>
      </>
      )
     
  )
}

export default App