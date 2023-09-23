// Importing Express  module.
const express = require('express');
// Importing MongoDB module.
const { MongoClient, ObjectId } = require('mongodb');
// Body Parcer.
const bodyParser = require('body-parser');

const cors = require('cors');
// Express Variable/Object.
const app = express();
// Define port variable to run it on a certain port number.
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
// MongoDB Server Path/URL.
const uri = 'mongodb://127.0.0.1:27017/vinz';



// Post Meathod
app.post('/api/projects', async (req, res) => {

// Contains all the body contents of requests.
  const data = req.body;
// Creating object of MongoClient="Class".
  const client = new MongoClient(uri);
// Try block.
  try {
    // Waites for Connection to DB
    await client.connect();
    // Database 
    const database = client.db(); // db() meathod Create a new Db instance sharing the current socket connections.
    // All the Collections taht are available in projects DB.
    const collection = database.collection('projects');
    // Inserting new Data into the DB.
    const result = await collection.insertOne(data);
    // Just printing the incremented count of the columns.
    console.log(`Inserted ${result.insertedCount} document.`);
    // if the data is stored into the DB.
    res.status(201).json({ message: 'Data successfully posted to MongoDB!' });

  } 
  // If any Exception.
  catch (err) // Err Variable/Object
  {
    // Printing the Error to console.
    console.error('Error:', err);
    // Setting the status code to 500 and printing the data.
    res.status(500).json({ message: 'An error occurred while posting data.' });
  } 
  // Finally Block
  finally 
  {
    // Closing / Ending / Destroying the connection to DB
    client.close();
  }
});


// Get Meathod.
app.get('/api/projects', async (req, res) => {
  // From Responce get the projectid attributes
  const projectId = req.query.id;
// Printing the projectID to Console
  console.log('Received projectId:', projectId);
// Creating object of MongoClient="Class".
  const client = new MongoClient(uri);
// Try block.
  try {
    // Waites for Connection to DB
    await client.connect();
    // Database
    const database = client.db(); // db() meathod Create a new Db instance sharing the current socket connections.
    // All the Collections taht are available in projects DB.
    const collection = database.collection('projects');
    
    if (projectId) {
      console.log('Finding project with ID:', projectId);
      const project = await collection.findOne({ _id: new ObjectId(projectId) });

      if (!project) {
        return res.status(404).json({ message: 'Project not found.' });
      }

      res.status(200).json(project);
    } else {
      const projects = await collection.find({}).toArray();
      res.status(200).json(projects);
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while retrieving data.' });
  } finally {
    client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});