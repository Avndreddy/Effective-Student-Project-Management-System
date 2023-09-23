// export default CreateProjectCard;
import React, { useState, useEffect } from 'react';
import '../App.css';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import MenuAppBar from './nav_bar';


const CreateProjectCard = () => {
  const [project_title, setProjectTitle] = useState('');
  const [teacher_ids, setTeacherIds] = useState([]);
  const [project_description, setProjectDisc] = useState('');
  const [duration, setDuration] = useState('');
  const [student_ids, setStudentIds] = useState([]);
  const [weekCard, setWeekCard] = useState([]);
  const [statuses, setStatuses] = useState(["to_do", "in_progress", "done"]);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupStatus, setPopupStatus] = useState('');
  
  // Check if the user is logged in based on session information
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');
  const Rollno1 = localStorage.getItem('Rollno');
  const UserIDD = localStorage.getItem('userid');
  const [isUsernameAppended, setIsUsernameAppended] = useState(false);
console.log(UserIDD)
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleStudentIds = (name) => {
    let new_student_ids = name.split(',');
    new_student_ids = new_student_ids;
     // Append username to student_ids if it hasn't been appended yet
     if (!isUsernameAppended && Rollno1) {
      new_student_ids.push(Rollno1);
      setIsUsernameAppended(true);
    }
    setStudentIds(new_student_ids);
  };

  const handleTeachersIds = (name) => {
    const new_teacher_ids = name.split(',');
    setTeacherIds(new_teacher_ids);
  };

  const generateWeekCards = (duration, studentIds, teacherIds) => {  
    const newWeekCards = [];
    for (let i = 1; i <= duration; i++) {
      const weekData = {};
      const statusData = [];

      studentIds.forEach((studentName) => {
        statusData.push({
          name: studentName,
          current_status: "to_do",
          dod_comment: `This is my current Dod for the week ${i}`,
        });
      });

      teacherIds.forEach((teacherName) => {
        statusData.push({
          name: teacherName,
          current_status: "to_do",
          dod_comment: `This is my current Dod for the week ${i}`,
        });
      });

      weekData[`week${i}`] = { status: statusData };
      newWeekCards.push(weekData);
    }
    setWeekCard(newWeekCards);
  };

  useEffect(() => {
    if (duration && student_ids.length > 0 && teacher_ids.length > 0) {
      generateWeekCards(parseInt(duration), student_ids, teacher_ids);
    }
  }, [duration, student_ids, teacher_ids]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const createProjectData = {
      project_title: project_title,
      teacher_ids: teacher_ids,
      project_description: project_description,
      duration: parseInt(duration),
      student_ids: student_ids,
      weeks: weekCard,
      comment: []
    };

    if (!isLoggedIn) {
      // If not logged in, redirect to the login page
      navigate('/');
      return null;
    }

    // Make a POST request to submit the project data
    fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createProjectData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Check if the submission was successful
        if (data.success) {
          // Project submitted successfully

          // Access and use the insertedId from the response here
          const insertedId = data.insertedId;
          console.log('Inserted ID:', insertedId);

          // Make a PATCH request to update the user's projects_registered
          fetch(`http://localhost:5000/api/signup/${UserIDD}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ insertedId }),

          })
            .then((response) => response.json())
            .then((patchData) => {
              console.log('ID appended to projects_registered:', patchData.message);
              // Show the popup with the status message
        
            })
            .catch((error) => {
              console.error('Error appending ID to projects_registered:', error);
            });
   

        } 
        else 
        {
          // Project submission failed
          setPopupStatus('Project Not Submitted!');
          setShowPopup(true);
        }
       
          // Project submission failed
        setPopupStatus('Project Submitted!');
        setShowPopup(true);
        setProjectTitle('');
        setTeacherIds([]);
        setProjectDisc('');
        setDuration('');
        setStudentIds([]);
        setWeekCard([]);

      
       
        console.log('Post response:', data);
      })
      .catch((error) => {
        console.error('Error creating post:', error);
      });
  };

  return (
    <Box>
      <MenuAppBar/>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <form>
          <Stack className="input">
            <TextField
              id="outlined-basic"
              label="Project Title"
              variant="outlined"
              value={project_title}
              onChange={(event) => setProjectTitle(event.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Duration"
              variant="outlined"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Project Description"
              variant="outlined"
              value={project_description}
              onChange={(event) => setProjectDisc(event.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Student IDs"
              variant="outlined"
              value={student_ids.join(',')}
              onChange={(event) => handleStudentIds(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Teacher IDs"
              variant="outlined"
              value={teacher_ids.join(',')}
              onChange={(event) => handleTeachersIds(event.target.value)}
            />
            
            <Button type='Submit' variant="contained" onClick={handleSubmit}>Create Project</Button>
          </Stack>
        </form>
      </Box>
      {weekCard.map((weekData, index) => (
        <div key={index} className="week-card">
          {Object.keys(weekData).map((weekNumber) => (
            <div key={weekNumber}>
              <h3>{weekNumber}</h3>
              {weekData[weekNumber].status.map((statusData, statusIndex) => (
                <div key={statusIndex} className="status-card">
                  <h4>{statusData.name}</h4>
                  <p>Status: {statusData.current_status}</p>
                  <p>Comment: {statusData.dod_comment}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <Modal
        open={showPopup}
        onClose={handleClosePopup}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'white', border: '2px solid #000', p: 4 }}>
          <h2 id="simple-modal-title">Status</h2>
          <p id="simple-modal-description">{popupStatus}</p>
          <button onClick={handleClosePopup}>Close</button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateProjectCard;
