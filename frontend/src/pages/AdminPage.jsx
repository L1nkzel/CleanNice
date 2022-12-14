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
      <Header />
      <AllBookings data={userData.user} />
    </>
  );
}

export default AdminPage;