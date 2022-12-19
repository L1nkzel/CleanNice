import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentEmployees from "../components/booking/tables/TableContentEmployees";
import RegisterEmployeeModal from "../components/manageEmployees/RegisterEmployeeModal";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";

const ManageEmployeesPage = () => {
  const URL = "http://localhost:3500/api/employee/";
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3500/api/employee/", {
        credentials: "include",
      });

      const data = await res.json();

      setEmployeeData(data);
    };
    fetchUsers();
  }, [employeeData.length, setEmployeeData]);

  for (let i = 0; i < employeeData.length; i++) {
    if (employeeData[i].role === "Admin") {
      setEmployeeData(
        employeeData.filter(
          (employee) => employee.employeeId !== employeeData[i].employeeId
        )
      );
    }
  }

  const deleteEmployeeHandler = async (id) => {
    if (window.confirm("Är du säker att du vill ta bort denna anställd")) {
      await fetch(`http://localhost:3500/api/employee/${id}/deleteEmployee`, {
        method: "DELETE",
        credentials: "include",
      });
      setEmployeeData(
        employeeData.filter((employee) => employee.employeeId !== id)
      );
    } else {
      return;
    }
  };

  return (
    <>
      <Header
        url1="/adminpage/"
        link1Name="Översikt"
        url2="/adminpage/employees"
        link2Name="Administrera anställda"
        url3="#"
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
            deleteEmployeeHandler={deleteEmployeeHandler}
            data={employeeData}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageEmployeesPage;
