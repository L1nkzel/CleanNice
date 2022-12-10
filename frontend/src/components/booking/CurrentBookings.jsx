import { Box, Paper, Toolbar } from '@mui/material'
import React from 'react'
import Title from '../ui/Title'
import TableContent from './TableContent'

const CurrentBookings = () => {
  return (
    <Box sx={{display:'flex',justifyContent:'center', mt:4}} >

    
    <Box sx={{flexGrow:1, mx:5 }}>
      <Title color={'darkgreen'}>Mina bokningar</Title>
<TableContent />
    </Box>
    
   
    </Box>
  )
}

export default CurrentBookings