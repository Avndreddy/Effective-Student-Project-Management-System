// http://localhost:5000/api/projects?id=64cfd3669dfb420b242a5384
// use get meathod and send perticular id

const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;


const uri = 'mongodb://127.0.0.1:27017/vinz';

app.use(bodyParser.json());
// posting the data into database
app.post('/api/projects', async (req, res) => {
  const data = req.body;

  const client = new MongoClient(uri);

  try {
  
    await client.connect();

    const database = client.db();

    const collection = database.collection('projects');

    const result = await collection.insertOne(data);//inserting data
    console.log(`Inserted ${result.insertedCount} document.`);

    res.status(201).json({ message: 'Data successfully posted to MongoDB!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while posting data.' });
  } finally {

    client.close();
  }
});

// Geting the data from the database
app.get('/api/projects', async (req, res) => {
    //getting the id which is sent from postman get operation link
  const projectId = req.query.id;

 // printing the same console.log('Received projectId:', projectId);

  const client = new MongoClient(uri);

  try {
    await client.connect();
// connect to DB
    const database = client.db();
    const collection = database.collection('projects');
// if ID is sent the search and get the data from the DB
    if (projectId) {
   
      console.log('Finding project with ID:', projectId); 
      const project = await collection.findOne({ _id: new ObjectId(projectId) });
// if server problem in MongoDB 
      if (!project) {
        return res.status(404).json({ message: 'Project not found.' });
      }
// if id is not sent it will send the full data from the DB
      res.status(200).json(project);
    } else {
      
      const projects = await collection.find({}).toArray();
      res.status(200).json(projects);
    }
  } 

  catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while retrieving data.' });
  } 
  finally {
    client.close();
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});