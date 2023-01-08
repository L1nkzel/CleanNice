import { Box } from "@mui/material";
import * as React from "react";
import Calender from "react-calendar";
import "./Calender.css";
import Time from "./Time";

export default function CalenderComponent(props) {
  const {handleCalenderOnPress, error} = props

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box sx={{ mb: 1 }}>{props.date.toDateString()}</Box>
      <Box sx={{mb:2}}>

      <Calender
      
      onChange={props.setDate}
      value={props.date}
      onClickDay={() => {
        props.setShowTime(true)
        handleOpen()
      }}
      tileDisabled={({ date, view }) =>
      (view === "month" && date.getDay() === 0) || date.getDay() === 6 || date <= new Date()
    }
    />
    </Box>
      <Time open={open} setOpen={setOpen} error={error}  handleCalenderOnPress={handleCalenderOnPress} showTime={props.showTime} time={props.time} setTime={props.setTime} />
    </>
  );
}
