import { Typography } from "@mui/material";
import React from "react";

function Title({children}) {
  return (
    <Typography
      sx={{
        textAlign: "center",
        mb: 5,
        color: "white",
        fontSize: 22,
      }}
    >
      {children}
    </Typography>
  );
}

export default Title;
