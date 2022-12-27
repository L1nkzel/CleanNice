import { Typography } from "@mui/material";
import React from "react";

function Title({children, color}) {
  return (
    <Typography
      sx={{
        textAlign: "center",
        mt:2,
        mb: 4,
        color: color,
        fontSize: 21,
        fontFamily: "Poppins"
      }}
    >
      {children}
    </Typography>
  );
}

export default Title;
