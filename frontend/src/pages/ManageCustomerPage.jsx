import { Box } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentCustomer from "../components/tables/TableContentCustomer";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";
import RegisterCustomerModal from "../components/manageCustomers/RegisterCustomerModal";
import AlertDialog from "../components/manageCustomers/AlertDialogCustomer";

const ManageCustomerPage = () => {
  const URL = "http://localhost:3500/api/customer/";
  const [customerData, setCustomerData] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(URL, {
        credentials: "include",
      });

      const data = await res.json();

      setCustomerData(data);
    };
    fetchUsers();
  }, []);

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
          <Title color={"darkgreen"}>Kunder</Title>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <RegisterCustomerModal title="Skapa en ny kund" />
          </Box>

          <TableContentCustomer
            customerData={customerData}
            setCustomerData={setCustomerData}
            input={input}
            setInput={setInput}
          />
        </Box>
      </Box>
    </>
  );
};

export default ManageCustomerPage;
