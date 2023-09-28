import React from "react";
import '../App.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import LogoutButton from './LogoutButton';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function MenuAppBar(props) {
  const { title, additionalProp } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate=useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
   
      <AppBar position="static">
        <Toolbar>
        
        <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>navigate('/rep')}>Home Dashbaord</MenuItem>
        <MenuItem onClick={()=>navigate('/createcard')}>Create Project Cards</MenuItem>
      </Menu>


          {/*Title of the page*/}
          <Typography variant="h6" className='page_Title' component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {/*Notification Icon*/}
         
          <Badge badgeContent={additionalProp} variant="contained" color="primary">
          <NotificationsIcon onClick={()=> navigate('/request')} />
          
          </Badge>
          {/*Account Icon*/}
              {/* <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true">

                <AccountCircle />

              </IconButton> */}
               {/* LogoutButton */}
              <MenuItem><LogoutButton/></MenuItem>
              
        </Toolbar>
      </AppBar>
    </Box>
  );
}