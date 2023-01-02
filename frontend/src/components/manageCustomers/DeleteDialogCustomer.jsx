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
  Typography,
} from "@mui/material";
import {DeleteOutline} from "@mui/icons-material";
import { useState } from "react";
import Colors from "../../Colors";




const DeleteDialogCustomer = ({customerData, setCustomerData, input, setInput, row}) => {
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
    <Tooltip title="Remove">
      <IconButton onClick={handleOpen}>
        <DeleteOutline sx={{ color: "#62926C" }} />
      </IconButton>
    </Tooltip>
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
        <DialogTitle>Vill du verkligen radera?</DialogTitle>
        <DialogContent>
          {/* <TextField
            value={input}
            onChange={onHandleChange}
            fullWidth
            required
            variant="outlined"
            InputProps={{
              disableunderline: "true",
            }}
          /> */}
          <Typography>All data kommer att rensas ur systemet</Typography>
          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleClose}>
              Nej
            </Button>
            <Button variant="outlined" onClick={deleteCustomer}>
              Ja
            </Button>
          </DialogActions>
        </DialogContent>
      </Box>
    </Dialog>
  </>
  );
};

export default DeleteDialogCustomer;

