import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Comment = () => {
  // Sample data for existing comments (you would fetch this from your database)
  const initialComments = [
    { name: 'User1', comment: 'This is the first comment.' },
    { name: 'User2', comment: 'Another comment here.' },
  ];

  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNameChange = (event) => {
    setCommenterName(event.target.value);
  };

  const handlePostComment = () => {
    if (commenterName && newComment) {
      const newCommentObj = { name: commenterName, comment: newComment };
      setComments([...comments, newCommentObj]);
      setCommenterName('');
      setNewComment('');
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
        label="Your Name"
        variant="outlined"
        fullWidth
        value={commenterName}
        onChange={handleNameChange}
      />
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
