import React, { useState } from "react";
import { Box, createTheme, FormControl, Grid, Link, TextField, ThemeProvider, Typography } from "@mui/material";
import CustomButton from "../ui/CustomButton";
import FormStyle from "./FormStyle";
import Title from "../ui/Title";
import { useNavigate } from "react-router-dom";
import { Email, Key } from "@mui/icons-material";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs:0,
      xs: 400,
      sm: 500,
      md: 900,
      mm: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});


function LoginForm() {
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

    const res = await fetch("https://clean-nice.vercel.app/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:'include',
      body: JSON.stringify(data),
    });
    if (res.status !== 200) {
      setLoginError("Fel Epost eller lösenord. Var god försök igen");
      return
    }
    const result = await res.json();

    if (result.isAuthenticated) {
      localStorage.setItem("userData", JSON.stringify(result));
      setLoginError("");
      navigate("/customer");
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>

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
              width:{xxs:'100%', sm:350}
            }}
            >
            <Email
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
              my: 1,
              flexDirection:'column'
            }}
            >
            <CustomButton onClick={handleSubmit}>Logga in</CustomButton>

          <Link href="/register" sx={{ textAlign: "center", color: "white" }}>
            Inte registrerad? Skapa konto
          </Link>
          </Box>
        </FormControl>
      </Grid>
    </Box>
            </ThemeProvider>
  );
}

export default LoginForm;
