import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import TableContentForCustomer from "../tables/TableContentForCustomer";
import Title from "../ui/Title";

const CurrentBookings = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const checkUser = async () => {

     
        const res = await fetch(
          `http://localhost:3500/api/bookings/${data.customerId}/bookings`, {credentials:'include'}
          ); 
          const result = await res.json();
          setUserBookings(result);
          setIsLoaded(true)
        
      
    };
    useEffect(() => {
    setInterval(checkUser,1000)
  }, []);

  // const deleteBookingHandler = async (id) => {
  //   if (window.confirm("Är du säker att du vill ta bort denna bokning")) {
  //     await fetch(`http://localhost:3500/api/bookings/${id}/booking`, {
  //       method: "DELETE",
  //     });
  //     setUserBookings(
  //       userBookings.filter((booking) => booking.bookingId !== id)
  //     );
  //   } else {
  //     return;
  //   }
  // };

  const approveBooking = async (id) => {
    const data = {
      status: "Godkänd",
    };
    if (window.confirm("Vill du godkänna denna bokning")) {
      const res = await fetch(
        `http://localhost:3500/api/bookings/${id}/editBooking`,
        {
          method: "PATCH",
          credentials:'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      return;
    }
  };
  // const failBooking = async (id) => {
  //   const data = {
  //     status: "Underkänd",
  //   };
  //   if (window.confirm("Vill du underkänna denna bokning")) {
  //     const res = await fetch(
  //       `http://localhost:3500/api/bookings/${id}/editBooking`,
  //       {
  //         method: "PATCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       }
  //     );
  //     const data2 = await res.json();
  //     console.log(data2);
  //     return;
  //   }
    
  // };


  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
        <TableContentForCustomer
          input={input}
          setInput={setInput}
          data={userBookings}
          setUserBookings={setUserBookings}
          isLoaded={isLoaded}
          dataUser={data}
          approveBooking={approveBooking}
        />
      </Box>
    </Box>
  );
};

export default CurrentBookings;
