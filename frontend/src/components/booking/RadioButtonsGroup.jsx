import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export default function RadioButtonsGroup({ selected, setSelected }) {
  function handleChange(e) {
    const { value } = e.target;

    setSelected(value);
  }

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Välj en tjänst:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        defaultValue="Städning 1"
        value={selected}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Städning 1"
          control={<Radio />}
          label="Städning 1"
        />
        <FormControlLabel value="Städning 2" control={<Radio />} label="Städning 2" />
        <FormControlLabel value="Städning 3" control={<Radio />} label="Städning 3" />
      </RadioGroup>
    </FormControl>
  );
}
