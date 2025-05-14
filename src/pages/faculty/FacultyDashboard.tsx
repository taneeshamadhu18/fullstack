import React from 'react';
import Card from '../../components/ui/Card';
import { Users, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacultyDashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    { label: 'Assigned Students', value: 125, icon: <Users size={24} />, color: 'primary', path: '/faculty/performance' },
    { label: 'Active Courses', value: 4, icon: <BookOpen size={24} />, color: 'secondary', path: '/faculty/grades' },
    { label: 'Completed Gradings', value: 52, icon: <CheckCircle size={24} />, color: 'success', path: '/faculty/grades' },
    { label: 'Pending Actions', value: 8, icon: <Clock size={24} />, color: 'warning', path: '/faculty/grades' },
  ];

  // Mock course assignments
  const assignedCourses = [
    { 
      code: 'CSE-101', 
      name: 'Introduction to Computer Science', 
      students: 32, 
      nextClass: 'Tuesday, 10:00 AM',
      gradeStatus: 'Due in 5 days'
    },
    { 
      code: 'CSE-203', 
      name: 'Data Structures and Algorithms', 
      students: 28, 
      nextClass: 'Wednesday, 2:00 PM',
      gradeStatus: 'Complete'
    },
    { 
      code: 'CSE-305', 
      name: 'Database Systems', 
      students: 35, 
      nextClass: 'Thursday, 11:30 AM',
      gradeStatus: 'In Progress'
    },
    { 
      code: 'CSE-401', 
      name: 'Software Engineering', 
      students: 30, 
      nextClass: 'Friday, 9:00 AM',
      gradeStatus: 'Not Started'
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Faculty Dashboard</h1>
        <p className="text-gray-500">Welcome to your faculty dashboard</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link to={stat.path} key={index} className="block">
            <Card className="flex items-center justify-between transition-all hover:translate-y-[-2px]" accent={stat.color as any}>
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${stat.color}-100 text-${stat.color}-600`}>
                {stat.icon}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Assigned courses */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Assigned Courses</h2>
          <Link to="/faculty/grades" className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-list">
          {assignedCourses.map((course, index) => (
            <Card key={index} className="transition-all hover:shadow-md hover:translate-y-[-2px]">
              <div className="flex justify-between items-start">
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-md">
                  {course.code}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-md ${
                  course.gradeStatus === 'Complete' 
                    ? 'bg-success-100 text-success-800' 
                    : course.gradeStatus === 'In Progress'
                    ? 'bg-warning-100 text-warning-800'
                    : course.gradeStatus === 'Not Started'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-error-100 text-error-800'
                }`}>
                  {course.gradeStatus}
                </span>
              </div>
              <h3 className="text-lg font-medium mt-4 mb-2">{course.name}</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users size={16} className="mr-2" />
                  <span>{course.students} Students</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{course.nextClass}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Link to="/faculty/grades" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                  Manage Grades →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent grading activity */}
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Grading Activity</h2>
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { student: 'Alex Johnson', course: 'CSE-101', assignment: 'Midterm Exam', grade: 'A', date: '2 days ago' },
                { student: 'Maria Garcia', course: 'CSE-203', assignment: 'Project Submission', grade: 'B+', date: '3 days ago' },
                { student: 'James Wilson', course: 'CSE-305', assignment: 'Quiz 3', grade: 'A-', date: '5 days ago' },
                { student: 'Emma Brown', course: 'CSE-401', assignment: 'Final Project', grade: 'A+', date: '1 week ago' },
                { student: 'Noah Martinez', course: 'CSE-101', assignment: 'Lab Assignment 4', grade: 'B', date: '1 week ago' },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.assignment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">
                      {item.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.date}
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

export default FacultyDashboard;