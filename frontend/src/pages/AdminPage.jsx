import { Button } from "@mui/material";
import React, { useState } from "react";
import BookingsTabs from "../components/booking/bookingsAdmin/BookingsTabs";
import Header from "../components/ui/Header";

function AdminPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

  console.log(userData);
  if (!userData?.isEmployeeAuthenticated && userData?.role !== 'Admin') {
    return <div>You are not authorized to log in to this page</div>;
  }

  return (
    <>
      <Header 
       url1='/adminpage/'
       link1Name='Bokningar'
       url2='/adminpage/employees'
       link2Name='Anställda'
       url3='/adminpage/customer'
       link3Name='Kunder'
       url4='#'
       link4Name='Faktura'
      
      
      />
      <BookingsTabs data={userData.user}/>
    </>
  );
}

export default AdminPage;