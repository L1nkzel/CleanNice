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
  
  
  
  
  const AlertDialogEmployee = (props) => {
    const {employeeData, setEmployeeData, row} = props
    const URL = "http://localhost:3500/api/employee"
  
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => setOpen(false);
    
    const deleteEmployee = async () => {
        await fetch(`${URL}/${row.employeeId}/deleteEmployee`, {
          method: "DELETE",
          credentials: "include",
        });
        setEmployeeData(
          employeeData.filter((employee) => employee.employeeId !== row.employeeId)
        );
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
              <Button variant="outlined" onClick={deleteEmployee}>
                Ja
              </Button>
            </DialogActions>
          </DialogContent>
        </Box>
      </Dialog>
    </>
    );
  };
  
  export default AlertDialogEmployee;
  
  