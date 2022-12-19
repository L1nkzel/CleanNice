import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentCustomer from "../components/booking/tables/TableContentCustomer";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";

const ManageCostumerPage = () => {
  const URL = "http://localhost:3500/api/customer/"
  const [costumerData, setCostumerData] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3500/api/customer/",
      {
        credentials: 'include',
      });

      const data = await res.json();

      setCostumerData(data);
    };
    fetchUsers();
  }, [costumerData]);

  return (
    <>
      <Header
        url1="/adminpage/"
        link1Name="Översikt"
        url2="/adminpage/costumer"
        link2Name="Administrera anställda"
        url3="#"
        link3Name="Administrera kunder"
        url4="#"
        link4Name="Faktura"
      />
      <Box sx={{ display: "flex", mt: 4 }}>
        <Box sx={{ flexGrow: 1, mx: 5 }}>
          <Title color={"darkgreen"}>anställda test</Title>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            register cosutumer
          </Box>

          <TableContentCustomer
          data={costumerData}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageCostumerPage;
