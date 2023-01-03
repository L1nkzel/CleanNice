import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider, Typography } from "@mui/material";
import DropdownMenu from "./header/DropdownMenu";
import Colors from "../../Colors";
import logo from "./logo.png";

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0,
      xs: 400,
      sm: 500,
      smm: 810,
      md: 900,
      mm: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default function Header(props) {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
    const res = await fetch(`http://localhost:3500/auth/logout`, {
      credentials: "include",
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          background: `linear-gradient(to bottom, ${Colors.header100}, #FBFBFB)`,
        }}
      >
        <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Box
            sx={{
              flexGrow: 0.1,
              display: { xxs: "none", smm: "flex" },
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Box
              width={{ lg: 120, md: 120, sm: 80 }}
              component="img"
              alt="Logo Städa Fint AB"
              src={logo}
              marginRight={4}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",

              }}
            >
              <Link to={`${props.url1}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{mr:2, fontFamily: "Poppins", fontSize:{lg: 21, mm: 19}, color: "#443f3f" }}
                >
                  {props.link1Name}
                </Typography>
              </Link>
              <Link to={`${props.url2}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{mr:2, fontFamily: "Poppins", fontSize:{lg: 21, mm: 19}, color: "#443f3f" }}
                >
                  {props.link2Name}
                </Typography>
              </Link>
              <Link to={`${props.url3}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{mr:2, fontFamily: "Poppins", fontSize:{lg: 21, mm: 19}, color: "#443f3f" }}
                >
                  {props.link3Name}
                </Typography>
              </Link>
              <Link to={`${props.url4}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{mr:2, fontFamily: "Poppins", fontSize:{lg: 21, mm: 19}, color: "#443f3f" }}
                >
                  {props.link4Name}
                </Typography>
              </Link>
              <Link to={`${props.url5}`} style={{ textDecoration: "none" }}>
                <Typography
                  sx={{ fontFamily: "Poppins", fontSize:{lg: 21, mm: 19}, color: "#443f3f" }}
                >
                  {props.link5Name}
                </Typography>
              </Link>
            </Box>
          </Box>
          <DropdownMenu
            url1={props.url1}
            link1Name={props.link1Name}
            url2={props.url2}
            link2Name={props.link2Name}
            url3={props.url3}
            link3Name={props.link3Name}
            url4={props.url4}
            link4Name={props.link4Name}
            url5={props.url5}
            link5Name={props.link5Name}
          />
          <Button onClick={handleLogOut} sx={{ color: "black", boxShadow: 3 }}>
            Logga ut
          </Button>
        </Toolbar>
      </Box>
    </ThemeProvider>
  );
}
