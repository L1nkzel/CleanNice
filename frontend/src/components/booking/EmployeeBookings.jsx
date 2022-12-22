import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentEmployee from "../tables/TableContentEmployee";

const BookedEmployee = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const checkUser = async () => {
      if (!isNaN(data.employeeId)) {
        try {
          const res = await fetch(
            `http://localhost:3500/api/employee/${data.employeeId}/bookings`
          , {credentials:'include'});

          const result = await res.json();
          setUserBookings(result.bookings.filter((booking) => booking.status === "Bokad"));
          console.log(result.bookings);
        } catch (err) {
          setErrorMessage(err);
        }
      }
    };
    checkUser();
  }, [data.employeeId]);

  const cleaningDoneHandler = async (id) => {

    const data={
      status:"Utfört"
    }
    if (window.confirm("Vill du klarmarkera denna bokning")) {
     const res =  await fetch(`http://localhost:3500/api/bookings/${id}/editBooking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      });
      const data2 = await res.json()
      console.log(data2)
      setUserBookings(
        userBookings.filter((booking) => booking.status === "Bokad")
      );
    } else {
      return;
    }
  };
  console.log("userbookings:",userBookings)
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
        <TableContentEmployee
          data={userBookings}
          cleaningDoneHandler={cleaningDoneHandler}
         
        />
      </Box>
    </Box>
  );
};

export default BookedEmployee;
