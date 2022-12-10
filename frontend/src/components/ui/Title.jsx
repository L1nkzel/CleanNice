import { Typography } from "@mui/material";
import React from "react";

function Title({children, color}) {
  return (
    <Typography
      sx={{
        textAlign: "center",
        mt:2,
        mb: 2,
        color: color,
        fontSize: 22,
      }}
    >
      {children}
    </Typography>
  );
}

export default Title;
