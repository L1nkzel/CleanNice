import React, { useState } from "react";
import AllBookings from "../components/booking/AllBookings";
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
       link1Name='Översikt'
       url2='/adminpage/employees'
       link2Name='Administrera anställda'
       url3='#'
       link3Name='Administrera kunder'
       url4='#'
       link4Name='Faktura'
      
      
      />
      <AllBookings data={userData.user} />
   
    </>
  );
}

export default AdminPage;