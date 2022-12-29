import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import { useState } from "react";




const AlertDialogCustomer = ({customerData, setCustomerData, input, setInput, row}) => {
  const URL = "http://localhost:3500/api/customer"

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  
  const deleteCustomer = async () => {
  
    await fetch(`${URL}/${row.customerId}/deleteCustomer`, {
      method: "DELETE",
      credentials: "include",
    });
    setCustomerData(
      customerData.filter((customer) => customer.customerId !== row.customerId)
    );
  
  };

  function onHandleChange (e) {
    setInput(() => e.target.value)
    console.log(e.target.value);
  }
  

  return (
    <>
    <Tooltip title="Edit">
      <IconButton onClick={handleOpen}>
        <DeleteOutline sx={{ color: "#62926C" }} />
      </IconButton>
    </Tooltip>
    <Dialog
      PaperProps={{
        sx: {
          background: "linear-gradient(to left top,#5e92ce, #ffffff)",
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
        <DialogTitle>Synpunkter</DialogTitle>
        <DialogContent>
          <TextField
            value={input}
            onChange={onHandleChange}
            fullWidth
            required
            variant="outlined"
            InputProps={{
              disableunderline: "true",
            }}
          />
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleClose}>
              Avbryt
            </Button>
            <Button variant="outlined" onClick={deleteCustomer}>
              Skicka
            </Button>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  </>
  );
};

export default AlertDialogCustomer;

