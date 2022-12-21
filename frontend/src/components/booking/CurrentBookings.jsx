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

  const approveBooking = async (id) => {
    const data = {
      status: "Godkänd",
    };
    if (window.confirm("Vill du godkänna denna bokning")) {
      const res = await fetch(
        `http://localhost:3500/api/bookings/${id}/editBooking`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const data2 = await res.json();
      console.log(data2);
      return;
    }
  };
  const failBooking = async (id) => {
    const data = {
      status: "Underkänd",
    };
    if (window.confirm("Vill du underkänna denna bokning")) {
      const res = await fetch(
        `http://localhost:3500/api/bookings/${id}/editBooking`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const data2 = await res.json();
      console.log(data2);
      return;
    }
    
  };

  console.log("userbookings:", userBookings);
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
        <TableContent
        
          data={userBookings}
          approveBooking={approveBooking}
          failBooking={failBooking}
          deleteBookingHandler={deleteBookingHandler}
        />
      </Box>
    </Box>
  );
};

export default CurrentBookings;
