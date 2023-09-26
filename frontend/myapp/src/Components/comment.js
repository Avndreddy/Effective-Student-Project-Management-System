// import React, { useState,useEffect,axios } from 'react';
// import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

// const Comment = () => {
//   // Sample data for existing comments (you would fetch this from your database)
//   const initialComments = [
//     { name: 'User1', comment: 'This is the first comment.' },
//     { name: 'User2', comment: 'Another comment here.' },
//   ];

//   const [comments, setComments] = useState();
//   const [newComment, setNewComment] = useState('');
//   const [commenterName, setCommenterName] = useState('');


//   useEffect(() => {
//     getData();
//   }, []);

//   const getData = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/projects'); 
//       if (response.status === 200) {
//         const data = response.data;
//         setComments(data.comment);
//       } else {
//         console.log('The request failed with status code:', response.status);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleCommentChange = (event) => {
//     setCommenterName("testing");
//     setNewComment(event.target.value);
//   };


//   const handlePostComment = () => {
//     if (commenterName && newComment) {
//       const newCommentObj = { name: commenterName, comment: newComment };
//       setComments([...comments, newCommentObj]);
//       setCommenterName('');
//       setNewComment('');
//     }
//   };

//   return (
//     <div>
//       <h2>Comments</h2>
//       {comments.map((comment, index) => (
//         <Card key={index}>
//           <CardContent>
//             <Typography variant="h6">{comment.name}</Typography>
//             <Typography>{comment.comment}</Typography>
//           </CardContent>
//         </Card>
//       ))}
 
//       <TextField
//         label="Your Comment"
//         variant="outlined"
//         fullWidth
//         multiline
//         rows={4}
//         value={newComment}
//         onChange={handleCommentChange}
//       />
//       <Button variant="contained" color="primary" onClick={handlePostComment}>
//         Post Comment
//       </Button>
//     </div>
//   );
// };

// export default Comment;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  useEffect(() => {
    // Fetch comments when the component mounts
    fetchComments();
  }, []);

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
    setCommenterName("testing");
    setNewComment(event.target.value);
  };

  const handlePostComment = async () => {
    if (commenterName && newComment) {
      try {
        const newCommentObj = { name: commenterName, comment: newComment };
        const response = await axios.post('http://localhost:5000/api/projects/650cbd8945475475b7d1771a/comments', newCommentObj);
        
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
  );
};

export default Comment;
