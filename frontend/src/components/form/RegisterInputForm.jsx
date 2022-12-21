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
import {
  AccountCircle,
  Email,
  Key,
  Phone,
  Business,
  LocationOn,
} from "@mui/icons-material";
import FormStyle from "./FormStyle";
import Title from "../ui/Title";
import { Form, useNavigate } from "react-router-dom";


function RegisterInputForm() {
  const regUrl = `http://localhost:3500/register/`;
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    address: "",
    company: "",
    orgNr: "",
  });
  const navigate = useNavigate()

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    let inputError = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      address: "",
      company: "",
      orgNr: "",
    };

    if (formData.confirmPassword !== formData.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formData.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return;
    }
    setFormError(inputError);

    const data = {
      custName: formData.fullName,
      companyName: formData.company,
      orgNr: formData.orgNr,
      phoneNumber: formData.phoneNumber,
      adress: formData.address,
      email: formData.email,
      password: formData.password,
      forceChangePass: "no",
    };

    const res = await fetch(regUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const data2 = res.json()
    console.log(data2)
 

    setFormData({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address:"",
      phoneNumber: "",
      company: "",
      orgNr: "",
    });
    navigate("/")
  };

  const [formError, setFormError] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    company: "",
    orgNr: "",
  });

  return (
    <Box  sx={FormStyle.container}>
      <Grid container columnGap={1}  sx={FormStyle.register}>
        <FormControl>
          <Title color={"white"}>Registrera dig</Title>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              my: 1,
            }}
          >
            <AccountCircle
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
              sx={FormStyle.textInput}
              placeholder="För- och efternamn"
              name="fullName"
              value={formData.fullName}
              onChange={onHandleChange}
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
              mb: 1,
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
              value={formData.email}
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
          <Box>
            <Grid container spacing={1}>
              <Grid item xs>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 1,
                    mb:1,
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
                    value={formData.password}
                    onChange={onHandleChange}
                    sx={FormStyle.textInput}
                    id="outlined-password-input"
                    placeholder="Lösenord"
                    type="password"
                    required
                    autoComplete="password"
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    
                  />
                </Box>
  
              </Grid>

              <Grid item xs>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "white",
                    borderRadius: 1,
                    px: 1,
                    py: 1,
                  }}
                >
                  <TextField
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={onHandleChange}
                    sx={FormStyle.textInput}
                    id="outlined-password-input2"
                    placeholder="Upprepa lösenord"
                    autoComplete="repeat-password"
                    type="password"
                    required
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
              
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              
            }}
          >
            <Phone
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
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onHandleChange}
              sx={FormStyle.textInput}
              placeholder="Telefonnr"
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
            <LocationOn
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
              name="address"
              value={formData.address}
              onChange={onHandleChange}
              sx={FormStyle.textInput}
              placeholder="Adress"
              required
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
            />
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 1,
                  mb: 1,
                }}
              >
                <Business
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
                  name="company"
                  value={formData.company}
                  onChange={onHandleChange}
                  fullWidth
                  sx={FormStyle.textInput}
                  placeholder="Företag"
                  required
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 1,
                  
                  px: 1,
                  py: 1,
                }}
              >
                <TextField
                  name="orgNr"
                  value={formData.orgNr}
                  onChange={onHandleChange}
                  sx={FormStyle.textInput}
                  placeholder="Orgnr"
                  required
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection:'column',
              my: 1,
            }}
          >
            <Typography sx={{color:"red", textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center", mb:1}}>{formError.password}</Typography>
            <Typography sx={{color:"red", textAlign:"center", display:"flex", justifyContent:"center", alignItems:"center", mb:1}}>{formError.confirmPassword}</Typography>
            <CustomButton onClick={handleSubmit}>Skapa konto</CustomButton>
          <Link href="/" sx={{justifyContent:'center', textAlign: "center", color: "white" }}>
            Redan registrerad? Logga in
          </Link>
          </Box>
        </FormControl>
      </Grid>
    </Box>
  );
}

export default RegisterInputForm;
