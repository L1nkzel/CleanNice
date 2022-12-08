import { Button } from "@mui/material";
import React from "react";

function CustomButton({children, onClick}) {
  return (
    
    <Button
      onClick={onClick}
      size="large"
      type="submit"
      variant="contained"
      sx={{
        width: 250,
        fontSize: { xs: 13, sm: 14, md: 15 },
        color: "black",
        boxShadow: 2,
        background: "linear-gradient(#216600, #FBFBFB)",
      }}
    >
      {children}
    </Button>
  );
}

export default CustomButton;
