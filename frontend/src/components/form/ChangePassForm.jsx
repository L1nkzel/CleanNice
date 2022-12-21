import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import FormStyle from "./FormStyle";
import Title from "../ui/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { Email, Key } from "@mui/icons-material";

function ChangePassForm() {
  const [loginData, setLoginData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({
    password: "",
    confirmPassword: "",
  });

  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {

    let inputError = {
        password: "",
        confirmPassword: "",
      };
  
      if (loginData.confirmPassword !== loginData.password) {
        setFormError({
          ...inputError,
          confirmPassword: "Password and confirm password should be same",
        });
        return;
      }
  
      if (!loginData.password) {
        setFormError({
          ...inputError,
          password: "Password should not be empty",
        });
        return;
      }
      setFormError(inputError);


    const data = {
      password: loginData.password,
    };

 console.log('loggedInUser', loggedInUser)

    const URL = `http://localhost:3500/${loggedInUser.user.employeeId}/changePass`;
    const res = await fetch(URL, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    console.log(result)
    // if (result.isAuthenticated) {
    //   localStorage.setItem("userData", JSON.stringify(result));
    //   navigate("/loginForEmployees");
    // }
    if(loggedInUser.user.role==="Admin"){

      navigate("/adminpage")
    }else if(loggedInUser.user.role==="Employee"){
      navigate("/employee")
    }

    setLoginData({
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Box sx={FormStyle.container}>
      <Grid container columnGap={1} sx={FormStyle.login}>
        <FormControl>
          <Title color={"white"}>Ändra ditt lösenord</Title>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              my: 0.7,
              width: 350,
            }}
          >
            <Key
              sx={{
                color: "grey",
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              my: 1,
            }}
          >
            <Key
              sx={{
                color: "grey",
                mr: 1,
                px: 1,
                py: 1.5,
                backgroundColor: "#CEFFDC",
                borderRadius: "4px 0 0 4px",
              }}
            />
            <TextField
              name="confirmPassword"
              type="password"
              value={loginData.confirmPassword}
              onChange={onHandleChange}
              sx={FormStyle.textInput}
              placeholder="Upprepa lösenord"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              required
            />
          </Box>
          <Typography
            sx={{
              mt: 1,
              px: 0.5,

              color: "#f59d9d",
            }}
          >
        
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 1,
              flexDirection: "column",
            }}
          >
            <CustomButton onClick={handleSubmit}>Ändra lösenord</CustomButton>
          </Box>
        </FormControl>
      </Grid>
    </Box>
  );
}

export default ChangePassForm;
