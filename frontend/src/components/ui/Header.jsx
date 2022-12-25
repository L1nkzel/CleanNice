import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

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
    <Box sx={{ flexGrow: 1, padding: 2, background: "linear-gradient(to bottom,#6982db, #FBFBFB)",}}>
      <Toolbar sx={{ alignItems: "center", justifyContent: "space-between" }}>
        <Box
          sx={{
            flexGrow: 0.1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Link to={`${props.url1}`} style={{ textDecoration:'none',  }}>
          <Typography sx={{fontFamily: "Poppins",fontSize: 21, color: '#443f3f'}}>{props.link1Name}</Typography> 
          </Link>
          <Link to={`${props.url2}`} style={{ textDecoration:'none',  }}>
         <Typography sx={{fontFamily: "Poppins",fontSize: 21, color: '#443f3f'}}>{props.link2Name}</Typography> 
          </Link>
          <Link to={`${props.url3}`} style={{ textDecoration:'none',  }}>
          <Typography sx={{fontFamily: "Poppins",fontSize: 21, color: '#443f3f'}}>{props.link3Name}</Typography> 
          </Link>
          <Link to={`${props.url4}`} style={{ textDecoration:'none',  }}>
          <Typography sx={{fontFamily: "Poppins", fontSize: 21, color: '#443f3f'}}>{props.link4Name}</Typography> 
          </Link>
          <Link to={`${props.url5}`} style={{ textDecoration:'none',  }}>
          <Typography sx={{fontFamily: "Poppins", fontSize: 21, color: '#443f3f'}}>{props.link5Name}</Typography> 
          </Link>
        </Box>
        <Button onClick={handleLogOut} sx={{ color: "black", boxShadow: 3 }}>
          Logga ut
        </Button>
      </Toolbar>
    </Box>
  );
}
