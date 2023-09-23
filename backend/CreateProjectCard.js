// server.js
/*
{
  "login_id": "4NI22MC010"
  "project_id":"001" // Auto Increment
  "project_title": "facebook",
  "project_description": "Facebook is developed by mark",
  "duration": "4 weeks",
  "student_ids": ["Levi", "eren", "mikasa"],
  "teacher_ids": ["rocket", "gamoro", "quill"]
}
*/
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection string (replace with your own database URL)
const uri = 'mongodb://127.0.0.1:27017/dbms123';

// Middleware to parse JSON data
app.use(bodyParser.json());

// POST endpoint to receive data and save it to MongoDB
app.post('/api/projects', async (req, res) => {
  const data = req.body;

  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database
    const database = client.db();

    // Create a collection (if not already exists)
    const collection = database.collection('projects');

    // Insert the data into the collection
    const result = await collection.insertOne(data);
    console.log(`Inserted ${result.insertedCount} document.`);

    res.status(201).json({ message: 'Data successfully posted to MongoDB!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while posting data.' });
  } finally {
    // Close the connection
    client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});