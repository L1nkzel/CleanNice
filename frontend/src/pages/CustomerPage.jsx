import React, { useState } from "react";
import CurrentBookings from "../components/booking/CurrentBookings";
import Header from "../components/ui/Header";

function CustomerPage() {
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(loggedInUser);

  console.log(userData);
  if (!userData?.isAuthenticated) {
    return <div>You are not authorized to log in to this page</div>;
  }

  return (
    <>
      <Header />
      <CurrentBookings data={userData.user} />
    </>
  );
}

export default CustomerPage;
