import { Box, Paper, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContent from "../tables/TableContent";

const AllBookings = ({ data }) => {
  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const book = JSON.stringify(bookings);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`http://localhost:3500/api/bookings/`, {
          credentials: "include",
        });

        const result = await res.json();

        setBookings(result);
      } catch (err) {
        setErrorMessage(err);
      }
    };
    checkUser();
  }, []);

  const deleteBookingHandler = async (id) => {
    if (window.confirm("Är du säker att du vill ta bort denna bokning")) {
      await fetch(`http://localhost:3500/api/bookings/${id}/booking`, {
        method: "DELETE",
        credentials: "include",
      });
      setBookings(bookings.filter((booking) => booking.bookingId !== id));
    } else {
      return;
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Alla bokningar</Title>
        <TableContent
          data={bookings}
          dataUser={data}
          deleteBookingHandler={deleteBookingHandler}
        />
      </Box>
    </Box>
  );
};

export default AllBookings;
