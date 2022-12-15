import { FormatColorResetOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { color } from '@mui/system';
import React from 'react'
import {useState} from 'react';


const time = ['07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']

function Times(props) {

const [active, setActive] = useState(false)


function clickHandler(e) {
  props.setTime(e.target.innerText)
  setActive(!active);

}

return (

 <Grid sx={{justifyContent:'center'}} container margin={2} width={500} spacing={0.5}>
   {
    time.map((times,i) => {
    return (
    <Grid key={times} item md={2.2} sx={{display:"flex", justifyContent:"center"}}>
      <Button id={i} color={active && i ? "primary" : "inherit"}  variant="contained" onClick={clickHandler}>{times}</Button> 
    </Grid>
        )
     })}
 </Grid>
  )
}

export default Times;