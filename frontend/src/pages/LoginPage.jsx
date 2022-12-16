import { Box } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/form/LoginForm'

function LoginPage() {
  return (
    <div className="Reg-component">
    <div className="foreground">
      <Box sx={{display:'flex',fontSize:22, justifyContent:'right'}}>
      <Link style={{ boxShadow: "3px 4px 1px rgba(0, 0, 0, 0.2)",padding:10,margin:10, borderRadius:4, textDecoration:'none', background: "linear-gradient(to left top,#CEFFDC, #cfcfcf)", color:'black'}} to="/loginForEmployees">Inloggning för anställda</Link>
      </Box>
      <LoginForm />
    </div>
  </div>
  )
}

export default LoginPage