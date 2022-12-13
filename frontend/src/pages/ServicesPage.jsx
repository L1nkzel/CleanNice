import { useState } from "react";
import BookService from "../components/booking/BookService";
import Header from "../components/ui/Header";

function ServicesPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

  return (
    <>
      <Header />
      <BookService data={userData?.user} />
    </>
  );
}

export default ServicesPage;
