import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function CustomerPage() {
  const location = useLocation();
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
}
  
  return (
    <div>{'hello'}</div>
  )
}

export default CustomerPage