import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentPaid from "../tables/TableContentPaid";

const EmployeePaid = ({ data }) => {
  const [paid, setPaid] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)

  const checkUser = async () => {
    if (!isNaN(data.employeeId)) {
      try {
        const res = await fetch(
          `http://localhost:3500/api/employee/${data.employeeId}/bookings`
          , {credentials:'include'});
          
          const result = await res.json();
          setPaid(result.bookings.filter((booking) => booking.status === "Betald"));
          setIsLoaded(true)
        } catch (err) {
          setErrorMessage(err);
        }
      }
    };
    useEffect(() => {
    setInterval(checkUser,1000)
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
      <Box sx={{ flexGrow: 1, mx: 5 }}>
        <Title color={"darkgreen"}>Mina betalningar</Title>
        <TableContentPaid
          data={paid}
          isLoaded={isLoaded}
        />
      </Box>
    </Box>
  );
};

export default EmployeePaid;
