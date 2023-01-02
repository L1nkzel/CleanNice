import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedAdmin = ({ children }) => {

  const loggedInUser = JSON.parse(localStorage.getItem("userData"));
  const [userData] = useState(loggedInUser);

  const navigate = useNavigate()

  useEffect(()=>{
  
    if (!userData?.isAuthenticated && !userData?.isEmployeeAuthenticated) {
      return navigate('/')
     }
     
     if (userData?.isAuthenticated) {
       
         return navigate("/401", {state: {url:'/customer'}}) 
       
     } 
     if(userData?.user?.role !== "Admin"){
      return navigate("/401", {state: {url:'/employee'}}) 
     }
   })
   return children;
  };



export default ProtectedAdmin;
