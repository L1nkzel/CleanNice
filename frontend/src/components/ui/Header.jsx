import * as React from "react";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";


export default function Header() {
  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#62926C" }}>
      <Toolbar sx={{ alignItems: "center", justifyContent: "flex-end" }}>
        <Button sx={{ color: "black", boxShadow: 3 }}>Logga ut</Button>
      </Toolbar>
    </Box>
  );
}
