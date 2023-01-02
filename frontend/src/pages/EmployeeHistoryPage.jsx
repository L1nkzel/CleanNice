import React, { useState } from "react";
import EmployeeHistory from "../components/booking/EmployeeHistory";

import Header from "../components/ui/Header";

function EmployeeHistoryPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

  return (
    <>
      <Header 
      url1='/employee'
      link1Name='Mina Sidor'
      url2='/employee/history'
      link2Name='Historik'
      url3='/employee/payments'
      link3Name='Mina utbetalningar'
      url5='/integrity'
      link5Name ='Integritetspolicy'
     
      />
      <EmployeeHistory data={userData.user} />
    </>
  );
}

export default EmployeeHistoryPage;
