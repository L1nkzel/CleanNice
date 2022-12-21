import React, { useState } from "react";
import { Box, FormControl, Grid, Link, TextField, Typography } from "@mui/material";
import CustomButton from "../ui/CustomButton";
import FormStyle from "./FormStyle";
import Title from "../ui/Title";
import { useNavigate } from "react-router-dom";
import { Email, Key } from "@mui/icons-material";



function LoginFormEmployees() {


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const data = {
      email: loginData.email,
      password: loginData.password
    };
    const res = await fetch("http://localhost:3500/employee/login", {
      method: "POST",
      credentials:'include',
      headers: { "Content-Type": "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
      body: JSON.stringify(data),

    });

    
    if(res.status !== 200){
      setLoginError('Fel Epost eller lösenord. Var god försök igen')
      return
    }
    const result = await res.json();
    console.log(result);
    localStorage.setItem("userData", JSON.stringify(result));
    if(result?.user.forceChangePass === "yes") {       
      navigate("/changeEmployeePass", {
        state: {id: result.user.employeeId}
      } )
      return
      
    } 
     if (result.isEmployeeAuthenticated && result.user.role === "Admin") {
      navigate("/adminpage");
     }else if(result.isEmployeeAuthenticated && result.user.role === "Employee"){
      navigate("/employee")
     }
    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <Box sx={FormStyle.container}>
      <Grid container columnGap={1} sx={FormStyle.login}>
        <FormControl>
          <Title color={"white"}>Logga in</Title>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              my: 0.7,
              width:350
            }}
          >
            <Email
              sx={{
                color: "action.active",
                mr: 1,
                px: 1,
                py: 1.5,
                backgroundColor: "#CEFFDC",
                borderRadius: "4px 0 0 4px",
              }}
            />
            <TextField
              name="email"
              type="email"
              value={loginData.email}
              onChange={onHandleChange}
              sx={FormStyle.textInput}
              placeholder="Epost"
              variant="standard"
              
              InputProps={{
                disableUnderline: true,
              }}
              required
              autoComplete="email"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              my: 1,
              width:350
            }}
          >
            <Key
              sx={{
                color: "action.active",
                mr: 1,
                px: 1,
                py: 1.5,
                backgroundColor: "#CEFFDC",
                borderRadius: "4px 0 0 4px",
              }}
            />
            <TextField
              name="password"
              value={loginData.password}
              onChange={onHandleChange}
              sx={FormStyle.textInput}
              id="outlined-password-input"
              placeholder="Lösenord"
              type="password"
              required
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Box>
          <Typography
              sx={{
                mt: 1,
                px: 0.5,
               
                color: "#f59d9d",
                
              }}
            >
              {loginError}
            </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 1,
              mb:3.7
              
            }}
          >
            <CustomButton onClick={handleSubmit}>Logga in</CustomButton>

          </Box>
        </FormControl>
      </Grid>
    </Box>
  );
}

export default LoginFormEmployees;
