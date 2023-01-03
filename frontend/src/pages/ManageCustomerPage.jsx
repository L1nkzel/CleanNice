import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import TableContentCustomers from "../components/tables/TableContentCustomers";
import Header from "../components/ui/Header";
import Title from "../components/ui/Title";
import RegisterCustomerModal from "../components/manageCustomers/RegisterCustomerModal";
import Footer from "../components/ui/Footer";


const ManageCustomerPage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);
  const URL = "http://localhost:3500/api/customer/";
  const [customerData, setCustomerData] = useState([]);
  const [input, setInput] = useState("");
  const [isLoaded, setIsLoaded] = useState(false)

  const fetchUsers = async () => {
    const res = await fetch(URL, {
      credentials: "include",
    });

    const data = await res.json();

    setCustomerData(data);
    setIsLoaded(true)
  };
  useEffect(() => {
    setInterval(fetchUsers, 1000)
    
  }, []);

  return (
    <>
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
      <Box sx={{  mt: 4, mb:4 }}>
        <Box sx={{ mx: 5 }}>
          <Title color={"darkgreen"}>Kunder</Title>
   
          
          <TableContentCustomers
            customerData={customerData}
            setCustomerData={setCustomerData}
            input={input}
            setInput={setInput}
            isLoaded={isLoaded}
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ManageCustomerPage;
