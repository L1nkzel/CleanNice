import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import RadioButtonsGroup from "./RadioButtonsGroup";
import CalenderComponent from "./calender/CalenderComponent";
import Title from "../ui/Title";

export default function BookService() {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("");
  const [value, setValue] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [showTime, setShowTime] = React.useState(false);
  const [time, setTime] = React.useState("");

  const dateNumbers = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  const handleChange = (newValue) => {
    setValue({ value: newValue });
  };

  function handleNextTab() {
    setValue(value + 1);
  }
  function handleCalenderOnPress() {
    setValue(value + 1);
  }
  function handleServicesTab() {
    setValue(value + 1);
    console.log(selected);
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
        my: 5,
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "4px 4px 0 0",
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "#BCC7B8",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              color
              sx={{ fontWeight: "bold" }}
              disabled
              value={0}
              label="Välj tjänst"
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              disabled
              value={1}
              label="Välj datum och tid"
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              disabled
              value={2}
              label="Detaljer"
            />
            <Tab
              sx={{ fontWeight: "bold" }}
              disabled
              value={3}
              label="Betalning"
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
              backgroundColor: "#BCC7B8",
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
            <CustomButton onClick={handleNextTab}>Bekräfta</CustomButton>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Typography sx={{ mb: 30 }}>Item Four</Typography>
          <Grid
            container
            columnGap={1}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <CustomButton onClick={handleBackTab}>Bakåt</CustomButton>
            <CustomButton onClick={handleNextTab}>Slutför</CustomButton>
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
