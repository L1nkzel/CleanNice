import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import CustomButton from "../ui/CustomButton";
import {AccountCircle, Email, Key, Phone,Business, LocationOn} from "@mui/icons-material"
import InputAdornment from '@mui/material/InputAdornment';
import FormStyle from "./FormStyle";
import Title from "../ui/Title";

function RegisterInputForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password1: "",
    password2: "",
    phoneNumber: "",
    address: "",
    company: "",
    orgNr: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    setFormData({
      fullName: "",
      email: "",
      password1: "",
      password2: "",
      phoneNumber: "",
      address: "",
      company: "",
      orgNr: "",
    });
  };

  return (
    <Box sx={FormStyle.container}>
      <Grid container columnGap={1} sx={FormStyle.myStyle}>
        <FormControl>
          <Title>Registrera dig</Title>

          <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7}}>
        <AccountCircle sx={{ color: 'action.active',mr:1, px: 1, py: 1.5, backgroundColor:'#CEFFDC', borderRadius: "4px 0 0 4px" }} />
          <TextField
            sx={FormStyle.textInput}
            placeholder="För- och efternamn"
            name="fullName"
            value={formData.fullName}
            onChange={onHandleChange}
            variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
            required
          />
          </Box>

          <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7}}>
        <Email sx={{ color: 'action.active',mr:1, px: 1, py: 1.5, backgroundColor:'#CEFFDC', borderRadius: "4px 0 0 4px" }} />
          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Epost"
            variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
            required
          />
          </Box>
          <Box>
            <Grid container spacing={1}>
              <Grid item xs>
              <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7}}>
        <Key sx={{ color: 'action.active',mr:1, px: 1, py: 1.5, backgroundColor:'#CEFFDC', borderRadius: "4px 0 0 4px" }} />
                <TextField
                  name="password1"
                  value={formData.password1}
                  onChange={onHandleChange}
                  sx={FormStyle.textInput}
                  id="outlined-password-input"
                  placeholder="Lösenord"
                  type="password"
                  required
                  variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
                />
                </Box>
              </Grid>

              <Grid item xs>
              <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7, px: 1, py: 1,}}>
                <TextField
                  name="password2"
                  value={formData.password2}
                  onChange={onHandleChange}
                  sx={FormStyle.textInput}
                  id="outlined-password-input"
                  placeholder="Upprepa lösenord"
                  type="password"
                  required
                  variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
                />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7}}>
        <Phone sx={{ color: 'action.active',mr:1, px: 1, py: 1.5, backgroundColor:'#CEFFDC', borderRadius: "4px 0 0 4px" }} />
          <TextField
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Telefonnr"
            required
            variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
          />
          </Box>
          <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7}}>
        <LocationOn sx={{ color: 'action.active',mr:1, px: 1, py: 1.5, backgroundColor:'#CEFFDC', borderRadius: "4px 0 0 4px" }} />
          <TextField
            name="address"
            value={formData.address}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Adress"
            required
            variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
          />
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={7}>
            <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7}}>
        <Business sx={{ color: 'action.active',mr:1, px: 1, py: 1.5, backgroundColor:'#CEFFDC', borderRadius: "4px 0 0 4px" }} />
              <TextField
                name="company"
                value={formData.company}
                onChange={onHandleChange}
                fullWidth
                sx={FormStyle.textInput}
                placeholder="Företag"
                required
                variant='standard'
            InputProps={{
              disableUnderline: true,
            }}
              />
              </Box>
            </Grid>
            <Grid item xs>
            <Box sx={{ display: 'flex', alignItems:'center', backgroundColor:'white', borderRadius:1, my:0.7, px: 1, py: 1,}}>
              <TextField
                name="orgNr"
                value={formData.orgNr}
                onChange={onHandleChange}
                sx={FormStyle.textInput}
                placeholder="Orgnr"
                required
                variant='standard'
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
              my: 1,
            }}
          >
            <CustomButton onClick={handleSubmit}>Skapa konto</CustomButton>
          </Box>
          <Link href="/login" sx={{ textAlign: "center", color: "white" }}>
            Redan registrerad? Logga in
          </Link>
        </FormControl>
      </Grid>
    </Box>
  );
}

export default RegisterInputForm;
