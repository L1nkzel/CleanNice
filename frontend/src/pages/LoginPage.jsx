import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/form/LoginForm'

function LoginPage() {
  return (
    <div className="Reg-component">
    <div className="foreground">
      <Box sx={{display:'flex',fontSize:22, justifyContent:'right'}}>
      <Link style={{padding:10,margin:10, textDecoration:'none', background: "linear-gradient(to right top,#6982db, #FBFBFB)", color:'black'}} to="/loginForEmployees">Inloggning för anställda</Link>
      </Box>
      <LoginForm />
    </div>
  </div>
  )
}

export default LoginPage