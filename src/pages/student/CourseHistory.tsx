import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  id: number;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  grade: string;
  percentage: number;
  status: string;
}

const CourseHistory: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]); // State to store course data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching data
  const [error, setError] = useState<string | null>(null); // Error state to handle errors

  useEffect(() => {
    // Fetch course history from the backend
    axios
      .get('http://localhost:5000/courses')
      .then((response) => {
        setCourses(response.data); // Store data in state
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError('Error fetching courses. Please try again later.'); // Handle error
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading course history...</div>; // Show loading message while data is being fetched
  }

  if (error) {
    return <div>{error}</div>; // Show error message if something goes wrong
  }

  return (
    <div>
      <h1>Course History</h1>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>Percentage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.credits}</td>
              <td>{course.grade}</td>
              <td>{course.percentage}</td>
              <td>{course.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseHistory;
