import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Header(props) {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.removeItem("userData");
    navigate("/");
    const res = await fetch(`http://localhost:3500/logout`, {
      credentials: 'include',
      method: "POST",
    });
    const result = await res.json();
    console.log(result);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: "#62926C" }}>
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box
          sx={{
            flexGrow: 0.1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Link to={`${props.url1}`} sx={{ fontSize: 20 }}>
            {props.link1Name}
          </Link>
          <Link to={`${props.url2}`} sx={{ fontSize: 20 }}>
          {props.link2Name}
          </Link>
          <Link to={`${props.url3}`} sx={{ fontSize: 20 }}>
          {props.link3Name}
          </Link>
          <Link to={`${props.url4}`} sx={{ fontSize: 20 }}>
          {props.link4Name}
          </Link>
        </Box>
        <Button onClick={handleLogOut} sx={{ color: "black", boxShadow: 3 }}>
          Logga ut
        </Button>
      </Toolbar>
    </Box>
  );
}
