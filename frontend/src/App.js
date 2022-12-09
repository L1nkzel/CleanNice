import React from "react";
import LoginPage from "./pages/LoginPage";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import CustomerPage from "./pages/CustomerPage";

function App() {
  return(
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/customer" element={<CustomerPage />}/>
      </Routes>
    </>
  ) 
}

export default App;
