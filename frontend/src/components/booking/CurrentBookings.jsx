import { Box, Paper, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContent from "./TableContent";

const CurrentBookings = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
const [errorMessage, setErrorMessage] = useState("")
  useEffect(() => {
    const checkUser = async () => {
      if (!isNaN(data.customerId)) {
        try{

          const res = await fetch(
            `http://localhost:3500/api/bookings/${data.customerId}/bookings`
            );
            
            const result = await res.json();
            setUserBookings(result);
            console.log(result);
          }catch(err){
           setErrorMessage(err)
          }
      }
    };
    checkUser();
  }, [data.customerId]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
      <TableContent data={userBookings} />
      </Box>

    </Box>
  );
};

export default CurrentBookings;
