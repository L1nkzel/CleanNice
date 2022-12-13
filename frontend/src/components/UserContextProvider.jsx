import React, { createContext, useState } from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // the value that will be given to the context
 
  const [user, setUser] = useState({});

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };