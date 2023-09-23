// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Paper,
//   Grid,
//   Box,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Button,
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import MenuAppBar from './nav_bar';

// const REP2 = () => {
//   const [projects, setProjects] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [textInputs, setTextInputs] = useState([]);
//   const [commentInputValue, setCommentInputValue] = useState('');
//   const [age, setAge] = useState('');
//   const [studentAges, setStudentAges] = useState([]);
//   const [projectComments, setProjectComments] = useState([]);

//   let { proid } = useParams();

//   useEffect(() => {
//     getData();
//   }, []);

//   const handlePutData = async (id, updatedData) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/projects/${id}`, updatedData);

//       if (response.status === 200) {
//         console.log('PUT request successful:', response.data);
//       } else {
//         console.log('PUT request failed with status code:', response.status);
//       }
//     } catch (error) {
//       console.error('Error making PUT request:', error);
//     }
//   };

//   const fetchComments = async (projectId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);

//       if (response.status === 200) {
//         setProjectComments(response.data.comment);
//       } else {
//         console.log('Failed to fetch comments with status code:', response.status);
//       }
//     } catch (error) {
//       console.error('Error fetching comments:', error);
//     }
//   };

//   const getData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/projects?id=${proid}`);

//       if (response.status === 200) {
//         const data = response.data;
//         setProjects(data);
//         initializeTextInputs(data.student_ids.length);
//         initializeAges(data.student_ids.length);

//         fetchComments(data._id);
//       } else {
//         console.log('The request failed with status code:', response.status);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const initializeTextInputs = (length) => {
//     const initialTextInputs = Array(length).fill('');
//     setTextInputs(initialTextInputs);
//   };

//   const initializeAges = (studentLength) => {
//     const initialStudentAges = Array(studentLength).fill('');
//     setStudentAges(initialStudentAges);
//   };

//   const handleChange = (index, value) => {
//     const newStudentAges = [...studentAges];
//     newStudentAges[index] = value;
//     setStudentAges(newStudentAges);
//   };

//   const handleSave = async (index) => {
//     const text = textInputs[index];
//     const currentStatus = studentAges[index];

//     // Create the status object to be added to the database
//     const statusData = {
//       name: text,
//       current_status: currentStatus,
//       dod_comment: `This is my current Dod for the week ${index + 1}`, // You can adjust the week number as needed
//     };

//     // Assuming you want to update the status field of the student
//     const updatedData = { status: statusData };

//     // Send a PUT request to update student data
//     await handlePutData(projects._id, updatedData);

//     // Do something with the text and status, e.g., send it to an API or update state
//     console.log(`Text for card ${index}:`, text);
//     console.log(`Status for card ${index}:`, currentStatus);
//   };

//   const handleAddComment = async () => {
//     if (selectedProject) {
//       if (commentInputValue) {
//         const newComment = { name: 'Your Current User Name', my_comment: commentInputValue };
//         selectedProject.comment = [...selectedProject.comment, newComment];

//         await handlePutData(selectedProject._id, { comment: selectedProject.comment });

//         setSelectedProject({ ...selectedProject });
//         setCommentInputValue('');
//       }
//     }
//   };

//   const studentCards = projects.student_ids
//     ? projects.student_ids.map((sid, index) => (
//         <Card key={`student-${index}`} variant="outlined">
//           <CardContent>
//             <Typography variant="h5" component="div">
//               Student ID: {sid}
//             </Typography>
//             <TextField
//               label="Name" // Change label to the field you want to edit
//               variant="outlined"
//               fullWidth
//               value={textInputs[index]}
//               onChange={(e) => setTextInputs((prev) => [...prev.slice(0, index), e.target.value, ...prev.slice(index + 1)])}
//             />

//             <Box sx={{ minWidth: 150 }}>
//               <FormControl fullWidth>
//                 <InputLabel>Status</InputLabel>
//                 <Select
//                   value={studentAges[index]}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                 >
//                   <MenuItem value="to_do">To Do</MenuItem>
//                   <MenuItem value="in_progress">In Progress</MenuItem>
//                   <MenuItem value="done">Done</MenuItem>
//                 </Select>
//                 <Button variant="contained" color="primary" onClick={() => handleSave(index)}>
//                   Save
//                 </Button>
//               </FormControl>
//             </Box>
//           </CardContent>
//         </Card>
//       ))
//     : [];

//   return (
//     <div>
//       <MenuAppBar />

//       <div>
//         <Typography variant="h4" align="center">
//           Student Cards
//         </Typography>
//         <Grid container spacing={5} sx={{ marginLeft: '50px', marginTop: '50px' }} direction="row" justifyContent="center">
//           {studentCards}
//         </Grid>
//       </div>

//       <div style={{ padding: '10px', maxWidth: '1000px', margin: 'auto' }}>
//         <Paper variant="outlined" square />
//         <Typography variant="h6">Comments</Typography>
//         {projectComments && projectComments.length > 0 ? (
//           projectComments.map((comment, index) => (
//             <Card key={index} style={{ marginBottom: '10px' }}>
//               <CardContent>
//                 <Typography variant="subtitle1">{comment.name}</Typography>
//                 <Typography variant="body1">{comment.my_comment}</Typography>
//               </CardContent>
//             </Card>
//           ))
//         ) : (
//           <Typography variant="body1">No comments yet.</Typography>
//         )}
//         <TextField
//           autoFocus
//           margin="dense"
//           id="comment"
//           label="Add Comment"
//           type="text"
//           fullWidth
//           value={commentInputValue}
//           onChange={(e) => setCommentInputValue(e.target.value)}
//         />
//         <Button variant="contained" color="primary" onClick={handleAddComment}>
//           Add Comment
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default REP2;
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
  const [projectComments, setProjectComments] = useState([]);
  const [commentInputValue, setCommentInputValue] = useState('');

  let { proid } = useParams();

  useEffect(() => {
    getData();
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

  const fetchComments = async (projectId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/projects/${projectId}`);

      if (response.status === 200) {
        setProjectComments(response.data.comment);
      } else {
        console.log('Failed to fetch comments with status code:', response.status);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
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

        fetchComments(data._id);
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

  const handleAddComment = async () => {
    if (commentInputValue) {
      const newComment = { name: 'Your Current User Name', my_comment: commentInputValue };
      projects.comment = [...projects.comment, newComment];

      await handlePutData(projects._id, 'comment', projects.comment);

      setProjects({ ...projects });
      setCommentInputValue('');
    }
  };

  const studentCards = projects.student_ids
    ? projects.student_ids.map((sid, index) => (
        <Card key={`student-${index}`} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              Student ID: {sid}
            </Typography>
            <TextField
              label="Name" // Change label to the field you want to edit
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

      <div style={{ padding: '10px', maxWidth: '1000px', margin: 'auto' }}>
        <Paper variant="outlined" square />
        <Typography variant="h6">Comments</Typography>
        {projectComments && projectComments.length > 0 ? (
          projectComments.map((comment, index) => (
            <Card key={index} style={{ marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="subtitle1">{comment.name}</Typography>
                <Typography variant="body1">{comment.my_comment}</Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography variant="body1">No comments yet.</Typography>
        )}
        <TextField
          autoFocus
          margin="dense"
          id="comment"
          label="Add Comment"
          type="text"
          fullWidth
          value={commentInputValue}
          onChange={(e) => setCommentInputValue(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleAddComment}>
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default REP2;
