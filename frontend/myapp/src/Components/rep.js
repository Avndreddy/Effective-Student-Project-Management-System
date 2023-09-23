import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { Login } from '@mui/icons-material';
import LogoutButton from './LogoutButton';
import MenuAppBar from './nav_bar';
import { useNavigate } from 'react-router-dom';

const REP = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects_registered,setprojects_registered]=useState([]);
  const [buttonVariant, setButtonVariant] = useState('outlined');

  const navigate = useNavigate();
 // console.log(rollno)
// console.log(username)

  useEffect(() => {
    getData();
  }, []);

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

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');
  
  console.log("werty",isLoggedIn)

  // const name=localStorage.setItem('username', name);
  const rollno=localStorage.getItem('Rollno');

  if (!isLoggedIn) {
    // If not logged in, redirect to the login page
    // navigate('/');
    // return null;
  }
  const handleButtonClick = () => {
    // Toggle the variant between 'outlined' and 'contained' on each click
    setButtonVariant(buttonVariant === 'outlined' ? 'contained' : 'outlined');
  };
  const renderStatusCards = (status) => {
    if (!selectedProject) {
      return null; // No project selected, don't render any cards
    }

    if(selectedProject){
    const statusCards = selectedProject.weeks.map((weekData, index) => {
      const weekKey = Object.keys(weekData)[0];
      const week = weekData[weekKey];

      if (!week.status) {
        return null; // Skip weeks with no status
      }

      // Convert week.status object into an array
      const statusArray = Object.values(week.status);

      // Find the status for 'Arvinnd' within the array
      const arvinndStatus = statusArray.find((s) => s.name === rollno);

      if (arvinndStatus && arvinndStatus.current_status === status) {
        return (
          <Card key={index}>
            <CardContent>
            <Link to={`/rep/${selectedProject._id!=undefined&&selectedProject._id}/${weekKey}}`}>

              <Typography variant="h5" component="div">
                Week {weekKey}
              </Typography>
              </Link>
              <Typography variant="body2" color="text.secondary">
                Status: {arvinndStatus.current_status}
              </Typography>
            </CardContent>
          </Card>
        );
      }

      return null; // Skip weeks with no matching status for 'Arvinnd' or different status
    });

    return statusCards;
  };
  }
  return (
    <Box>
      <MenuAppBar/>

      <div align="center">
        <h1>Projects</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {projects.map((project) => (
            
            <div
              key={project._id}
              style={{ width: '25%', padding: '10px', cursor: 'pointer'}}
              onClick={() => handleProjectClick(project)}
            >
              <Button variant='buttonVariant' onClick={handleButtonClick}>
              {project.project_title}
              </Button>
            </div>
            
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap' }} align="center">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h2>To Do</h2>
                {renderStatusCards('to_do')}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h2>In Progress</h2>
                {renderStatusCards('in_progress')}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h2>Done</h2>
                {renderStatusCards('done')}
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
};

export default REP;