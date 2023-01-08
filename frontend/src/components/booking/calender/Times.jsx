import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Colors from "../../../Colors";

const time = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

function Times(props) {
  const [active, setActive] = useState([]);
  const handleClose = () => props.setOpen(false);

  function clickHandler(e) {
    props.setTime(e.target.innerText);

    setActive((clicked) => {
      if (clicked.includes(e.target.innerText)) {
        const filterTime = Array.isArray(clicked)
          ? clicked.filter((val) => val !== e.target.innerText)
          : [];
        return filterTime;
      }
      return e.target.innerText;
    });
  }

  return (
    <Dialog
      PaperProps={{
        sx: {
          background: `linear-gradient(to top, ${Colors.modal100}, #FBFBFB)`,
        },
      }}
      sx={{
        backdropFilter: "blur(2px)",
        bgColor: "rgba(0,0,30,0.4)",
      }}
      maxWidth="sm"
      open={props.open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <DialogTitle>Välj en tid</DialogTitle>

        <Grid
          sx={{ justifyContent: "center" }}
          container
          margin={2}
          width={500}
          spacing={0.5}
        >
          {time.map((times, i) => {
            return (
              <Grid
                key={times}
                item
                xs={2.1}
                md={2.2}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  color={active.includes(times) ? "primary" : "inherit"}
                  variant="contained"
                  onClick={clickHandler}
                >
                  {times}
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" onClick={handleClose}>
          Avbryt
        </Button>
        <Button variant="outlined" onClick={props.handleCalenderOnPress}>
          Nästa
        </Button>
      </DialogActions>
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 1,
          px: 0.5,
          borderRadius: 1,
          color: "#a60a0a",
        }}
      >
        {props.error}
      </Typography>
    </Dialog>
  );
}

export default Times;
