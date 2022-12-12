import "./Calender.css";
import Times from "./Times.jsx";

import React from "react";
import { Box } from "@mui/material";

function Time({showTime, date, time, setTime}) {
  return (
    <Box>
       {showTime ? <Times date={date} time={time} setTime={setTime}/> : null}
    </Box>
  )
}

export default Time;
