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
          <TextField
            sx={FormStyle.textInput}
            placeholder="Förnamn och efternamn"
            name="fullName"
            value={formData.fullName}
            onChange={onHandleChange}
            required
          />

          <TextField
            name="email"
            type="email"
            value={formData.email}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Epost"
            required
          />
          <Box>
            <Grid container spacing={1}>
              <Grid item xs>
                <TextField
                  name="password1"
                  value={formData.password1}
                  onChange={onHandleChange}
                  sx={FormStyle.textInput}
                  id="outlined-password-input"
                  placeholder="Lösenord"
                  type="password"
                  required
                />
              </Grid>

              <Grid item xs>
                <TextField
                  name="password2"
                  value={formData.password2}
                  onChange={onHandleChange}
                  sx={FormStyle.textInput}
                  id="outlined-password-input"
                  placeholder="Upprepa lösenord"
                  type="password"
                  required
                />
              </Grid>
            </Grid>
          </Box>

          <TextField
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Telefonnr"
            required
          />
          <TextField
            name="address"
            value={formData.address}
            onChange={onHandleChange}
            sx={FormStyle.textInput}
            placeholder="Adress"
            required
          />
          <Grid container spacing={1}>
            <Grid item xs={7}>
              <TextField
                name="company"
                value={formData.company}
                onChange={onHandleChange}
                fullWidth
                sx={FormStyle.textInput}
                placeholder="Företag"
                required
              />
            </Grid>
            <Grid item xs>
              <TextField
                name="orgNr"
                value={formData.orgNr}
                onChange={onHandleChange}
                sx={FormStyle.textInput}
                placeholder="Orgnr"
                required
              />
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
