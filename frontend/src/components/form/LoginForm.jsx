import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  Link,
  TextField,
} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import FormStyle from "./FormStyle";
import Title from "../ui/Title";
import { useNavigate } from "react-router-dom";
import { Email, Key } from "@mui/icons-material";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async() => {
    const data={
      email: loginData.email,
      password: loginData.password
    }
      const res = await fetch('http://localhost:3500/login',{
        method: 'POST',
        headers:{ "Content-Type": "application/json" },
        body:JSON.stringify(data)
      })
      const result = await res.json()
    console.log(result);
if(result.isAuthenticated){
navigate('/customer',{state:result})
  
}
setLoginData({
  email: "",
  password: ""
});

  };

  return (
    <Box sx={FormStyle.container}>
      <Grid container columnGap={1} sx={FormStyle.login}>
        <FormControl>
          <Title color={'white'}>Logga in</Title>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              my: 0.7,
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
            />
          </Box>
          <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 1,
                    my: 0.7,
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 1,
            }}
          >
            <CustomButton onClick={handleSubmit}>Logga in</CustomButton>
          </Box>
          <Link href="/register" sx={{ textAlign: "center", color: "white" }}>
            Inte registrerad? Skapa konto
          </Link>
        </FormControl>
      </Grid>
    </Box>
  );
}

export default LoginForm;
