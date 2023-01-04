import { useState } from "react";
import BookService from "../components/booking/BookService";
import Footer from "../components/ui/Footer";
import Header from "../components/ui/Header";

function ServicesPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

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
      link5Name='Integritetspolicy'
      />
      <BookService data={userData?.user} />
      <Footer />
    </>
  );
}

export default ServicesPage;
