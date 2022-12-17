import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import FormStyle from "./form/FormStyle";
import { useState } from "react";



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

const url = `http://localhost:3500/api/employee/newEmployee`;

export default function BasicModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    adress: "",
    phoneNumber: "",
    email: "",
    personalNumber: "",
    accountNumber: "",
    password: "",
  });

  const handleClick = async () => {
    const data = {
      employeeName: formData.employeeName,
      adress: formData.adress,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      personalNumber: formData.personalNumber,
      accountNumber: formData.accountNumber,
      role: "Employee",
      password: formData.password,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    await res.json();

    setFormData({
      employeeName: "",
      adress: "",
      phoneNumber: "",
      email: "",
      personalNumber: "",
      accountNumber: "",
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
    <Box sx={{display:"flex", justifyContent:"center"}} >
      <Button  sx={{background:"linear-gradient(to left top,#CEFFDC, #cfcfcf)", borderStyle:'none'}} onClick={handleOpen}>
        Skapa användare
      </Button>
      <Dialog
      PaperProps={{
        sx: {
          background:"linear-gradient(to left top,#e0f0e4, #d9e5eb)"
        }
      }}
        sx={{
          backdropFilter: "blur(3px)",
          bgColor: "rgba(0,0,30,0.4)",
        }}
        
        maxWidth="sm"
        open={open}
      ><Box sx={{display:"flex", flexDirection:"column",alignItems:"center"}}>
        <DialogTitle>Registrera ny städare</DialogTitle>
        <DialogContent>
            <TextField
              name="employeeName"
              value={formData.employeeName}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
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
              placeholder="Epost"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="personalNumber"
              value={formData.personalNumber}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              placeholder="Personnr"
              required
              InputProps={{
                disableUnderline: true,
              }}
            />
            <TextField
              name="accountNumber"
              value={formData.accountNumber}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              placeholder="Kontonr"
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
              placeholder="Lösenord"
              required
              autoFocus
              InputProps={{
                disableUnderline: true,
              }}
            />
        <DialogActions sx={{display:"flex", justifyContent:"center"}}>
          <Button variant="outlined" onClick={handleClose}>Avbryt</Button>
          <Button variant="outlined"  onClick={handleClick}>Registrera</Button>
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
