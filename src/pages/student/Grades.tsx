import React from 'react';
import Card from '../../components/ui/Card';
import { BookOpen, Award } from 'lucide-react';

const Grades: React.FC = () => {
  // Mock data for demonstration
  const courses = [
    {
      code: 'CSE-301',
      name: 'Database Systems',
      instructor: 'Dr. Robert Johnson',
      credits: 3,
      grade: 'A-',
      percentage: 92,
      status: 'completed'
    },
    {
      code: 'CSE-305',
      name: 'Software Engineering',
      instructor: 'Prof. Maria Garcia',
      credits: 4,
      grade: 'B+',
      percentage: 87,
      status: 'in-progress'
    },
    {
      code: 'MATH-201',
      name: 'Calculus III',
      instructor: 'Dr. Emily Chen',
      credits: 3,
      grade: 'A',
      percentage: 95,
      status: 'completed'
    },
    {
      code: 'ENG-104',
      name: 'Technical Writing',
      instructor: 'Prof. David Wilson',
      credits: 2,
      grade: 'B',
      percentage: 84,
      status: 'in-progress'
    },
    {
      code: 'PHY-202',
      name: 'Modern Physics',
      instructor: 'Dr. Sarah Ahmed',
      credits: 4,
      grade: 'A-',
      percentage: 91,
      status: 'in-progress'
    }
  ];

  const semesterStats = {
    gpa: 3.8,
    totalCredits: 16,
    completedCredits: 6,
    inProgress: 10
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Grade Report</h1>
        <p className="text-gray-500">View your academic performance and grades</p>
      </div>

      {/* Semester Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex items-center justify-between" accent="primary">
          <div>
            <p className="text-gray-500 text-sm font-medium">Current GPA</p>
            <p className="text-3xl font-bold mt-1">{semesterStats.gpa}</p>
          </div>
          <div className="p-3 rounded-full bg-primary-100 text-primary-600">
            <Award size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between" accent="secondary">
          <div>
            <p className="text-gray-500 text-sm font-medium">Total Credits</p>
            <p className="text-3xl font-bold mt-1">{semesterStats.totalCredits}</p>
          </div>
          <div className="p-3 rounded-full bg-secondary-100 text-secondary-600">
            <BookOpen size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between" accent="success">
          <div>
            <p className="text-gray-500 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold mt-1">{semesterStats.completedCredits}</p>
          </div>
          <div className="p-3 rounded-full bg-success-100 text-success-600">
            <Award size={24} />
          </div>
        </Card>
        <Card className="flex items-center justify-between" accent="warning">
          <div>
            <p className="text-gray-500 text-sm font-medium">In Progress</p>
            <p className="text-3xl font-bold mt-1">{semesterStats.inProgress}</p>
          </div>
          <div className="p-3 rounded-full bg-warning-100 text-warning-600">
            <BookOpen size={24} />
          </div>
        </Card>
      </div>

      {/* Course Grades */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Course Grades</h2>
          <select className="rounded-md border-gray-300 text-sm focus:border-primary-500 focus:ring-primary-500">
            <option>Current Semester</option>
            <option>Previous Semester</option>
            <option>All Courses</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-500">{course.code}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.instructor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">
                      {course.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900 mr-2">{course.percentage}%</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${course.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        course.status === 'completed'
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}
                    >
                      {course.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Grades;