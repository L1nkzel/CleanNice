import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { useState } from "react";
import Colors from "../../Colors";

const DeleteDialogCustomer = ({
  customerData,
  setCustomerData,
  row,
}) => {
  const URL = "https://clean-nice.vercel.app/api/customer";

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
          <DialogTitle>Vill du verkligen radera?</DialogTitle>
          <DialogContent>
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
