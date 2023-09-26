import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Paper,
  Grid,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import MenuAppBar from './nav_bar';

const REP2 = () => {
  const [projects, setProjects] = useState([]);
  const [textInputs, setTextInputs] = useState([]);
  const [studentAges, setStudentAges] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');
  // const name=localStorage.setItem('username', name);
  const rollno=localStorage.getItem('Rollno');
  let { proid } = useParams();
  console.log(isLoggedIn,username,rollno)

  useEffect(() => {
    getData();
    fetchComments();
  }, []);

  const handlePutData = async (projectId, studentId, weekName, updatedStatus) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/projects/${projectId}/students/${studentId}/weeks/${weekName}/status`, {
        current_status: updatedStatus,
        dod_comment: `Updated status to ${updatedStatus}.`,
      });

      if (response.status === 200) {
        console.log('PUT request successful:', response.data);
      } else {
        console.log('PUT request failed with status code:', response.status);
      }
    } catch (error) {
      console.error('Error making PUT request:', error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects?id=${proid}`);

      if (response.status === 200) {
        const data = response.data;
        setProjects(data);
        
        initializeTextInputs(data.student_ids.length);
        initializeAges(data.student_ids.length);
      } else {
        console.log('The request failed with status code:', response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initializeTextInputs = (length) => {
    const initialTextInputs = Array(length).fill('');
    setTextInputs(initialTextInputs);
  };

  const initializeAges = (studentLength) => {
    const initialStudentAges = Array(studentLength).fill('');
    setStudentAges(initialStudentAges);
  };

  const handleChange = (index, value) => {
    const newStudentAges = [...studentAges];
    newStudentAges[index] = value;
    setStudentAges(newStudentAges);
  };

  const handleSave = async (studentId, weekName, index) => {
    const currentStatus = studentAges[index];

    // Call the handlePutData function to update the status for the student
    await handlePutData(projects._id, studentId, weekName, currentStatus);

    // Do something with the status, e.g., send it to an API or update state
    console.log(`Status for card ${index}:`, currentStatus);
  };

  const studentCards = projects.student_ids
    ? projects.student_ids.map((sid, index) => (
        <Card key={`student-${index}`} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Student ID: {sid}
            </Typography>
            <TextField
              label="DoD" // Change label to the field you want to edit
              variant="outlined"
              fullWidth
              value={textInputs[index]}
              onChange={(e) => setTextInputs((prev) => [...prev.slice(0, index), e.target.value, ...prev.slice(index + 1)])}
            />

            <Box sx={{ minWidth: 150 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={studentAges[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                >
                  <MenuItem value="to_do">To Do</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
                <Button variant="contained" color="primary" onClick={() => handleSave(sid, 'week1', index)}>
                  Save
                </Button>
              </FormControl>
            </Box>
          </CardContent>
        </Card>
      ))
    : [];


    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/projects');
        if (response.status === 200) {
          const data = response.data;
          setComments(data.comments || []);
        } else {
          console.log('The request failed with status code:', response.status);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleCommentChange = (event) => {
      setCommenterName(username);
      setNewComment(event.target.value);
    };
  
    const handlePostComment = async () => {
      if (commenterName && newComment) {
        try {
          const newCommentObj = { name: commenterName, comment: newComment };
          const response = await axios.post(`http://localhost:5000/api/projects/${projects._id}/comments`, newCommentObj);
          
          if (response.status === 200) {
            // Update the comments state with the new comment
            setComments([...comments, newCommentObj]);
            // Clear comment input fields
            setCommenterName('');
            setNewComment('');
          } else {
            console.log('Comment posting failed with status code:', response.status);
          }
        } catch (error) {
          console.error('Error posting comment:', error);
        }
      }
    };


  return (
    <div>
      <MenuAppBar />

      <div>
        <Typography variant="h4" align="center">
          Student Cards
        </Typography>
        <Grid container spacing={5} sx={{ marginLeft: '50px', marginTop: '50px' }} direction="row" justifyContent="center">
          {studentCards}
        </Grid>
      </div>
      <div>
      <h2>Comments</h2>
      {comments.map((comment, index) => (
        <Card key={index}>
          <CardContent>
            <Typography variant="h6">{comment.name}</Typography>
            <Typography>{comment.comment}</Typography>
          </CardContent>
        </Card>
      ))}

      <TextField
        label="Your Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newComment}
        onChange={handleCommentChange}
      />
      <Button variant="contained" color="primary" onClick={handlePostComment}>
        Post Comment
      </Button>
    </div>
    </div>
  );
};

export default REP2;
