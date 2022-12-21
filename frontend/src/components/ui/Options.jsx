
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import { useEffect } from 'react';



const ITEM_HEIGHT = 48;

export default function Options({bookingId,setConfirmedServices}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [employeeList, setEmployeeList] = useState([])
  const [employee, setEmployee] = useState({})

  useEffect(()=>{
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3500/api/employee/",
      {
        credentials: 'include',
      });

      const dataUsers = await res.json();

      setEmployeeList(dataUsers);
    };
    fetchUsers();
  }, [ employee?.count?.bookings]);


  for (let i = 0; i < employeeList.length; i++) {
    if (employeeList[i].role === "Admin") {
      setEmployeeList(
        employeeList.filter(
          (employee) => employee.employeeId !== employeeList[i].employeeId
        )
      );
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClose = () => {
  setEmployee({...{}})
    setAnchorEl(null);
  };

  const employeeChooseHandler = async(option)=>{
    console.log(bookingId)
    setEmployee(option)
    console.log(option)
    

  const body ={
    cleanerName: option?.employeeName,
    status: 'Bokad',
    employeeId: option?.employeeId
  }
  const fetchConfig = {
    method:'PATCH',
    headers: { "Content-Type": "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000/'
    },
    credentials:'include',
    body:JSON.stringify(body)
  }

  const res = await fetch(`http://localhost:3500/api/bookings/${bookingId}/editBookingCleaner`, fetchConfig)
  const body2 = await res.json()
  console.log(body2)
  const re = await fetch(`http://localhost:3500/api/bookings/`)
  const re2 = await re.json()
  setConfirmedServices(re2.filter((confirmed) => confirmed.status === "Bekräftad"))
  handleClose()
}



  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
         {employeeList.map((option) => (
          <MenuItem  key={option.employeeId}  onClick={()=> employeeChooseHandler(option)}>
            {option?.employeeName}
          </MenuItem>
        ))} 
      </Menu>
    </div>
  );
}