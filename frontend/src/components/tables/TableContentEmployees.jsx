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
import DeleteDialogEmployee from "../manageEmployees/DeleteDialogEmployee";
import {
  Box,
  CircularProgress,
  TablePagination,
  TextField,
} from "@mui/material";
import Colors from "../../Colors";
import { useState } from "react";
import RegisterEmployeeModal from "../manageEmployees/RegisterEmployeeModal";

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

export default function TableContentEmployees(props) {
  const { employeeData, setEmployeeData } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchedData, setSearchedData] = useState(employeeData);
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
      employeeData.filter((item) =>
        item.employeeName.toLowerCase().includes(searched.toLowerCase())
      )
    );
    isActive(true);
  };

  //Hoppa inte till nästa sida om den är tom
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employeeData.length) : 0;

  return (
    <Box sx={{ mb: 2 }}>
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
              <RegisterEmployeeModal />
            </TableRow>
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
                {(!active ? employeeData : searchedData)
                     ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
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
                          <DeleteDialogEmployee
                            employeeData={employeeData}
                            setEmployeeData={setEmployeeData}
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
            count={employeeData?.length}
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
