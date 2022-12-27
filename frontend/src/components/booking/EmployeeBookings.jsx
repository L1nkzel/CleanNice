import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentCleaner from "../tables/TableContentCleaner";

const BookedEmployee = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)
  const checkUser = async () => {
    if (!isNaN(data.employeeId)) {
      try {
        const res = await fetch(
          `http://localhost:3500/api/employee/${data.employeeId}/bookings`
          , {credentials:'include'});
          
          const result = await res.json();
          setUserBookings(result.bookings.filter((booking) => booking.status === "Bokad"));
          setIsLoaded(true)
        } catch (err) {
          setErrorMessage(err);
        }
      }
    };
    useEffect(() => {
    setInterval(checkUser,1000)
  }, []);

  const cleaningDoneHandler = async (id) => {

    const data={
      status:"Utfört"
    }
    if (window.confirm("Vill du klarmarkera denna bokning")) {
    await fetch(`http://localhost:3500/api/bookings/${id}/editBooking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      });
      setUserBookings(
        userBookings.filter((booking) => booking.status === "Bokad")
      );
    } else {
      return;
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
        <TableContentCleaner
          data={userBookings}
          cleaningDoneHandler={cleaningDoneHandler}
          isLoaded={isLoaded}
        />
      </Box>
    </Box>
  );
};

export default BookedEmployee;
