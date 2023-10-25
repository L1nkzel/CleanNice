import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import Colors from "../../Colors";
import FormStyle from "../form/FormStyle";

function EditCustomer({ row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const URL = "https://clean-nice.vercel.app/api/customer";
  const [formData, setFormData] = useState({
    custName: row.custName,
    companyName: row.companyName,
    orgNr: row.orgNr,
    phoneNumber: row.phoneNumber,
    adress: row.adress,
    email: row.email,
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const editCustomerHandler = async () => {
    const data = {
        custName: formData.custName,
        companyName: formData.companyName,
        orgNr: formData.orgNr,
        phoneNumber: formData.phoneNumber,
        adress: formData.adress,
        email: formData.email,
    };

    const res = await fetch(`${URL}/${row.customerId}/editCustomer`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataF = await res.json();
    console.log(dataF);
  };

  return (
    <>
      <Tooltip title="Edit">
        <IconButton onClick={handleOpen}>
          <Edit sx={{ color: "#62926C" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        PaperProps={{
          sx: {
            background: `linear-gradient(to top, ${Colors.modal100}, #FBFBFB)`,
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
          <DialogTitle>Redigera städare</DialogTitle>
          <DialogContent>
            <TextField
              name="custName"
              value={formData.custName}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="För- efternamn"
              placeholder="För- efternamn"
              required
              variant="outlined"
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="companyName"
              value={formData.companyName}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Company"
              placeholder="Company"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="orgNr"
              value={formData.orgNr}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Org"
              placeholder="Org"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="phoneNumber"
              value={formData.phoneNumber}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Telefonnr"
              placeholder="Telefonnr"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="adress"
              value={formData.adress}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Address"
              placeholder="Address"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="email"
              value={formData.email}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Epost"
              placeholder="Epost"
              required
              InputProps={{
                disableunderline: true,
              }}
            />

            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleClose}>
                Avbryt
              </Button>
              <Button variant="outlined" onClick={editCustomerHandler}>
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}

export default EditCustomer;
