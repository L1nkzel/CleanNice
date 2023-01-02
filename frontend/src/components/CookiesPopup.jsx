import { Button, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CookieConsent from "react-cookie-consent";

const CookiesPopup = () => {
  return (
    <Box>
      <CookieConsent
        location="bottom"
        buttonText="Ok, jag förstår!"
        cookieName="StädaFintAb"
        expires={90}
      >
        <Box fontSize={{ xs: 13, sm: 16, md:16 }}>
          Den här sidan använder sig av Cookies.
          {/* <Box

            display={{xs:"none", sm:"inline"}}
            fontSize={16}
            margin={2}
            component={Link}
            underline="none"
            href="Integritetspolicy"
            >
            Mer info
          </Box> */}
   
            </Box>
          {/* <Box
            display={{xs:"flex", sm:"none"}}
            fontSize={13}
            component={Link}
            underline="none"
            href="Integritetspolicy"
          >
            Mer info
          </Box> */}
      </CookieConsent>
    </Box>
  );
};

export default CookiesPopup;
