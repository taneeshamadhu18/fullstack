const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Route: Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all documents
    res.json(courses);
  } catch (err) {
    res.status(500).send('Error fetching courses');
  }
});

// Route: Add a new course
router.post('/', async (req, res) => {
  const { code, name, instructor, credits, grade, percentage, status } = req.body;
  try {
    const newCourse = new Course({
      code,
      name,
      instructor,
      credits,
      grade,
      percentage,
      status,
    });
    await newCourse.save(); // Insert into DB
    res.status(201).json({ message: 'Course added successfully' });
  } catch (err) {
    res.status(500).send('Error adding course');
  }
});

module.exports = router;
