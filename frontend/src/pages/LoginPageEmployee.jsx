import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


import LoginFormEmployees from '../components/form/LoginFormEmployees'
import FormStyle from '../components/form/FormStyle'

function LoginPageEmployee() {
  return (
    <div className="Reg-component-emp">
    <div className="foreground">
    <Box sx={{display:'flex',fontSize:22, justifyContent:'right', }}>
      
      <Link style={{padding:10,
      boxShadow: "3px 4px 1px rgba(0, 0, 0, 0.2)",
        margin:10, borderRadius:4, textDecoration:'none', background: "linear-gradient(to left top,#CEFFDC, #cfcfcf)", color:'black', }} to="/">Inloggning för kunder</Link>
      </Box>
      <Box sx={[FormStyle.container,{flexDirection:'column'}]}>
    <Box
    sx={{ maxWidth:500, borderRadius: 5, p:5,
      backgroundColor: "rgba(0, 0, 0, 0.4)", mb:1}}>

    <Typography sx={{ color: "white",}}>use following emails to try out the application:</Typography>
    <Typography sx={{ color: "white",}}>admin@example.com</Typography>
    <Typography sx={{ color: "white",}}>employee@example.com</Typography>
    <Typography sx={{ color: "white",}}>All accounts have the password 123</Typography>
    </Box>
      <LoginFormEmployees />
      </Box>
    </div>
  </div>
  )
}

export default LoginPageEmployee