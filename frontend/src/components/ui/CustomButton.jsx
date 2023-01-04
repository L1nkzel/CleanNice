import { Button } from "@mui/material";
import React from "react";

function CustomButton({children, onClick}) {
  return (
    
    <Button
      onClick={onClick}
      size="large"
      type="submit"
      variant="contained"
      sx={
       buttonStyle
      }
    >
      {children}
    </Button>
  );
}

export default CustomButton;

const buttonStyle = {
  width: {xs:150, md:200},
  fontSize: { xs: 13, sm: 14, md: 15 },
  color: "black",
  
  boxShadow: 2,
  background: "linear-gradient(to left top,#CEFFDC, #cfcfcf)",
}
