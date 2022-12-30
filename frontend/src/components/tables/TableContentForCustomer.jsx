import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FailedServiceModal from "../booking/FailedServiceModal";
import { Box, Button, CircularProgress} from "@mui/material";
import DeleteBookingModal from "../DeleteBookingModal";
import { Done } from "@mui/icons-material";

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

export default function TableContentForCustomer(props) {
  const {
    data,
    dataUser,
    setUserBookings,
    deleteBookingHandler,
    input,
    setInput,
    isLoaded,
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
        <TableContainer
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
           
          }}
          
        >
          <Table sx={{ maxWidth: 700,
              
          
          }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Boknings Id</StyledTableCell>
                {dataUser?.role === "Admin" ? (
                  <StyledTableCell>Kund Id</StyledTableCell>
                ) : null}
                <StyledTableCell>Städtjänst</StyledTableCell>
                <StyledTableCell>Datum</StyledTableCell>
                <StyledTableCell>Tid</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <StyledTableRow key={row.bookingId}>
                  <StyledTableCell component="th" scope="row">
                    {row.bookingId}
                  </StyledTableCell>

                  <StyledTableCell>{row.cleaningService}</StyledTableCell>
                  <StyledTableCell>{row.date}</StyledTableCell>
                  <StyledTableCell>{row.time}</StyledTableCell>
                  <StyledTableCell>
                    {row.status === "Utfört" ? (
                      <Button
                        onClick={() => props.approveBooking(row.bookingId)}
                        >
                        <Done  sx={{ color: "green" }} />
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

                    {new Date(row.date) > new Date() && row.status === "Bokad" ? (
                      <DeleteBookingModal
                        userBookings={data}
                        setUserBookings={setUserBookings}
                        row={row}
                        user={dataUser}
                      />
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
