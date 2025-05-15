import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Loader, BookOpen } from 'lucide-react';

interface Course {
  _id: string;
  code: string;
  name: string;
  instructor: string;
  credits: number;
  grade: string;
  percentage: number;
  status: string;
}

const mockCourses: Course[] = [
  {
    _id: '1',
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: 'Dr. Alice Smith',
    credits: 3,
    grade: 'A',
    percentage: 91,
    status: 'Passed',
  },
  {
    _id: '2',
    code: 'MA102',
    name: 'Calculus I',
    instructor: 'Dr. John Doe',
    credits: 4,
    grade: 'B+',
    percentage: 82,
    status: 'Passed',
  },
  {
    _id: '3',
    code: 'PHY201',
    name: 'Physics',
    instructor: 'Dr. Lisa Ray',
    credits: 4,
    grade: 'F',
    percentage: 45,
    status: 'Failed',
  },
];

const CourseHistory: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center text-gray-600 text-lg mt-10">
        <Loader className="animate-spin mr-2" /> Loading course history...
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <BookOpen className="mr-2 text-blue-600" /> Course History
      </h1>
      <table className="w-full text-sm text-left border-collapse border border-gray-200 shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border">Code</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Instructor</th>
            <th className="p-3 border">Credits</th>
            <th className="p-3 border">Grade</th>
            <th className="p-3 border">Percentage</th>
            <th className="p-3 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="hover:bg-gray-50">
              <td className="p-3 border">{course.code}</td>
              <td className="p-3 border">{course.name}</td>
              <td className="p-3 border">{course.instructor}</td>
              <td className="p-3 border">{course.credits}</td>
              <td className="p-3 border">{course.grade}</td>
              <td className="p-3 border">{course.percentage}%</td>
              <td className="p-3 border flex items-center gap-2">
                {course.status === 'Passed' ? (
                  <>
                    <CheckCircle className="text-green-600" size={18} />
                    <span className="text-green-700">Passed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-600" size={18} />
                    <span className="text-red-700">Failed</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseHistory;
