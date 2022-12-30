import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Typography,
    TextField,
    Tooltip,
  } from "@mui/material";
  import { Clear, Close, DeleteOutline, Edit, Remove } from "@mui/icons-material";
  import create from 'zustand';
  import { useState } from "react";
  
  
  
  
  const FailedServiceModal = ({ input, setInput, row}) => {
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
    
    
    function onHandleChange (e) {
      setInput(() => e.target.value)
      console.log(e.target.value);
    }

    const failedServiceHandler = async () => {
      const data = {
        status: "Underkänd",
        comment: input
      };

        const res = await fetch(
          `http://localhost:3500/api/bookings/${row.bookingId}/editBooking`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
          }
        );
        const data2 = await res.json();
        console.log(data2);

      
    };
    
  
    return (
      <>
      <Tooltip title="Underkänn städning">
        <IconButton onClick={handleOpen}>
          <Clear sx={{ color: "#cd3112" }} />
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
              multiline
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
              <Button variant="outlined" onClick={failedServiceHandler}>
                Skicka
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
    );
  };
  
  export default FailedServiceModal;
  
  