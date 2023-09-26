// LogoutButton.js
import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear session information from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Navigate back to the login page
     navigate('/');
  };

  return (
    <Button color="inherit" onClick={handleLogout}>Logout</Button>
    
  );
}

export default LogoutButton;
