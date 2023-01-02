import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';


export default function DropdownMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
   
      <Box sx={{display:{xxs:'flex', smm:'none'}}}>

      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{color:'black'}}
      >
        <MenuIcon sx={{fontSize:30}}/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        >
        <MenuItem component={Link} to={`${props.url1}`} onClick={handleClose}>{props.link1Name}</MenuItem>
        <MenuItem component={Link} to={`${props.url2}`} onClick={handleClose}>{props.link2Name}</MenuItem>
        <MenuItem component={Link} to={`${props.url3}`} onClick={handleClose}>{props.link3Name}</MenuItem>
        <MenuItem component={Link} to={`${props.url4}`} onClick={handleClose}>{props.link4Name}</MenuItem>
        <MenuItem component={Link} to={`${props.url5}`} onClick={handleClose}>{props.link5Name}</MenuItem>
      </Menu>
    </Box>

  );
}