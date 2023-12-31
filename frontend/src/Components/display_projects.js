import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuAppBar from './nav_bar';
import { Box, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { alignProperty } from '@mui/material/styles/cssUtils';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const pageTitle = "Project Requests";
  const additionalArgument = localStorage.getItem("notification");
  useEffect(() => {
    getData();
  }, []);
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
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

  return (
    <div>
      <MenuAppBar title={pageTitle} additionalProp={additionalArgument}/>
      <Box  display="flex"  // Use flex display to center align both horizontally and vertically
            flexDirection="column"
            justifyContent="center"
            marginTop="0px"
            minHeight="10vh"
            >
       <h1 style={{ textAlign: "center" }}>Projects</h1>
      {projects.map((project) => (
      <div key={project._id}style={{ display: "flex", justifyContent: "center" }}>
      <List sx={style} component="nav" aria-label="mailbox folders"> 
      
      <Divider />
      <ListItem button divider onClick={() => handleClickOpen(project)}>
        <ListItemText primary={project.project_title} secondary={project.project_description} />
      </ListItem>
      
      <Divider light />

    </List>
      </div>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {selectedProject!=undefined && (
          <>
            <DialogTitle id="alert-dialog-title">
            Project Title:
              {selectedProject.project_title}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Project Id:
                {selectedProject._id}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
                Project Discription:
                {selectedProject.project_description}
              </DialogContentText>
              <DialogContentText id="alert-dialog-description">
              Duration:
                {selectedProject.duration}
              </DialogContentText>
               {/* // displaying contents into dialogue box */}
              
            </DialogContent>
            <DialogActions>
              <Button onClick={hendelAccept}>Accept</Button>
            </DialogActions>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      </Box>
    </div>
  );
};

export default Projects;