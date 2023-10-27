import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentForCustomer from "../tables/TableContentForCustomer";

const CustomerHistory = ({ data }) => {
  const [history, setHistory] = useState();
  const [isLoaded, setIsLoaded] = useState(false)

  console.log(history);

  const checkUser = async () => {
    const res = await fetch(
      `https://clean-nice.vercel.app/api/bookings/${data.customerId}/bookings`,
      {credentials:'include'}); 
      const result = await res.json();
      setHistory(result.filter((booking) => booking.status === "Betald"));
      setIsLoaded(true)
};
useEffect(() => {
checkUser();
}, []);

  return (
    <Box sx={{justifyContent: "center", mt: 4 }}>
      <Box sx={{mx: 5 }}>
        <Title color={"darkgreen"}>Historik</Title>
        <TableContentForCustomer
          data={history}
          isLoaded={isLoaded}
        />
      </Box>
    </Box>
  );
};

export default CustomerHistory;
