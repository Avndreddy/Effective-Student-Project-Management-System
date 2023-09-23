import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuAppBar from './nav_bar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
// Card click operation
import { CardActionArea } from '@mui/material';



import CardActions from '@mui/material/CardActions';


import Container from '@mui/material/Container';
import { Card, CardContent, Typography } from '@mui/material';

const REP = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [count, setCount] = useState(0);
  const [project, setProject]=useState();


  useEffect(() => {
    getData();
    //Added newly
    getData1();
  }, []);

const getData1 = async () => {
    try {
      //selectedProject._id added newly
      const response = await axios.get(`http://localhost:5000/api/projects?id=${selectedProject._id}`);

      if (response.status === 200) {
        const data = response.data;
        setProject(data);
      console.log("DATA",data);
      setCount(data.duration)
      } else {
        console.log('The request failed with status code:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/projects');

      if (response.status === 200) {
        const data = response.data;
        setProjects(data);
      } else {
        console.log('The request failed with status code:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = (project) => {
   setSelectedProject(project);
   // added newly
   getData1(project);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setOpen(false);
  };

  const hendelAccept=()=>
  {
    setSelectedProject(null);
    setOpen(false);
  }

  const cards = Array.from({ length: count }, (_, index) => (
    <Card key={index}>
    {/*Added newly*/}
    <Link to={`/rep/${project._id}`}>
      <CardActionArea>
      <CardContent>
        <Typography variant="h5" component="div">
          Card {index + 1}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Card content goes here.
        </Typography>
      </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  ));

  return (
    <Box>
        <MenuAppBar />
        <h1>Projects</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {projects.map((project) => (
        <div key={project._id} style={{ width: '25%', padding: '10px' }}>
          
          <Stack direction="column">
            {/*<Link to={`/rep/${project._id}`}>*/}
            
            <Button onClick={() => handleClickOpen(project) }>
              {project.project_title}
              
            </Button>
            {/* </Link>
            Uncomment the following to display project description */}
            {/* <p>{project.project_description}</p> */}
          </Stack>
        </div>
      ))} 
    </div>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{border:'solid black', width: '25%', padding: '10px'}}>To_Do 
            {projects.duration}
            <p>Count from API: {count}</p>
            {cards}
            </div>
            <div style={{border:'solid black', width: '25%', padding: '10px'}}>In_progress</div>
            <div style={{border:'solid black', width: '25%', padding: '10px'}}>Done</div>
    </div>
    </Box>
  );
};

export default REP;