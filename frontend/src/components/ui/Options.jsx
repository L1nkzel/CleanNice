import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;

export default function Options({ booking }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [employeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState({});

  const fetchUsers = async () => {
    const res = await fetch("https://clean-nice.vercel.app/api/employee/", {
      credentials: "include",
    });

    const dataUsers = await res.json();

    setEmployeeList(dataUsers);
    filterEmployees()
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const filterEmployees = () =>{

    for (let i = 0; i < employeeList.length; i++) {
      if (employeeList[i].role === "Admin") {
        setEmployeeList(
          employeeList.filter(
            (employee) => employee.employeeId !== employeeList[i].employeeId
            )
      );
    }
    for (let j = 0; j < employeeList[i]?.bookings?.length; j++) {
      if (
        employeeList[i]?.bookings[j]?.time === booking.time &&
        employeeList[i]?.bookings[j]?.date === booking.date
        ) {
          setEmployeeList(
            employeeList.filter(
              (employee) => employee.employeeId !== employeeList[i].employeeId
              )
              );
              
            }
    }
  }
}
filterEmployees()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };

  const employeeChooseHandler = async (option) => {
    console.log(booking);
    setEmployee(option);
    console.log(option);

    const body = {
      cleanerName: option?.employeeName,
      status: "Bokad",
      employeeId: option?.employeeId,
    };
    const fetchConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
       
      },
      credentials: "include",
      body: JSON.stringify(body),
    };

    const res = await fetch(
      `https://clean-nice.vercel.app/api/bookings/${booking.bookingId}/editBookingCleaner`,
      fetchConfig
    );
    const body2 = await res.json();
    console.log(body2);
    const mailData = {
      employeeName: option?.employeeName,
      time:booking?.time,
      date:booking?.date,
      email: option?.email,
      

    }
    await fetch(`https://clean-nice.vercel.app/api/email/assignCleaner`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailData),
      credentials: "include",
    });
  
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{mx:0.5}}
      >
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            textAlign:'center',
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "22ch",
          },
        }}
      >
        {employeeList.length !== 0 ? employeeList.map((option) => (
          <MenuItem
            key={option.employeeId}
            onClick={() => employeeChooseHandler(option)}
          >
            {option?.employeeName}
                      </MenuItem>
        )): "Inga tillgängliga städare"}
      </Menu>
    </div>
  );
}
