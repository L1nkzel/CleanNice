import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentEmployees from "../components/tables/TableContentEmployees";
import RegisterEmployeeModal from "../components/manageEmployees/RegisterEmployeeModal";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";
import Footer from "../components/ui/Footer";

const ManageEmployeesPage = () => {
  const URL = "https://clean-nice.vercel.app/api/employee/";
  const [employeeData, setEmployeeData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchUsers = async () => {
    const res = await fetch(URL, {
      credentials: "include",
    });

    const data = await res.json();

    setEmployeeData(data);
    setIsLoaded(true)
   
  };
  useEffect(() => {
    setInterval(fetchUsers,1000)
  }, []);

  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i].role === "Admin") {
      setEmployeeData(
        employeeData.filter(
          (employee) => employee.employeeId !== employeeData[i].employeeId
        )
      );
    }
  }



  return (
    <Box sx={{display: "flex",
    flexDirection: "column"}}>
      <Header
        url1="/adminpage/"
        link1Name="Bokningar"
        url2="/adminpage/employees"
        link2Name="Anställda"
        url3="/adminpage/customer"
        link3Name="Kunder"
        url4="#"
        link4Name="Faktura"
      />
      <Box sx={{ mt: 4, mb:4 }}>
        <Box sx={{ flexGrow: 1, mx: 5 }}>
          <Title textAlign={"center"} color={"darkgreen"}>Anställda</Title>
  


          <TableContentEmployees
            employeeData={employeeData}
            setEmployeeData={setEmployeeData}
            isLoaded={isLoaded}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ManageEmployeesPage;
