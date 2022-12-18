import { Key, } from '@mui/icons-material';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import AlertDialogModal from './AlertDialogModal';
import FormStyle from './form/FormStyle';

function EditEmployeePass({row}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const URL = "http://localhost:3500/api/employee"
    const [formData, setFormData] = useState({
        password: ""
    })

    const onHandleChange = (e) => {
        const { name, value } = e.target;
    console.log(name, value)
        setFormData({
          ...formData,
          [name]: value,
        });

      };

      const changePasswordHandler = async () => {
        const data = {
            password : formData.password
        }

        const res = await fetch(`${URL}/${row.employeeId}/editEmployeePass`, {
            method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
              })
 
              const dataF = await res.json()
              console.log(dataF)
              
              return <AlertDialogModal />
              
        }
      


  return (
    <>
      <Button onClick={handleOpen}>
      <Tooltip title="Change password">
      <Key sx={{color:'#62926C'}}/>
      </Tooltip>
      </Button>
      <Dialog
      PaperProps={{
        sx: {
          background:"linear-gradient(to left top,#5e92ce, #ffffff)"
        }
      }}
        sx={{
          backdropFilter: "blur(3px)",
          bgColor: "rgba(0,0,30,0.4)",
        }}
        
        maxWidth="sm"
        open={open}
      ><Box sx={{display:"flex", flexDirection:"column",alignItems:"center"}}>
        <DialogTitle>Byt lösenord</DialogTitle>
        <DialogContent>
            <TextField
              name="password"
              value={formData.password}
              sx={FormStyle.dialogInput}
              onChange={onHandleChange}
              fullWidth
              placeholder="Ändra lösenord"
              required
              variant="outlined"
              InputProps={{
                disableunderline: true,
              }}
            />

            
        <DialogActions sx={{display:"flex", justifyContent:"center"}}>
          <Button variant="outlined" onClick={handleClose}>Avbryt</Button>
          <Button variant="outlined" onClick={changePasswordHandler}>Update</Button>
        </DialogActions>
        </DialogContent>
        </Box>
      </Dialog>
</>
  )
}

export default EditEmployeePass