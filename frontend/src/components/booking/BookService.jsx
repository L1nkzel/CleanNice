import { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import RadioButtonsGroup from "../ui/RadioButtonsGroup";
import CalenderComponent from "./calender/CalenderComponent";
import Title from "../ui/Title";

export default function BookService({ data }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [time, setTime] = useState([]);
  const [error, setError] = useState("");
  const bookUrl = `http://localhost:3500/api/bookings/`;
  const dateNumbers = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const handleChange = (newValue) => {
    setValue({ value: newValue });
  };

  async function handleConfirmPress() {
    const dataValue = {
      date: dateNumbers,
      time: time,
      cleaningService: selected
    };

    if(!isNaN(data.customerId)){

      const res = await fetch(`${bookUrl}${data.customerId}/newBooking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataValue),
      });
      const newBooking = await res.json();
      if(res.status === 200){
        const statusData = {
          status: 'Bekräftad',
        }
        const res = await fetch(`${bookUrl}${newBooking.bookingId}/editBooking`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(statusData),
        });
        const booking = await res.json();
        console.log(booking)

        const mailData = {
          custName: data.custName,
          cleaningService: booking?.cleaningService,
          time:booking?.time,
          date:booking?.date,
          email: data.email,
          bookingId: booking?.bookingId

        }
        await fetch(`http://localhost:3500/api/email/newBooking`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mailData),
        });
        navigate('/customer')
      }else{
        return
      }
    }
 
  }

  function handleCalenderOnPress() {
    if (time !== "" && date !== new Date()) {
      setValue(value + 1);
      setError("");
    } else {
      setError(
        "Du måste välja ett datum och en tid för att gå vidare"
      );
    }
  }
  function handleServicesTab() {
    if (selected !== "") {
      setValue(value + 1);
      setError("");
    } else {
      setError("Du måste välja en tjänst för att gå vidare");
    }
  }

  function handleBackTab() {
    setValue(value - 1);
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        my: 20,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 700,
          height: 600,
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
              sx={{ fontWeight: "bold", fontSize:18  }}
              disabled
              value={0}
              label="Välj tjänst"
            />
            <Tab
              sx={{ fontWeight: "bold", fontSize:18 }}
              disabled
              value={1}
              label="Välj datum och tid"
            />
            <Tab
              sx={{ fontWeight: "bold", fontSize:18  }}
              disabled
              value={2}
              label="Detaljer"
            />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <RadioButtonsGroup selected={selected} setSelected={setSelected} />
          <Grid
            container
            columnGap={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CustomButton onClick={handleServicesTab}>Nästa</CustomButton>
          </Grid>
          <Typography
            sx={{
              mt: 1,
              px: 0.5,
              color: "#f59d9d",
            }}
          >
            {error}
          </Typography>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <CalenderComponent
            setDate={setDate}
            setShowTime={setShowTime}
            date={date}
            showTime={showTime}
            time={time}
            setTime={setTime}
          />
          <Box></Box>
          <Grid
            container
            columnGap={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CustomButton onClick={handleBackTab}>Bakåt</CustomButton>
            <CustomButton onClick={handleCalenderOnPress}>Nästa</CustomButton>
          </Grid>
          <Typography
            sx={{
              mt: 1,
              px: 0.5,
              borderRadius: 1,
              color: "#f59d9d",
            }}
          >
            {error}
          </Typography>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Grid
            container
            rowGap={0.5}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mb: 5,
              pb: 2,
              maxWidth: 400,
              borderRadius: 3,
              boxShadow: 10,
              backgroundColor: "white",
            }}
          >
            <Title>Bokningsöversikt</Title>
            <Typography sx={{ fontSize: 18 }}>Val av tjänst: </Typography>
            {selected}
            <Typography sx={{ fontSize: 18 }}>Datum: </Typography>
            {dateNumbers}
            <Typography sx={{ fontSize: 18 }}>Tid:</Typography>
            {time}
          </Grid>
          <Grid
            container
            columnGap={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CustomButton style={{}} onClick={handleBackTab}>
              Bakåt
            </CustomButton>
            <CustomButton onClick={handleConfirmPress}>Bekräfta</CustomButton>
          </Grid>
        </TabPanel>
      </Box>
    </Box>
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

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }
