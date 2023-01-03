import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentCleaner from "../tables/TableContentCleaner";

const EmployeeBookings = ({ data }) => {
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
   const res =  await fetch(`http://localhost:3500/api/bookings/${id}/editBooking`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body:JSON.stringify(data)
      });
     const bookingData = await res.json()

     const res2 = await fetch(`http://localhost:3500/api/customer/${bookingData?.customerId}`,{
      credentials: "include",
     })
     const customerData = await res2.json()
    console.log("customer:" ,customerData)
    console.log("bookinf:" ,bookingData)


     const invoiceData ={
      
        custName: customerData?.custName,
        email: customerData?.email,
        adress:customerData?.adress,
        cleaningService: bookingData?.cleaningService,
        companyName: customerData?.companyName,
        bookingId: bookingData.bookingId,
        orgNr: customerData?.orgNr
    
     }
     await fetch(`http://localhost:3500/api/email/invoice`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body:JSON.stringify(invoiceData)
     })

      setUserBookings(
        userBookings.filter((booking) => booking.status === "Bokad")
      );
    } else {
      return;
    }
  };
  return (
    <Box sx={{justifyContent: "center", mt: 4 }}>
      <Box sx={{mx: 5 }}>
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

export default EmployeeBookings;
