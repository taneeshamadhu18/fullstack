const express = require('express');
const { Client } = require('pg'); // Import pg package
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const client = new Client({
  user: 'yourusername', // replace with your username
  host: 'localhost',
  database: 'grades',
  password: 'yourpassword', // replace with your password
  port: 5432,
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Define routes
app.get('/courses', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Error fetching courses');
  }
});

// Add new course
app.post('/courses', async (req, res) => {
  const { code, name, instructor, credits, grade, percentage, status } = req.body;
  try {
    await client.query(
      'INSERT INTO courses (code, name, instructor, credits, grade, percentage, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [code, name, instructor, credits, grade, percentage, status]
    );
    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    res.status(500).send('Error adding course');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
