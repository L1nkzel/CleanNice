import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableContentForCustomer from "../tables/TableContentForCustomer";
import Title from "../ui/Title";

const CurrentBookings = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [input, setInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const checkUser = async () => {
    const res = await fetch(
      `http://localhost:3500/api/bookings/${data.customerId}/bookings`,
      { credentials: "include" }
    );
    const result = await res.json();
    setUserBookings(result);
    setIsLoaded(true);
  };
  useEffect(() => {
    setInterval(checkUser, 1000);
  }, []);

  const approveBooking = async (id) => {
    const data = {
      status: "Godkänd",
    };
    if (window.confirm("Vill du godkänna denna bokning")) {
      const res = await fetch(
        `http://localhost:3500/api/bookings/${id}/editBooking`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      return;
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb:4 }}>
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
