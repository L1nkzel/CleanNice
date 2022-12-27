import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditEmployee from "../manageEmployees/EditEmployee";
import EditEmployeePass from "../manageEmployees/EditEmployeePass"; 
import AlertDialogEmployee from "../manageEmployees/AlertDialogEmployee";
import { Box, CircularProgress } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6982db",
    color: theme.palette.common.white,
    fontSize: 16,
    padding: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: 20,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(105, 130, 219, 0.3)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function TableContentEmployees(props) {
  const {employeeData, setEmployeeData } = props;
  return (
    <>
    {!props.isLoaded ? <Box sx={{mt:15,flexGrow:1, justifyContent:'center', display:'flex', alignItems:'center' }}>
    <CircularProgress size="50px" />
    
  </Box> :  <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Anställnings id</StyledTableCell>
            <StyledTableCell>Namn- och efternamn</StyledTableCell>
            <StyledTableCell>Personnummer</StyledTableCell>
            <StyledTableCell>Telefonnummer</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>Konto nummer</StyledTableCell>
            <StyledTableCell>E-post</StyledTableCell>
            <StyledTableCell>Hantera</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeData?.map((row) => (
            <StyledTableRow key={row.employeeId}>
              <StyledTableCell component="th" scope="row">
                {row.employeeId}
              </StyledTableCell>
              <StyledTableCell>{row.employeeName}</StyledTableCell>
              <StyledTableCell>{row.personalNumber}</StyledTableCell>
              <StyledTableCell>{row.phoneNumber}</StyledTableCell>
              <StyledTableCell>{row.adress}</StyledTableCell>
              <StyledTableCell>{row.accountNumber}</StyledTableCell>
              <StyledTableCell>{row.email}</StyledTableCell>
              <StyledTableCell>
                <EditEmployee row={row} />
                <EditEmployeePass row={row} />
                <AlertDialogEmployee employeeData={employeeData} setEmployeeData={setEmployeeData} row={row}/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>}
    </>
  );
}
