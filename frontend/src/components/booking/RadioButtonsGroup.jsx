import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function RadioButtonsGroup({ selected, setSelected }) {
  function handleChange(e) {
    const { value } = e.target;

    setSelected(value);
  }

  return (
    <FormControl sx={{display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    mb: 2,
    pt:2,
    
    borderRadius: 3,
    boxShadow: 10,
    backgroundColor: "#BCC7B8",}}>
      <FormLabel sx={{textAlign:'center', fontSize:20, fontWeight:'bold'}} id="demo-radio-buttons-group-label">Välj en tjänst:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue="brons"
        value={selected}
        onChange={handleChange}
      >
        <FormControlLabel
          sx={{ mt: 2, ml: 4}}
          value="Brons Städning"
          control={<Radio />}
          label={<Typography sx={{backgroundColor:"#CD7F32", py:0.5, px:1, borderRadius:2, fontWeight:'bold', fontSize:18}} >Brons Städning</Typography>}
        />
        <Typography sx={{ ml: 9.5, mb: 4, mr:2 }}>
          Dammsugning, moppning, städ av toaletter och tömning av papperskorgar.
        </Typography>
        <FormControlLabel
          sx={{ mt: 2, ml: 4 }}
          value="Silver Städning"
          control={<Radio />}
          label={<Typography sx={{backgroundColor:"#aaa9ad", py:0.5, px:1, borderRadius:2, fontWeight:'bold', fontSize:18}} >Silver Städning</Typography>}
        />
        <Typography sx={{ ml: 9.5, mb: 4, mr:2 }}>
          Allt som erbjuds i brons städning samt avdamning och skrivbords
          städning.
        </Typography>
        <FormControlLabel
          sx={{ ml: 4, }}
          value="Guld Städning"
          control={<Radio />}
          label={<Typography sx={{backgroundColor:"#FFD700", py:0.5, px:1, borderRadius:2, fontWeight:'bold', fontSize:18}} >Guld Städning</Typography>}
        />
        <Typography sx={{ ml: 9.5, mb: 4 , mr:2 }}>
          Allt som erbjuds i brons och silver städning samt fönsterputsning.
        </Typography>
      </RadioGroup>
    </FormControl>
  );
}
