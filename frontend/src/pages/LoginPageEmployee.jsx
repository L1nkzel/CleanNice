
import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


import LoginFormEmployees from '../components/form/LoginFormEmployees'

function LoginPageEmployee() {
  return (
    <div className="Reg-component-emp">
    <div className="foreground">
    <Box sx={{display:'flex',fontSize:22, justifyContent:'right'}}>
      <Link style={{padding:10,margin:10, textDecoration:'none', background: "linear-gradient(to right top,#6982db, #FBFBFB)", color:'black'}} to="/">Inloggning för kunder</Link>
      </Box>
      <LoginFormEmployees />
    </div>
  </div>
  )
}

export default LoginPageEmployee