const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb://127.0.0.1:27017/vinz';

// POST Method
app.post('/api/projects', async (req, res) => {
  const data = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('projects');
    const result = await collection.insertOne(data);
    console.log(`Inserted ${result.insertedCount} document.`);
    res.status(201).json({ message: 'Data successfully posted to MongoDB!' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while posting data.' });
  } finally {
    client.close();
  }
});

// GET Method
app.get('/api/projects', async (req, res) => {
  const projectId = req.query.id;
  console.log('Received projectId:', projectId);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
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

// PUT Method to Update a Project by ID
app.put('/api/projects/:id/:week', async (req, res) => {
  const projectId = req.params.id;
  const week = req.params.week;
  const updatedData = req.body;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const collection = database.collection('projects');

    // Find the project by ID and week
    const result = await collection.updateOne(
      { _id: new ObjectId(projectId) },
      { $set: { [`weeks.${week}`]: updatedData } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    res.status(200).json({ message: 'Project updated successfully.' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while updating data.' });
  } finally {
    client.close();
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
