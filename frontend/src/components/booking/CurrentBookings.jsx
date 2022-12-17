import { Box, Paper, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContent from "./tables/TableContent";

const CurrentBookings = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const checkUser = async () => {
      if (!isNaN(data.customerId)) {
        try {
          const res = await fetch(
            `http://localhost:3500/api/bookings/${data.customerId}/bookings`
          );

          const result = await res.json();
          setUserBookings(result);
          console.log(result);
        } catch (err) {
          setErrorMessage(err);
        }
      }
    };
    checkUser();
  }, [data.customerId]);

  const deleteBookingHandler = async (id) => {
    if (window.confirm("Är du säker att du vill ta bort denna bokning")) {
      await fetch(`http://localhost:3500/api/bookings/${id}/booking`, {
        method: "DELETE",
      });
      setUserBookings(
        userBookings.filter((booking) => booking.bookingId !== id)
      );
    } else {
      return;
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
        <TableContent
          data={userBookings}
          deleteBookingHandler={deleteBookingHandler}
        />
      </Box>
    </Box>
  );
};

export default CurrentBookings;
