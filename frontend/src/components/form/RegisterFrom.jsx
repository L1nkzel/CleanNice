import {
  Box,
  Button,
  FormControl,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

function RegisterFrom() {
  return (
    <div className="Reg-component">
      <div className="foreground">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Grid container columnGap={1} sx={myStyle}>
            <FormControl>
              <Typography
                sx={{
                  textAlign: "center",
                  mb: 5,
                  color: "white",
                  fontSize: 22,
                }}
              >
                Registrera dig
              </Typography>

              <TextField
                sx={textInput}
                placeholder="Förnamn och efternamn"
                //placeholder='Förnamn och efternamn...'
              />

              <TextField
                sx={textInput}
                placeholder="Epost"
                //placeholder='Epost..'
              />
              <Box>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <TextField
                      sx={textInput}
                      id="outlined-password-input"
                      placeholder="Lösenord"
                      type="password"
                      //placeholder='Lösenord...'
                    />
                  </Grid>

                  <Grid item xs>
                    <TextField
                      sx={textInput}
                      id="outlined-password-input"
                      placeholder="Upprepa lösenord"
                      type="password"
                      //placeholder='Upprepa Lösenord...'
                    />
                  </Grid>
                </Grid>
              </Box>

              <TextField sx={textInput} placeholder="Telefonnr" />
              <TextField sx={textInput} placeholder="Adress" />
              <Grid container spacing={1}>
                <Grid item xs={7}>
                  <TextField fullWidth sx={textInput} placeholder="Företag" />
                </Grid>
                <Grid item xs>
                  <TextField sx={textInput} placeholder="Orgnr" />
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
                <Button
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{
                    width: 250,
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    color: "black",
                    boxShadow: 2,
                    background: "linear-gradient(#216600, #FBFBFB)",
                  }}
                >
                  Skapa konto
                </Button>
              </Box>
              <Link component="button" sx={{ textAlign: "center", color: "white" }}>
                Redan registrerad? Logga in
              </Link>
            </FormControl>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default RegisterFrom;

const myStyle = {
    height: 660,
    width: 600,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput = {
    my: 0.7,
    borderRadius: 1,
    bgcolor: "white",
  };
