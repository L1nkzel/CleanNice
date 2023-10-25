import { Box} from "@mui/material";
import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import TableContentCleaner from "../tables/TableContentCleaner";

const EmployeeHistory = ({ data }) => {
  const [paid, setPaid] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)

  const checkUser = async () => {
    if (!isNaN(data.employeeId)) {
      try {
        const res = await fetch(
          `https://clean-nice.vercel.app/api/employee/${data.employeeId}/bookings`
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
    <Box sx={{justifyContent: "center", mt: 4 }}>
      <Box sx={{mx: 5 }}>
        <Title color={"darkgreen"}>Mina betalningar</Title>
        <TableContentCleaner
          data={paid}
          isLoaded={isLoaded}
        />
      </Box>
    </Box>
  );
};

export default EmployeeHistory;
