import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Header() {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.removeItem("userData");
    navigate("/login");
    const res = await fetch(`http://localhost:3500/logout`, {
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
          <Link to="/customer" sx={{ fontSize: 20 }}>
            Min sida
          </Link>
          <Link to="/customer/services" sx={{ fontSize: 20 }}>
            Tjänster
          </Link>
          <Link to="/customer/support" sx={{ fontSize: 20 }}>
            Support
          </Link>
        </Box>
        <Button onClick={handleLogOut} sx={{ color: "black", boxShadow: 3 }}>
          Logga ut
        </Button>
      </Toolbar>
    </Box>
  );
}
