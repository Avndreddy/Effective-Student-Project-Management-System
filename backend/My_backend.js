// Importing Express module.
const express = require('express');
// Importing MongoDB module.
const { MongoClient, ObjectId } = require('mongodb');
// Body Parser.
const bodyParser = require('body-parser');

const cors = require('cors');
// Express Variable/Object.
const app = express();
// Define port variable to run it on a certain port number.
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
// MongoDB Server Path/URL.
const uri = 'mongodb://127.0.0.1:27017/MYDB';
const client = new MongoClient(uri);
// Post Method for Signup Details
app.post('/api/signup', async (req, res) => {
  // Contains all the body contents of requests.
  const userData = req.body;
  // Creating object of MongoClient="Class".
 
  // Try block.
  try {
    // Waits for Connection to DB
    await client.connect();
    // Database
    const database = client.db(); // db() method creates a new Db instance sharing the current socket connections.
    // All the Collections that are available in the projects DB.
    const collection = database.collection('users'); // Assuming 'users' is the collection for user data.
    // Inserting new user data into the DB.
    const result = await collection.insertOne(userData);
    // Just printing the incremented count of the columns.
    console.log(`Inserted ${result.insertedCount} document.`);
    // If the user data is stored into the DB.
    res.status(201).json({ message: 'User registered successfully!' });
  }
  // If any Exception.
  catch (err) // Err Variable/Object
  {
    // Printing the Error to console.
    console.error('Error:', err);
    // Setting the status code to 500 and printing the data.
    res.status(500).json({ message: 'An error occurred while registering the user.' });
  }
  // Finally Block
  finally {
    // Closing / Ending / Destroying the connection to DB
    client.close();
  }
});

// Post Method for Projects details
app.post('/api/projects', async (req, res) => {
  // Contains all the body contents of requests.
  const data = req.body;
  // Creating object of MongoClient="Class".
  const client = new MongoClient(uri);
  // Try block.
  try {
    // Waits for Connection to DB
    await client.connect();
    // Database
    const database = client.db(); // db() method creates a new Db instance sharing the current socket connections.
    // All the Collections that are available in the projects DB.
    const collection = database.collection('projects');
    // Inserting new Data into the DB.
    const result = await collection.insertOne(data);
    // Just printing the incremented count of the columns.
    console.log(`Inserted ${result.insertedCount} document.`);
    
    // Get the _id of the inserted document
    const insertedId = result.insertedId;
    
    // Send the insertedId as part of the response
    res.status(201).json({ message: 'Data successfully posted to MongoDB!', insertedId });
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
  finally {
    // Closing / Ending / Destroying the connection to DB
    client.close();
  }
});



// Get Method to Retrieve User Signup Data by Name
app.get('/api/signup/:name', async (req, res) => {
  // Creating an object of MongoClient="Class".
  const client = new MongoClient(uri);
  // Extract the name parameter from the request URL
  const { name } = req.params;

  // Try block.
  try {
    // Waits for Connection to DB
    await client.connect();
    // Database
    const database = client.db(); // db() method creates a new Db instance sharing the current socket connections.
    // Assuming 'users' is the collection for user signup data.
    const collection = database.collection('users');
    // Find the user by name
    const user = await collection.findOne({ name: name });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while retrieving user signup data.' });
  } finally {
    client.close();
  }
});

// Get Method to get Project Details
app.get('/api/projects', async (req, res) => {
  // From Response get the projectId attribute
  const projectId = req.query.id;
  // Printing the projectId to Console
  console.log('Received projectId:', projectId);
  // Creating object of MongoClient="Class".
  const client = new MongoClient(uri);
  // Try block.
  try {
    // Waits for Connection to DB
    await client.connect();
    // Database
    const database = client.db(); // db() method creates a new Db instance sharing the current socket connections.
    // All the Collections that are available in projects DB.
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


// PUT Method to update a student's week status
app.put('/api/projects/:projectId/students/:studentId/weeks/:weekName/status', async (req, res) => {
  try {
    const { projectId, studentId, weekName } = req.params;
    const { current_status, dod_comment } = req.body;

    // Creating object of MongoClient="Class".
    const client = new MongoClient(uri);

    // Validate the input data here if needed.

    // Try block.
    await client.connect();

    // Database
    const database = client.db(); // db() method creates a new Db instance sharing the current socket connections.
    const collection = database.collection('projects');

    // Find the project by its ID
    const project = await collection.findOne({ _id: new ObjectId(projectId) });

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    // Find the student by their ID in the specified week
    const weekIndex = project.weeks.findIndex((week) => week[weekName]);
    const studentIndex = project.weeks[weekIndex][weekName].status.findIndex(
      (studentStatus) => studentStatus.name === studentId
    );

    if (studentIndex === -1) {
      return res.status(404).json({ message: 'Student not found in the specified week.' });
    }

    // Update the student's week status
    project.weeks[weekIndex][weekName].status[studentIndex] = {
      name: studentId,
      current_status,
      dod_comment,
    };

    // Update the project document with the modified data
    await collection.updateOne({ _id: new ObjectId(projectId) }, { $set: { weeks: project.weeks } });

    res.status(200).json({ message: 'Student week status updated successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred while updating student week status.' });
  } finally {
    
    closeDB();
  }
});


// Patch Senario to send Project Ids to individual IDs.
app.patch('/api/signup/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { insertedId } = req.body;

  // Creating an object of MongoClient="Class".
  const client = new MongoClient(uri);

  try {
    // Waits for Connection to DB
    await client.connect();
    // Database
    const database = client.db();
    const collection = database.collection('users');

    // Find the user by their ID
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    // Debugging: Log the values
    console.log('userId:', userId);
    console.log('user:', user);
    console.log('insertedId:', insertedId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Ensure that the 'projects_registered' field exists
    if (!user.projects_registered) {
      user.projects_registered = [];
    }

    // Append the insertedId to the projects_registered array
    user.projects_registered.push(insertedId);

    // Update the user document with the new projects_registered array
    await collection.updateOne({ _id: new ObjectId(userId) }, { $set: { projects_registered: user.projects_registered } });

    res.status(200).json({ message: 'ID appended to projects_registered' });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while updating projects_registered.' });
  } finally {
    closeDB();
  }
});



// // Connect to the database
// async function connectDB() {
//   try {
//     await client.connect();
//     console.log('Connected to the database');
//   } catch (error) {
//     console.error('Error connecting to the database:', error);
//   }
// }

// Close the database connection
function closeDB() {
  client.close()
    .then(() => console.log('Database connection closed'))
    .catch(err => console.error('Error closing database connection:', err));
}

// POST Method to append a comment to an existing document
app.post('/api/projects/:id/comments', async (req, res) => {
  const commentToAdd = req.body;

  try {
    // Connect to the MongoDB server
    const client = new MongoClient(uri, { useNewUrlParser: true });
    await client.connect();

    // Get a reference to the database and collection
    const database = client.db();
    const collection = database.collection('projects');

    // Find the existing document by its _id
    const objectId = new ObjectId(req.params.id);
    const existingDocument = await collection.findOne({ _id: objectId });

    if (!existingDocument) {
      return res.status(404).send('Document not found');
    }

    // Append the new comment to the comments array
    if (!existingDocument.comments) {
      existingDocument.comments = [];
    }
    existingDocument.comments.push(commentToAdd);

    // Update the document in the collection
    await collection.updateOne({ _id: objectId }, { $set: existingDocument });

    // Close the MongoDB connection
    client.close();

    res.status(200).send('Comment appended successfully');
  } catch (error) {
    console.error('Error appending comment:', error);
    res.status(500).send('Error appending comment');
  }
});

// Get Method to get Comments for a Project
app.get('/api/projects/:id', async (req, res) => {
  // Extract the project ID from the request parameters
  const projectId = req.params.id;
  
  // Creating an object of MongoClient
  const client = new MongoClient(uri);
  
  try {
    // Wait for a connection to the database
    await client.connect();
    
    // Access the database
    const database = client.db();
    
    // Access the projects collection
    const collection = database.collection('projects');
    
    // Find the project with the specified ID
    const project = await collection.findOne({ _id: new ObjectId(projectId) });
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    
    // Extract and return the comments for the project
    const comments = project.comments;
    console.log(comments);
    res.status(200).json(project.comments);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ message: 'An error occurred while retrieving comments.' });
  } finally {
    client.close();
  }
});



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
