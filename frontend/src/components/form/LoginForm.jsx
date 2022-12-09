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
      <Grid container columnGap={1} sx={FormStyle.myStyle}>
        <FormControl>
          <Title>Logga in</Title>

          <TextField
            name="email"
            type="email"
            value={loginData.email}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Epost"
            required
          />
          <TextField
            sx={FormStyle.textInput}
            placeholder="Lösenord"
            name="password"
            value={loginData.password}
            onChange={onHandleChange}
            required
          />
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
