const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  instructor: String,
  credits: Number,
  grade: String,
  percentage: Number,
  status: String,
});

const Course = mongoose.model('Course', courseSchema);

// Optional: Automatically seed mock data if collection is empty
async function seedMockCourses() {
  const count = await Course.countDocuments();
  if (count === 0) {
    const mockCourses = [
      {
        code: 'CS101',
        name: 'Introduction to Computer Science',
        instructor: 'Dr. Alice Smith',
        credits: 3,
        grade: 'A',
        percentage: 92,
        status: 'Completed',
      },
      {
        code: 'MA202',
        name: 'Calculus II',
        instructor: 'Dr. Bob Johnson',
        credits: 4,
        grade: 'B+',
        percentage: 87,
        status: 'Completed',
      },
      {
        code: 'PH301',
        name: 'Modern Physics',
        instructor: 'Dr. Clara Zhang',
        credits: 3,
        grade: 'A-',
        percentage: 89,
        status: 'Ongoing',
      },
      {
        code: 'EN105',
        name: 'Academic Writing',
        instructor: 'Dr. Dan Brown',
        credits: 2,
        grade: 'B',
        percentage: 81,
        status: 'Completed',
      },
    ];

    await Course.insertMany(mockCourses);
    console.log('📚 Mock course data seeded.');
  }
}

// Automatically run mock seeding when this file is imported
seedMockCourses().catch(console.error);

module.exports = Course;
