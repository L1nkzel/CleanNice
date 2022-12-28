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
  import { Close, DeleteOutline, Edit, Remove } from "@mui/icons-material";
  import create from 'zustand';
  import { useState } from "react";
  
  
  
  
  const DeleteBookingModal=(props) => {
    const {userBookings, setUserBookings, row} = props
    const URL = "http://localhost:3500/api/bookings"
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
    

      const deleteBookingHandler = async () => {
      
          await fetch(`${URL}/${row.bookingId}/booking`, {
            method: "DELETE",
          });
          setUserBookings(
            userBookings.filter((booking) => booking.bookingId !== row.bookingId)
          );
          console.log("user:", props?.user)
          if(!isNaN(props?.user.customerId)){
            const mailData = {
              custName: props.user.custName,
              email:props.user.email,
              bookingId: row.bookingId
    
            }
            await fetch(`http://localhost:3500/api/email/cancelBooking`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(mailData),
            });
          }
      };
  
    // function onHandleChange (e) {
    //   setInput(() => e.target.value)
    //   console.log(e.target.value);
    // }
    
  
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
          <DialogTitle>Vill du verkligen radera denna bokning?</DialogTitle>
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
              <Button variant="outlined" onClick={deleteBookingHandler}>
                Ja
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
    );
  };
  
  export default DeleteBookingModal;
  
  