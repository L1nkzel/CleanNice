import { Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import FormStyle from './form/FormStyle'

function EditEmployee({row}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    const URL = "http://localhost:3500/api/employee"
    const [formData, setFormData] = useState({
        employeeName: row.employeeName,
        adress: row.adress,
        phoneNumber: row.phoneNumber,
        email: row.email,
        personalNumber: row.personalNumber,
        accountNumber: row.accountNumber,

    })

    const onHandleChange = (e) => {
        const { name, value } = e.target;
    console.log(name, value)
        setFormData({
          ...formData,
          [name]: value,
        });

      };

      const editEmployeeHandler = async () => {

        const data = {
          employeeName: formData.employeeName,
          adress: formData.adress,
          phoneNumber: formData.phoneNumber,
          email: formData.email,
          personalNumber: formData.personalNumber,
          accountNumber: formData.accountNumber
         
        }

       const res = await fetch(`${URL}/${row.employeeId}/editEmployee`, {
           method: "PATCH",
           credentials: 'include',
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(data)
             })

             const dataF = await res.json()
             console.log(dataF)
       }
     
      
  return (
<>
      <Button onClick={handleOpen}>
      <Edit sx={{color:'#62926C'}}/>
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
        <DialogTitle>Redigera städare</DialogTitle>
        <DialogContent >
            <TextField
              name="employeeName"
              value={formData.employeeName}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="För- efternamn"
              placeholder="För- efternamn"
              required
              variant="outlined"
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="adress"
              value={formData.adress}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Address"
              placeholder="Address"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="phoneNumber"
              value={formData.phoneNumber}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Telefonnr"
              placeholder="Telefonnr"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="email"
              value={formData.email}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Epost"
              placeholder="Epost"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="personalNumber"
              value={formData.personalNumber}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Personnr"
              placeholder="Personnr"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            <TextField
              name="accountNumber"
              value={formData.accountNumber}
              sx={FormStyle.editDialogInput}
              onChange={onHandleChange}
              fullWidth
              label="Kontonr"
              placeholder="Kontonr"
              required
              InputProps={{
                disableunderline: true,
              }}
            />
            
        <DialogActions sx={{display:"flex", justifyContent:"center"}}>
          <Button variant="outlined" onClick={handleClose}>Avbryt</Button>
          <Button variant="outlined" onClick={editEmployeeHandler}>Update</Button>
        </DialogActions>
        </DialogContent>
        </Box>
      </Dialog>
</>
  )
}

export default EditEmployee