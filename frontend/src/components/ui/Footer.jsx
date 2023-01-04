import { Link, Paper } from "@mui/material";
import React from "react";
import Colors from "../../Colors";

function Footer() {
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "30px",
        padding: "10px 10px 0px 10px",
        background: `linear-gradient(to top, ${Colors.header100}, #FBFBFB)`
      }}
    >
      <Link
        sx={{color:"black", textDecoration: "none"}}
        fontSize={13}
        href="https://www.freepik.com/free-vector/hand-drawn-cleaning-service-logo_21250282.htm#query=cleaning%20service%20logo&position=2&from_view=search&track=ais"
      >
        Logo by pikisuperstar
      </Link>
    </Paper>
  );
}

export default Footer;
