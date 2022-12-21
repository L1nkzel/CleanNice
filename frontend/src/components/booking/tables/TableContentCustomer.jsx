import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteOutline} from "@mui/icons-material";
import {IconButton, Tooltip } from "@mui/material";
import EditCustomer from "../../manageCustomers/EditCustomer";
import EditCustomerPass from "../../manageCustomers/EditCustomerPass";

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

export default function TableContentCustomer(props, { data, deleteBookingHandler }) {
  return (
    <TableContainer component={Paper}>
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
          {props.data?.map((row) => (
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
                <EditCustomer row={row}/>
                <EditCustomerPass row={row}/>
                <Tooltip title="Delete">
                  <IconButton>
                    <DeleteOutline onclick={()=>deleteBookingHandler(row.customerId)} sx={{ color: "#62926C" }} />
                  </IconButton>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
