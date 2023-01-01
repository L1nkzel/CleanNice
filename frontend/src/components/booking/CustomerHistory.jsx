import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentCustomerHistory from "../tables/TableContentCustomerHistory";

const CustomerHistory = ({ data }) => {
  const [history, setHistory] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)

  console.log(history);

  const checkUser = async () => {
    const res = await fetch(
      `http://localhost:3500/api/bookings/${data.customerId}/bookings`,
      {credentials:'include'}); 
      const result = await res.json();
      setHistory(result.filter((booking) => booking.status === "Betald"));
      setIsLoaded(true)
};
useEffect(() => {
setInterval(checkUser,1000)
}, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Historik</Title>
        <TableContentCustomerHistory
          data={history}
          isLoaded={isLoaded}
        />
      </Box>
    </Box>
  );
};

export default CustomerHistory;
