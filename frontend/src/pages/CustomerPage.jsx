import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CurrentBookings from '../components/booking/CurrentBookings'
import Header from '../components/ui/Header'
import Title from '../components/ui/Title'

function CustomerPage() {
/*   const location = useLocation();
  const [user, setUser] = useState({})
  
  useEffect(() => {
    const checkUser = ()=>{

      if(location.state !== null ){
        if(location.state.isAuthenticated){
          setUser(location.state)
          
        }
    
      }}
      
    checkUser()
   
  }, [location,user,setUser])
  
if(!user.isAuthenticated){
  return <div>You are not authorized to log in to this page</div>
} */
  
  return (
    <>
    <Header />
<CurrentBookings />
   
    </>
  )
}

export default CustomerPage