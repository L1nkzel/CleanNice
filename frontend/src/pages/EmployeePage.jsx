import React, { useState } from "react";
import CurrentBookings from "../components/booking/EmployeeBookings";
import Header from "../components/ui/Header";

function EmployeePage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

  console.log(userData);
  if (!userData?.isAuthenticated && !userData?.user?.role ) {
    return <div>You are not authorized to log in to this page</div>;
  }

  return (
    <>
      <Header 
      url1='/employee'
      link1Name='Mina Sidor'
      url2='/employee/history'
      link2Name='Historik'
      url3='/employee/payments'
      link3Name='Mina utbetalningar'
     
      />
      <CurrentBookings data={userData.user} />
    </>
  );
}

export default EmployeePage;
