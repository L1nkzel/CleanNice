import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material';
import CustomButton from './ui/CustomButton';
import { useNavigate } from "react-router-dom";

function TabPanel({children, value, index, ...other }) {
    return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
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

export default function BookService() {
const navigate = useNavigate()
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue({value: newValue});
  };

  function handleNextTab() {
    setValue((value + 1))
}
  function handleBackTab() {
    setValue((value - 1))
}
  

  return (
    <Box sx={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center", 
        minHeight: "100vh",
    }}>
    <Box sx={{
        width: 600,
        height: 400,
        borderColor:"black",
        borderRadius: 2,
        boxShadow: 10
        }}>
      <Box sx={{borderRadius: "4px 4px 0 0", borderBottom: 1, borderColor: 'divider', backgroundColor: "#BCC7B8" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab disabled value={0} label="Välj tjänst"  />
          <Tab disabled value={1} label="Välj datum och tid"  />
          <Tab disabled value={2} label="Detaljer"  />
          <Tab disabled value={3} label="Betalning"/>
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <Typography sx={{mb:30}}>Item One</Typography>
        <Grid container columnGap={1} sx={{display:"flex", justifyContent:"center"}}>
        <CustomButton onClick={handleNextTab}>Nästa</CustomButton>
        </Grid>
      </TabPanel>
   
      <TabPanel value={value} index={1}>
      <Typography sx={{mb:30}}>Item Two</Typography>
        <Grid container columnGap={1} sx={{display:"flex", justifyContent:"center"}}>
        <CustomButton onClick={handleNextTab}>Nästa</CustomButton>
        <CustomButton onClick={handleBackTab}>Bakåt</CustomButton>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Typography sx={{mb:30}}>Item Three</Typography>
        <Grid container columnGap={1} sx={{display:"flex", justifyContent:"center"}}>
        <CustomButton onClick={handleNextTab}>Nästa</CustomButton>
        <CustomButton onClick={handleBackTab}>Bakåt</CustomButton>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Typography sx={{mb:30}}>Item Four</Typography>
        <Grid container columnGap={1} sx={{display:"flex", justifyContent:"center"}}>
        <CustomButton onClick={handleNextTab}>Slutför</CustomButton>
        <CustomButton onClick={handleBackTab}>Bakåt</CustomButton>
        </Grid>
      </TabPanel>
      </Box>
    </Box>
  );
}
