import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Stack, TextField,Box,AppBar,Toolbar,Typography } from '@mui/material';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [srn, setSRN] = useState('');
  //const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = {
        name: name,
        srn: srn,
        password: password
      };
console.log(typeof(data))
      const response = await axios.post('http://localhost:5000/api/signup', data);

      if (response.status === 201) {
        console.log('Signup successful');
        // Redirect to login page after successful signup
        navigate('/');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }

  
  };

  return (
    <div>
      
      <AppBar>
      <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1,textAlign:'center' }}>
      Effective Project Management System
      </Typography>
      <Button type="button" color="inherit" onClick={()=> navigate('/')}>Login</Button>
    </Toolbar>
    </AppBar>


      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack>
          <h2 align="center">Signup</h2>
      <TextField
        type="text"
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <TextField
        type="text"
        placeholder="SRN"
        value={srn}
        onChange={e => setSRN(e.target.value)}
        required
      />
      <TextField
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" onClick={handleSignup}>Signup</Button>
      </Stack>
      </form>
      </Box>
    </div>
  );
};

export default SignupForm;
