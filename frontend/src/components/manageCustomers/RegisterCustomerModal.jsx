import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import FormStyle from "../form/FormStyle";
import { useState } from "react";
import Colors from "../../Colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const url = `http://localhost:3500/register`;

export default function BasicModal({title}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    custName: "",
    adress: "",
    phoneNumber: "",
    email: "",
    companyName: "",
    orgNr: "",
    password: "",
  });

  const handleClick = async () => {
    const data = {
      custName: formData.custName,
      adress: formData.adress,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      companyName: formData.companyName,
      orgNr: formData.orgNr,
      password: formData.password,
      forceChangePass: "yes"
    };

    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await res.json();

    setFormData({
      custName: "",
      adress: "",
      phoneNumber: "",
      email: "",
      companyName: "",
      orgNr: "",
      password: "",
    });
   
    setOpen(false);
  };

  const onHandleChange = (e) => {
    
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        sx={{
          background: "linear-gradient(to left top,#CEFFDC, #cfcfcf)",
          borderStyle: "none",
        }}
        onClick={handleOpen}
      >
        Skapa användare
      </Button>
      <Dialog
        PaperProps={{
          sx: {
            background: `linear-gradient(to bottom, ${Colors.header100}, #FBFBFB)`,
          },
        }}
        sx={{
          backdropFilter: "blur(3px)",
          bgColor: "rgba(0,0,30,0.4)",
        }}
        maxWidth="sm"
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <TextField
              name="custName"
              value={formData.custName}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="För- efternamn"
              placeholder="För- efternamn"
              required
              variant="outlined"
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="adress"
              value={formData.adress}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Adress"
              placeholder="Adress"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="phoneNumber"
              value={formData.phoneNumber}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Telefonnr"
              placeholder="Telefonnr"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="email"
              value={formData.email}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Epost"
              placeholder="Epost"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="companyName"
              value={formData.companyName}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Företag"
              placeholder="Företag"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="orgNr"
              value={formData.orgNr}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="OrgNr"
              placeholder="OrgNr"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="password"
              value={formData.password}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Lösenord"
              placeholder="Lösenord"
              required
              autoFocus
              InputProps={{
                disableUnderline: true,
              }}
            />
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleClose}>
                Avbryt
              </Button>
              <Button variant="outlined" onClick={handleClick}>
                Registrera
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </Box>
  );
}

{
  /* <Box sx={{display: "flex", justifyContent:"center"}}>
<Button onClick={handleOpen}>Open modal</Button>
<Dialog
  open={open}
>
<DialogContent sx={style}>  
 

  <DialogActions>
  <Button variant='contained' size='medium' onClick={handleClose} >Avbryt</Button>
  <Button variant='contained' size='medium' onClick={handleClick}>Register</Button>
  </DialogActions>
  </DialogContent>
</Dialog>
</Box> */
}
