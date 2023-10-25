import { Key } from "@mui/icons-material";
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

function EditCustomerPass({ row }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const URL = "https://clean-nice.vercel.app/api/customer";
  const [formData, setFormData] = useState({
    password: "",
  });

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const changePasswordHandler = async () => {
    const data = {
      password: formData.password,
    };

    const res = await fetch(`${URL}/${row.customerId}/editCustomerPass`, {
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
      <Tooltip title="Change password">
        <IconButton onClick={handleOpen}>
          <Key sx={{ color: "#62926C" }} />
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
          <DialogTitle>Byt lösenord</DialogTitle>
          <DialogContent>
            <TextField
              name="password"
              value={formData.password}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              placeholder="Ändra lösenord"
              required
              variant="outlined"
              InputProps={{
                disableunderline: true,
              }}
            />

            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleClose}>
                Avbryt
              </Button>
              <Button variant="outlined" onClick={changePasswordHandler}>
                Update
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
  );
}

export default EditCustomerPass;
