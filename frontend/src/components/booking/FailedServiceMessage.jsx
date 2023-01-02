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
  import { Clear, Close, DeleteOutline, Edit, Message, Remove } from "@mui/icons-material";
  import create from 'zustand';
  import { useEffect, useState } from "react";
import Colors from "../../Colors";
  
  
  
  
  const FailedServiceModal = ({ input, setInput, row}) => {
    const URL = "http://localhost:3500/api/bookings"
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
    const [data, setData] = useState()
    const [message, setMessage] = useState("")
    
    function onHandleChange (e) {
      setInput(() => e.target.value)
      console.log(e.target.value);
    }


  
    return (
      <>
      <Tooltip title="Meddelande från kund">
        <IconButton onClick={handleOpen}>
          <Message sx={{ color: "#cd3112" }} />
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
          <DialogTitle sx={{fontFamily:"poppins"}}>Meddelande från kund</DialogTitle>
          <DialogContent>
        <Typography sx={{mb:1}}>
            {row.comment}
        </Typography>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" size="small" onClick={handleClose}>
                Avbryt
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
    );
  };
  
  export default FailedServiceModal;
  
  