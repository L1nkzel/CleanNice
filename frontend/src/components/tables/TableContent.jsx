import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteOutline, Done, Clear } from "@mui/icons-material";

import { Button } from "@mui/material";
import Options from "../ui/Options";

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

export default function TableContent(props) {
  console.log(props.data);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Boknings Id</StyledTableCell>
            <StyledTableCell>Kund Id</StyledTableCell>
            <StyledTableCell>Kontaktperson</StyledTableCell>
            <StyledTableCell>Telefonnummer</StyledTableCell>
            <StyledTableCell>Företagsnamn</StyledTableCell>
            <StyledTableCell>Ansvarig städare</StyledTableCell>
            <StyledTableCell>Adress</StyledTableCell>
            <StyledTableCell>Städtjänst</StyledTableCell>
            <StyledTableCell>Datum</StyledTableCell>
            <StyledTableCell>Tid</StyledTableCell>
            <StyledTableCell>Bokningsstatus</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((row) => (
            <StyledTableRow key={row.bookingId}>
              <StyledTableCell component="th" scope="row">
                {row.bookingId}
              </StyledTableCell>
              <StyledTableCell>{row.customerId}</StyledTableCell>
              <StyledTableCell>{row.customerName}</StyledTableCell>
              <StyledTableCell>{row.phoneNumber}</StyledTableCell>
              <StyledTableCell>{row.companyName}</StyledTableCell>
              <StyledTableCell>
                {row.cleanerName}
                {props.dataUser?.role === "Admin" ? (
                  <Options
                    booking={row}
                    fetchBookings={props.fetchBookings}
                    setConfirmedServices={props.setConfirmedServices}
                  />
                ) : null}
              </StyledTableCell>
              <StyledTableCell>{row.adress}</StyledTableCell>
              <StyledTableCell>{row.cleaningService}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>
                {row.status === "Utfört"? (
                  <Button onClick={() => props.approveBooking(row.bookingId)}>
                    <Done sx={{ color: "green" }} />
                  </Button>
                ) : null}
                {row.status === "Utfört" ? (
                  <Button onClick={() => props.failBooking(row.bookingId)}>
                    <Clear sx={{ color: "red" }} />
                  </Button>
                ) : null}
                {!row.date === new Date() || row.status !== "Utfört" ? (
                  <Button
                    onClick={() => props.deleteBookingHandler(row.bookingId)}
                  >
                    <DeleteOutline sx={{ color: "black" }} />
                  </Button>
                ) : null}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}