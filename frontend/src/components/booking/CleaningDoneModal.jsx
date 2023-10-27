import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    IconButton,
    Tooltip,
  } from "@mui/material";
  import { Done } from "@mui/icons-material";
  import { useState } from "react";
  import Colors from "../../Colors";
  
  const CleaningDoneModal = ({setUserBookings, userBookings, row }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
  
    const cleaningDoneHandler = async () => {

        const data={
          status:"Utfört"
        }
       const res =  await fetch(`https://clean-nice.vercel.app/api/bookings/${row?.bookingId}/editBooking`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body:JSON.stringify(data)
          });
         const bookingData = await res.json()
    
         const res2 = await fetch(`https://clean-nice.vercel.app/api/customer/${bookingData?.customerId}`,{
          credentials: "include",
         })
         const customerData = await res2.json()
    
    
         const invoiceData ={
          
            custName: customerData?.custName,
            email: customerData?.email,
            adress:customerData?.adress,
            cleaningService: bookingData?.cleaningService,
            companyName: customerData?.companyName,
            bookingId: bookingData.bookingId,
            orgNr: customerData?.orgNr
        
         }
         await fetch(`https://clean-nice.vercel.app/api/email/invoice`, {
          method:'POST',
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body:JSON.stringify(invoiceData)
         })
    
          setUserBookings(
            userBookings?.filter((booking) => booking.status === "Bokad")
          );
      };
  
    return (
      <>
        <Tooltip title="Godkänn städning">
          <IconButton onClick={handleOpen}>
            <Done sx={{ color: "green" }} />
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
            <DialogTitle>Vill du klarmarkera denna bokning?</DialogTitle>
            <DialogContent>
              <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outlined" onClick={handleClose}>
                  Nej
                </Button>
                <Button variant="outlined" onClick={cleaningDoneHandler}>
                  Ja
                </Button>
              </DialogActions>
            </DialogContent>
          </Box>
        </Dialog>
      </>
    );
  };
  
  export default CleaningDoneModal;
  