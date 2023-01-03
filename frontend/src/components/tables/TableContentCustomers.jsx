import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  CircularProgress,
  TablePagination,
  TextField,
} from "@mui/material";
import EditCustomer from "../manageCustomers/EditCustomer";
import EditCustomerPass from "../manageCustomers/EditCustomerPass";
import DeleteDialogCustomer from "../manageCustomers/DeleteDialogCustomer";
import Colors from "../../Colors";
import RegisterCustomerModal from "../manageCustomers/RegisterCustomerModal";
import { useState } from "react";

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

export default function TableContentCustomers(props) {
  const { customerData, setCustomerData, input, setInput } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchedData, setSearchedData] = useState(customerData);
  const [active, isActive] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const requestSearch = (searched) => {
    setSearchedData(
      customerData.filter((item) =>
        item.custName.toLowerCase().includes(searched.toLowerCase())
      )
    );
    isActive(true);
  };

  return (
    <>
      {!props.isLoaded ? (
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
          <TableContainer component={Paper}>
            <TableRow
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="search..."
                type="search"
                onChange={(e) => requestSearch(e.target.value)}
              />
              <RegisterCustomerModal title="Skapa en ny kund" />
            </TableRow>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Kund id</StyledTableCell>
                  <StyledTableCell>Namn- och efternamn</StyledTableCell>
                  <StyledTableCell>Telefonnummer</StyledTableCell>
                  <StyledTableCell>E-post</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Företagsnamn</StyledTableCell>
                  <StyledTableCell>Org nummer</StyledTableCell>
                  <StyledTableCell>Hantera</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!active
                  ? customerData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={row.customerId}>
                          <StyledTableCell component="th" scope="row">
                            {row.customerId}
                          </StyledTableCell>
                          <StyledTableCell>{row.custName}</StyledTableCell>
                          <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                          <StyledTableCell>{row.email}</StyledTableCell>
                          <StyledTableCell>{row.adress}</StyledTableCell>
                          <StyledTableCell>{row.companyName}</StyledTableCell>
                          <StyledTableCell>{row.orgNr}</StyledTableCell>
                          <StyledTableCell>
                            <EditCustomer row={row} />
                            <EditCustomerPass row={row} />
                            <DeleteDialogCustomer
                              customerData={customerData}
                              setCustomerData={setCustomerData}
                              input={input}
                              setInput={setInput}
                              row={row}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                  : searchedData
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
                        <StyledTableRow key={row.customerId}>
                          <StyledTableCell component="th" scope="row">
                            {row.customerId}
                          </StyledTableCell>
                          <StyledTableCell>{row.custName}</StyledTableCell>
                          <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                          <StyledTableCell>{row.email}</StyledTableCell>
                          <StyledTableCell>{row.adress}</StyledTableCell>
                          <StyledTableCell>{row.companyName}</StyledTableCell>
                          <StyledTableCell>{row.orgNr}</StyledTableCell>
                          <StyledTableCell>
                            <EditCustomer row={row} />
                            <EditCustomerPass row={row} />
                            <DeleteDialogCustomer
                              customerData={customerData}
                              setCustomerData={setCustomerData}
                              input={input}
                              setInput={setInput}
                              row={row}
                            />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ backgroundColor: Colors.header200, color: "white" }}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={customerData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
}
