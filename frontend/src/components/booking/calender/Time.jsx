import "./Calender.css";
import Times from "./Times.jsx";

import React, { useState } from "react";
import { Box } from "@mui/material";

function Time(props) {

  const {showTime, date, time, setTime, handleCalenderOnPress, open, setOpen, error, handleOpen} = props

  return (
    <Box>
       {showTime ? <Times handleCalenderOnPress={handleCalenderOnPress} open={open} setOpen={setOpen} handleOpen
       ={handleOpen} date={date} time={time} setTime={setTime} error={error}/> : null}
    </Box>
  )
}

export default Time;
