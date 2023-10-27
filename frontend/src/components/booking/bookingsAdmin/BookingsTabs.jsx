import { useEffect, useLayoutEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, createTheme, ThemeProvider} from "@mui/material";
import TableContentBooking from "../../tables/TableContentBooking";
import Title from "../../ui/Title";
import Colors from "../../../Colors";

export default function BookingsTabs({ data }) { 
  const [value, setValue] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false)
  const bookUrl = `https://clean-nice.vercel.app/api/bookings/`;

  const theme = createTheme({
    breakpoints: {
      values: {
        xxs: 0,
        xs: 400,
        sm: 600,
        smm: 810,
        md: 900,
        mm: 1000,
        lg: 1200,
        xl: 1536,
      },
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [bookings, setBookings] = useState([]);
  const [confirmedServices, setConfirmedServices] = useState([]);
  const [bookedServices, setBookedServices] = useState([]);
  const [approvedServices, setApprovedServices] = useState([]);
  const [failedServices, setFailedServices] = useState([]);
  const [historyServices, setHistoryServices] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${bookUrl}`, {
        credentials: "include",
      });
      setIsLoaded(true)
      const result = await res.json();

      setBookings(result);
    } catch (err) {
      setErrorMessage(err);
    }
  };
  useEffect(() => {
    fetchBookings();

  }, [bookings?.length]);

  useLayoutEffect(() => {
    setConfirmedServices(
      bookings?.filter((confirmed) => confirmed.status === "Bekräftad")
       
    );

    setBookedServices(bookings?.filter((booked) => booked.status === "Bokad"));
    setApprovedServices(
      bookings?.filter((booked) => booked.status === "Godkänd")
    );
    setFailedServices(
      bookings?.filter((booked) => booked.status === "Underkänd")
    );

    setHistoryServices(bookings?.filter((paid) => paid.status === "Betald"));

  }, [bookings]);

  const deleteBookingHandler = async (id) => {
    if (window.confirm("Är du säker att du vill ta bort denna bokning")) {
      await fetch(`${bookUrl}${id}/booking`, {
        credentials: "include",
        method: "DELETE",
      });
      setBookings(bookings?.filter((booking) => booking.bookingId !== id));
    } else {
      return;
    }
  };

  const bookingCompleted = async (id) => {
    const data = {
      status: "Betald",
    };
    if (window.confirm("Vill du klarmarkera denna bokning")) {
      const res = await fetch(
        `${bookUrl}${id}/editBooking`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Title color={"darkgreen"}>Administrera bookningar</Title>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt:8, 
          mb:4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: {lg:1500, mm:980, md:800, smm:700, sm:580, xs:520},
            minheight: 600,
            borderColor: "black",
            borderRadius: 2,
            boxShadow: 10,
            background: `linear-gradient(to top, ${Colors.header100}, #FBFBFB)`,
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
                sx={{ fontWeight: "bold", fontSize:{lg: 14, md:12, xs:11} }}
                value={0}
                label="Bekräftade"
              />
              <Tab
                sx={{ fontWeight: "bold", fontSize:{lg: 14, md:12, xs:11} }}
                value={1}
                label="Bookade"
              />
              <Tab
                sx={{ fontWeight: "bold", fontSize:{lg: 14, md:12, xs:11} }}
                value={2}
                label="Godkända"
              />
              <Tab
                sx={{ fontWeight: "bold", fontSize:{lg: 14, md:12, xs:11} }}
                value={3}
                label="Icke godkända"
              />
              <Tab 
              sx={{ fontWeight: "bold", fontSize:{lg: 14, md:12, xs:11} }} 
              value={4} 
              label="Historik" />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <TableContentBooking
              setConfirmedServices={setConfirmedServices}
              fetchBookings={fetchBookings}
              data={confirmedServices}
              dataUser={data}
              deleteBookingHandler={deleteBookingHandler}
              isLoaded={isLoaded}
            />
          </TabPanel>

          <TabPanel value={value} index={1}>
            <TableContentBooking
              data={bookedServices}
              dataUser={data}
              deleteBookingHandler={deleteBookingHandler}
              isLoaded={isLoaded}
            />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <TableContentBooking
              data={approvedServices}
              dataUser={data}
              deleteBookingHandler={deleteBookingHandler}
              isLoaded={isLoaded}
              bookingCompleted={bookingCompleted}

            />
          </TabPanel>

          <TabPanel value={value} index={3}>
            <TableContentBooking
              data={failedServices}
              dataUser={data}
              deleteBookingHandler={deleteBookingHandler}
              isLoaded={isLoaded}
            />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <TableContentBooking
              data={historyServices}
              dataUser={data}
              deleteBookingHandler={deleteBookingHandler}
              isLoaded={isLoaded}
            />
          </TabPanel>
        </Box>
      </Box>
      </ThemeProvider>
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
