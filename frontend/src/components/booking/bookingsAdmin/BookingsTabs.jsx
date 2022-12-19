import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TableContent from "../tables/TableContent";
import Title from "../../ui/Title";

export default function BookingsTabs({ data }) {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const bookUrl = `http://localhost:3500/api/bookings/`;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [bookings, setBookings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const book = JSON.stringify(bookings);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(`http://localhost:3500/api/bookings/`, {
          credentials: "include",
        });

        const result = await res.json();

        setBookings(result);
      } catch (err) {
        setErrorMessage(err);
      }
    };
    checkUser();
  }, []);

  const deleteBookingHandler = async (id) => {
    if (window.confirm("Är du säker att du vill ta bort denna bokning")) {
      await fetch(`http://localhost:3500/api/bookings/${id}/booking`, {
        method: "DELETE",
      });
      setBookings(bookings.filter((booking) => booking.bookingId !== id));
    } else {
      return;
    }
  };

  return (
    <>
    <Title color={"darkgreen"}>Administreara bookningar</Title>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 1500,
          minheight: 600,
          borderColor: "black",
          borderRadius: 2,
          boxShadow: 10,
          background: "linear-gradient(to top,#6982db, #FBFBFB)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px 4px 0 0",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontWeight: "bold" }}
              value={0}
              label="Bekräftade Städningar"
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              value={1}
              label="Bookade Städningar"
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              value={2}
              label="Godkända Städningar"
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              value={3}
              label="Icke godkända Städningar"
            />
            <Tab sx={{ fontWeight: "bold" }} value={4} label="Historik" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TableContent
            data={bookings}
            dataUser={data}
            deleteBookingHandler={deleteBookingHandler}
          />
        </TabPanel>

        <TabPanel value={value} index={1}>
        <TableContent
            data={bookings}
            dataUser={data}
            deleteBookingHandler={deleteBookingHandler}
          />
        </TabPanel>

        <TabPanel value={value} index={2}></TabPanel>

        <TabPanel value={value} index={3}></TabPanel>

        <TabPanel value={value} index={4}></TabPanel>
      </Box>
    </Box>
    </>
  );
}

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            my: 1.5,
            p: 2,
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
