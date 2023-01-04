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
import { Message } from "@mui/icons-material";
import { useState } from "react";
import Colors from "../../Colors";

const FailedServiceModal = ({ row }) => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
          <DialogTitle sx={{ fontFamily: "poppins" }}>
            Meddelande från kund
          </DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 1 }}>{row.comment}</Typography>
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
