import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import Colors from "../../Colors";

const DeleteBookingModal = (props) => {
  const { userBookings, setUserBookings, row } = props;
  const URL = "https://clean-nice.vercel.app/api/bookings";

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteBookingHandler = async () => {
    await fetch(`${URL}/${row?.bookingId}/booking`, {
      method: "DELETE",
      credentials: "include",
    });
    setUserBookings(
      userBookings?.filter((booking) => booking.bookingId !== row.bookingId)
    );
    console.log("user:", props?.user);
    if (!isNaN(props?.user?.customerId)) {
      const mailData = {
        custName: props?.user?.custName,
        email: props?.user?.email,
        bookingId: row?.bookingId,
      };
      await fetch(`https://clean-nice.vercel.app/api/email/cancelBooking`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      });
    }
  };

  return (
    <>
      <Tooltip title="Radera">
        <IconButton onClick={handleOpen}>
          <DeleteOutline sx={{ color: "#62926C" }} />
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
          <DialogTitle>Vill du verkligen radera denna bokning?</DialogTitle>
          <DialogContent>
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
