import React, { useState } from "react";
import CurrentBookings from "../components/booking/CurrentBookings";
import Header from "../components/ui/Header";

function CustomerPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

  console.log(userData);
  if (!userData?.isAuthenticated ) {
    return <div>You are not authorized to log in to this page</div>;
  }

  return (
    <>
      <Header 
      url1='/customer'
      link1Name='Mina Sidor'
      url2='/customer/services'
      link2Name='Tjänster'
      url3='/customer/history'
      link3Name='Historik'
      url4='/customer/contact'
      link4Name='Kontakt'
      url5='/customer/integrity'
      link5Name ='Integritetspolicy'
      />
      <CurrentBookings data={userData.user} />
    </>
  );
}

export default CustomerPage;
