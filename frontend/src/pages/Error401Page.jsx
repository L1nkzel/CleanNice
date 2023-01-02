import { Box, Typography } from "@mui/material";

import { Link, useLocation } from "react-router-dom";

const Error401Page = () => {
  const loc = useLocation();

  return (
    <div className="Error401-background">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography sx={{ p: 1, mb: 2, fontSize: 18 }}>
          Du har inte tillräckligt med behörighet för att komma åt den här
          sidan.
        </Typography>
        <Box
          sx={{
            mb: 4,
            borderRadius: 2,
            py: 1,
            px: 2,
            background: "linear-gradient(to left top,#66BB6A, #cfcfcf)",
          }}
        >
          <Link
            to={loc?.state?.url}
            style={{ fontSize: 20, textDecoration: "none", color: "black" }}
          >
            {" "}
            Tillbaka till hem
          </Link>
        </Box>
      </Box>
    </div>
  );
};

export default Error401Page;
