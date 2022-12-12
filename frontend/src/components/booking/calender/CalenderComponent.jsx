import { Box } from "@mui/material";
import * as React from "react";
import Calender from "react-calendar";
import "./Calender.css";
import Time from "./Time";

export default function CalenderComponent(props) {
  return (
    <>
      <Box sx={{ mb: 1 }}>{props.date.toDateString()}</Box>
      <Calender
        onChange={props.setDate}
        value={props.date}
        onClickDay={() => props.setShowTime(true)}
        tileDisabled={({ date, view }) =>
          (view === "month" && date.getDay() === 0) || date.getDay() === 6 || date <= new Date()
        }
      />
      <Time showTime={props.showTime} time={props.time} setTime={props.setTime} />
    </>
  );
}
