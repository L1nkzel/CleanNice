import React, { useState } from "react";
import CurrentBookings from "../components/booking/CurrentBookings";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

function CustomerPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData] = useState(loggedInUser);

  
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
      url5='/integrity'
      link5Name ='Integritetspolicy'
      />
      <CurrentBookings data={userData.user} />
      <Footer />
    </>
  );
}

export default CustomerPage;
