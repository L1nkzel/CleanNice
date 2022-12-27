import { Box, Button } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentEmployees from "../components/tables/TableContentEmployees";
import RegisterEmployeeModal from "../components/manageEmployees/RegisterEmployeeModal";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";

const ManageEmployeesPage = () => {
  const URL = "http://localhost:3500/api/employee/";
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
    <>
      <Header
        url1="/adminpage/"
        link1Name="Översikt"
        url2="/adminpage/employees"
        link2Name="Administrera anställda"
        url3="/adminpage/customer"
        link3Name="Administrera kunder"
        url4="#"
        link4Name="Faktura"
      />
      <Box sx={{ display: "flex", mt: 4 }}>
        <Box sx={{ flexGrow: 1, mx: 5 }}>
          <Title color={"darkgreen"}>Anställda</Title>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <RegisterEmployeeModal />
          </Box>

          <TableContentEmployees
            employeeData={employeeData}
            setEmployeeData={setEmployeeData}
            isLoaded={isLoaded}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageEmployeesPage;
