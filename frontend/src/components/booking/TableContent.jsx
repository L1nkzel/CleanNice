import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
 DeleteOutline
} from "@mui/icons-material";

import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#62926C',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(155,255,155,0.1)',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function TableContent({data, deleteBookingHandler}) {

  console.log(data)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Boknings Id</StyledTableCell>
            <StyledTableCell>Kund Id</StyledTableCell>
            <StyledTableCell >För- och efternamn</StyledTableCell>
            <StyledTableCell >Ansvarig städare</StyledTableCell>
            <StyledTableCell >Datum</StyledTableCell>
            <StyledTableCell >Adress</StyledTableCell>
            <StyledTableCell >Tid</StyledTableCell>
            <StyledTableCell >Bokningsstatus</StyledTableCell>
            <StyledTableCell ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <StyledTableRow key={row.bookingId}>
              <StyledTableCell component="th" scope="row">
                {row.bookingId}
              </StyledTableCell>
              <StyledTableCell >{row.customerId}</StyledTableCell>
              <StyledTableCell >{row.customerName}</StyledTableCell>
              <StyledTableCell >{row.cleanerName}</StyledTableCell>
              <StyledTableCell >{row.date}</StyledTableCell>
              <StyledTableCell >{row.adress}</StyledTableCell>
              <StyledTableCell >{row.time}</StyledTableCell>
              <StyledTableCell >{row.status}</StyledTableCell>
              <StyledTableCell ><Button onClick={()=>deleteBookingHandler(row.bookingId)}><DeleteOutline sx={{color:'#62926C'}}/></Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}