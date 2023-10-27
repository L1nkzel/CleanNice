import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import CheckIcon from "@mui/icons-material/Check";

import { Box, Button, CircularProgress, TablePagination } from "@mui/material";
import Colors from "../../Colors";
import CleaningDoneModal from "../booking/CleaningDoneModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: Colors.header200,
    color: theme.palette.common.white,
    fontSize: 16,
    padding: 20,
    whiteSpace: "nowrap",
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: 20,
    whiteSpace: "nowrap",
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

export default function TableContentCleaner(props) {
  const { userBookings, setUserBookings, isLoaded } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mb: 2 }}>
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
        <>
          <TableContainer sx={{ width: "100%" }} component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Boknings Id</StyledTableCell>
                  <StyledTableCell>Kund Id</StyledTableCell>
                  <StyledTableCell>Kontaktperson</StyledTableCell>
                  <StyledTableCell>Telefonnummer</StyledTableCell>
                  <StyledTableCell>Företagsnamn</StyledTableCell>
                  <StyledTableCell>Adress</StyledTableCell>
                  <StyledTableCell>Städtjänst</StyledTableCell>
                  <StyledTableCell>Datum</StyledTableCell>
                  <StyledTableCell>Tid</StyledTableCell>
                  <StyledTableCell>Bokningsstatus</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userBookings
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  ?.map((row) => (
                    <StyledTableRow key={row.bookingId}>
                      <StyledTableCell component="th" scope="row">
                        {row.bookingId}
                      </StyledTableCell>
                      <StyledTableCell>{row.customerId}</StyledTableCell>
                      <StyledTableCell>{row.customerName}</StyledTableCell>
                      <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                      <StyledTableCell>{row.companyName}</StyledTableCell>
                      <StyledTableCell>{row.adress}</StyledTableCell>
                      <StyledTableCell>{row.cleaningService}</StyledTableCell>
                      <StyledTableCell>{row.date}</StyledTableCell>
                      <StyledTableCell>{row.time}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>
                      <CleaningDoneModal row={row} setUserBookings={setUserBookings} userBookings={userBookings} />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{
              backgroundColor: Colors.header200,
              color: "white",
            }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={userBookings?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Box>
  );
}
