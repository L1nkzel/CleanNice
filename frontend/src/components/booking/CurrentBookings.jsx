import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import TableContentForCustomer from "../tables/TableContentForCustomer";
import Title from "../ui/Title";

const CurrentBookings = ({ data }) => {
  const [userBookings, setUserBookings] = useState();
  const [input, setInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const checkUser = async () => {
    const res = await fetch(
      `https://clean-nice.vercel.app/api/bookings/${data?.customerId}/bookings`,
      { credentials: "include" }
    );
    const result = await res.json();
    setUserBookings(result);
    setIsLoaded(true);
  };
  useEffect(() => {
    checkUser();
  }, []);


  return (
    <Box sx={{ mt: 4, mb:4 }}>
      <Box sx={{ mx: 5 }}>
        <Title color={"darkgreen"}>Mina bokningar</Title>
        <TableContentForCustomer
          input={input}
          setInput={setInput}
          data={userBookings}
          setUserBookings={setUserBookings}
          isLoaded={isLoaded}
          dataUser={data}
        />
      </Box>
    </Box>
  );
};

export default CurrentBookings;
