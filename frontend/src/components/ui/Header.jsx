import * as React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Rowing } from "@mui/icons-material";


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#62926C" }}>
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{flexGrow: 0.1,display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
        <Typography>Min sida</Typography>
        <Typography>Min sida</Typography>
        <Typography>Min sida</Typography>

        </Box>
        <Button sx={{ color: "black", boxShadow: 3 }}>Logga ut</Button>
      </Toolbar>
    </Box>
  );
}
