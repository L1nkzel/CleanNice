import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurrentBookings from "../components/booking/CurrentBookings";
import Header from "../components/ui/Header";

function CustomerPage() {
  const location = useLocation();
  const [user, setUser] = useState({});

  const entries = performance.getEntriesByType("navigation");
  entries.forEach((entry) => {
    if (entry.type === "back_forward") {
      console.log(`${entry.name} navigated back or forward!`);
      console.log(entry);
    }
  });
  useEffect(() => {
    const checkUser = async () => {
        setUser(location?.state);
    };

     checkUser();
   }, [location, user, setUser]);


  if (!user?.isAuthenticated ) {
    return <div>You are not authorized to log in to this page</div>;
  }

  return (
    <>
      <Header />
      <CurrentBookings data={user.user} />
    </>
  );
}

export default CustomerPage;
