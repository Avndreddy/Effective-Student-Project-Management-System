import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from '@mui/material/Button';
import MenuAppBar from './nav_bar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function OutlinedCard() {
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const card = (
  <React.Fragment variant="outlined">
    <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
        Student Name
      </Typography>
      USN
    </CardContent>
    <CardActions>
      <Button variant="contained" size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);


  return (
    <Box>
    <MenuAppBar />
    <Container fixed variant="outlined" >
      <div class='card'>sgerbgerbrberbt</div>
    <Box sx={{ minWidth: 275}} className="box">
     <Card variant="outlined" >{card}</Card><Card variant="outlined">{card}</Card><Card variant="outlined">{card}</Card>
    </Box>
    </Container>
    </Box>
  );
}
