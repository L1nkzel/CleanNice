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
import FailedServiceModal from "../booking/FailedServiceModal";
import FailedServiceMessage from "../booking/FailedServiceMessage"
import { Button } from "@mui/material";
import Options from "../ui/Options";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#6982db",
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 20,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
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

export default function TableContentBooking(props) {

  const {
    data,
    dataUser,
    setUserBookings,
    deleteBookingHandler,
    input,
    setInput,
  } = props;

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
          {data?.map((row) => (
            <StyledTableRow key={row.bookingId}>
              <StyledTableCell component="th" scope="row">
                {row.bookingId}
              </StyledTableCell>
              <StyledTableCell>{row.customerId}</StyledTableCell>
              <StyledTableCell>{row.customerName}</StyledTableCell>
              <StyledTableCell>{row.phoneNumber}</StyledTableCell>
              <StyledTableCell>{row.companyName}</StyledTableCell>
              {dataUser?.role === "Admin" ? (
                <StyledTableCell sx={{display:"flex", alignItems:"center"}} align="center">
                {row.cleanerName}
                {dataUser?.role === "Admin" ? (
                  <Options booking={row} />
                ) : null}
              </StyledTableCell>
                ) :   <StyledTableCell>
                {row.cleanerName}
                {dataUser?.role === "Admin" ? (
                  <Options booking={row} />
                ) : null}
              </StyledTableCell>}
            
              <StyledTableCell>{row.adress}</StyledTableCell>
              <StyledTableCell>{row.cleaningService}</StyledTableCell>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.time}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              <StyledTableCell>
                {row.status === "Utfört" ? (
                  <Button onClick={() => props.approveBooking(row.bookingId)}>
                    <Done sx={{ color: "green" }} />
                  </Button>
                ) : null}
                {row.status === "Utfört" ? (
                  <FailedServiceModal
                    userBookings={data}
                    setUserBookings={setUserBookings}
                    input={input}
                    setInput={setInput}
                    row={row}
                  />
                ) : null}
                {dataUser?.role === "Admin" && row.comment !== "N/A" ? (
                  <FailedServiceMessage row={row}/>
                ) : null
                }
                {!row.date === new Date() || row.status !== "Utfört" ? (
                  <Button onClick={() => deleteBookingHandler(row.bookingId)}>
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
