import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurrentBookings from "../components/booking/CurrentBookings";
import Header from "../components/ui/Header";

function CustomerPage() {
  const location = useLocation();
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const checkUser = async () => {
  //       setUser(location?.state?.user);
  //   };

  //   checkUser();
  // }, [location, user, setUser]);

  // if (!location?.state?.isAuthenticated || location.state === null) {
  //   return <div>You are not authorized to log in to this page</div>;
  // }

  return (
    <>
      <Header />
      <CurrentBookings data={user} />
    </>
  );
}

export default CustomerPage;
