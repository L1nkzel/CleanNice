import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  AssignmentTurnedIn,
} from "@mui/icons-material";
import FailedServiceMessage from "../booking/FailedServiceMessage";
import { Box, Button, CircularProgress, Tooltip } from "@mui/material";
import Options from "../ui/Options";
import DeleteBookingModal from "../DeleteBookingModal";
import Colors from "../../Colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.header200,
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 20,
    whiteSpace: 'nowrap'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    paddingLeft: 20,
    whiteSpace: 'nowrap'
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: Colors.cell100,
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
    isLoaded,
    bookingCompleted,
  } = props;

  return (
    <>
      {!isLoaded ? (
        <Box
          sx={{
            mt: 15,
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CircularProgress size="50px" />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Boknings Id</StyledTableCell>
                {dataUser?.role === "Admin" ? (
                  <StyledTableCell>Kund Id</StyledTableCell>
                ) : null}
                <StyledTableCell>Kontaktperson</StyledTableCell>
                <StyledTableCell>Telefonnummer</StyledTableCell>
                <StyledTableCell>Företag</StyledTableCell>
                <StyledTableCell>Städare</StyledTableCell>
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
                  {dataUser?.role === "Admin" ? (
                    <StyledTableCell>{row.customerId}</StyledTableCell>
                  ) : null}
                  <StyledTableCell>{row.customerName}</StyledTableCell>
                  <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell>{row.companyName}</StyledTableCell>
                  {dataUser?.role === "Admin" ? (
                    <StyledTableCell
                      sx={{ display: "flex", alignItems: "center" }}
                      align="center"
                    >
                      {row.cleanerName}
                      {dataUser?.role === "Admin" ? (
                        <Options booking={row} />
                      ) : null}
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell>
                      {row.cleanerName}
                      {dataUser?.role === "Admin" ? (
                        <Options booking={row} />
                      ) : null}
                    </StyledTableCell>
                  )}

                  <StyledTableCell>{row.adress}</StyledTableCell>
                  <StyledTableCell>{row.cleaningService}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.time}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell>
                    {dataUser?.role === "Admin" && row.comment !== "N/A" ? (
                      <FailedServiceMessage row={row} />
                    ) : null}
                    {new Date(row.date) > new Date() - 1 && (row.status === "Bekräftad" || row.status === "Bokad")? (
                      <DeleteBookingModal
                        userBookings={data}
                        setUserBookings={setUserBookings}
                        row={row}
                        user={dataUser}
                      />
                    ) : null}
                    {row.status === "Godkänd" ? (
                      <Tooltip title="Klarmarkera">
                        <Button onClick={() => bookingCompleted(row.bookingId)}>
                          <AssignmentTurnedIn sx={{ color: "green" }} />
                        </Button>
                      </Tooltip>
                    ) : null}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
