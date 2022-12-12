import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import {useState} from 'react';


const time = ['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00']

function Times(props) {

 const [event, setEvent] = useState(null)
 const [info, setInfo] = useState(false)
 const [isClicked, setIsClicked] = useState(false);

//  function displayInfo(e) {
//    setInfo(true);
//    setEvent(e.target.innerText);
// }

function clickHandler(e) {
  props.setTime(e.target.innerText) 
}

return (

 <Grid container margin={2} width={300} spacing={1}>
   {time.map(times => {
    return (
    <Grid item md={4} sx={{display:"flex", justifyContent:"center"}}>
      <Button variant="contained" onClick={clickHandler}>{times}</Button> 
    </Grid>
        )
     })}
 </Grid>
  )
}

export default Times;