import React from 'react';
import Card from '../../components/ui/Card';
import { BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';

const StudentDashboard: React.FC = () => {
  // Mock data for demonstration
  const stats = [
    { label: 'Current GPA', value: '3.8', icon: <TrendingUp size={24} />, color: 'primary', path: '/student/performance' },
    { label: 'Enrolled Courses', value: 5, icon: <BookOpen size={24} />, color: 'secondary', path: '/student/courses' },
    { label: 'Completed Credits', value: 72, icon: <Award size={24} />, color: 'accent', path: '/student/courses' },
    { label: 'Upcoming Tests', value: 3, icon: <Calendar size={24} />, color: 'warning', path: '#' },
  ];

  // Mock courses
  const currentCourses = [
    { code: 'CSE-301', name: 'Database Systems', instructor: 'Dr. Robert Johnson', grade: 'A-', progress: 75 },
    { code: 'CSE-305', name: 'Software Engineering', instructor: 'Prof. Maria Garcia', grade: 'B+', progress: 60 },
    { code: 'MATH-201', name: 'Calculus III', instructor: 'Dr. Emily Chen', grade: 'A', progress: 85 },
    { code: 'ENG-104', name: 'Technical Writing', instructor: 'Prof. David Wilson', grade: 'B', progress: 70 },
    { code: 'PHY-202', name: 'Modern Physics', instructor: 'Dr. Sarah Ahmed', grade: 'A-', progress: 80 },
  ];

  // Mock announcements
  const announcements = [
    { title: 'Database Project Deadline Extended', course: 'CSE-301', date: '2 days ago' },
    { title: 'Midterm Exam Schedule Published', course: 'General', date: '3 days ago' },
    { title: 'Guest Lecture: AI in Modern Software', course: 'CSE-305', date: '5 days ago' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Student Dashboard</h1>
        <p className="text-gray-500">Welcome to your student dashboard</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Current Courses</h2>
              <Link to="/student/courses" className="text-sm text-primary-600 hover:text-primary-700">
                View All
              </Link>
            </div>
            <div className="space-y-5 stagger-list">
              {currentCourses.map((course, index) => (
                <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-md">
                        {course.code}
                      </span>
                      <h3 className="font-medium text-gray-900 mt-2">{course.name}</h3>
                      <p className="text-sm text-gray-500">{course.instructor}</p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">
                      {course.grade}
                    </span>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between items-center text-sm mb-1">
                      <span className="text-gray-600">Course Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary-600 h-2.5 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Announcements & Quick Links */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-semibold mb-4">Announcements</h2>
            <div className="space-y-4 stagger-list">
              {announcements.map((announcement, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0">
                  <h3 className="font-medium text-gray-900">{announcement.title}</h3>
                  <div className="flex justify-between items-center mt-1 text-sm">
                    <span className="text-primary-600 font-medium">{announcement.course}</span>
                    <span className="text-gray-500">{announcement.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline" size="sm">
              View All Announcements
            </Button>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <div className="space-y-3 stagger-list">
              <Link to="/student/grades" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="p-2 mr-3 bg-primary-100 rounded-full text-primary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <span className="font-medium">View Grade Report</span>
              </Link>
              <Link to="/student/performance" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="p-2 mr-3 bg-secondary-100 rounded-full text-secondary-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
                </div>
                <span className="font-medium">Performance Analytics</span>
              </Link>
              <Link to="/student/courses" className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="p-2 mr-3 bg-accent-100 rounded-full text-accent-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                </div>
                <span className="font-medium">Course Catalog</span>
              </Link>
              <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <div className="p-2 mr-3 bg-warning-100 rounded-full text-warning-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                </div>
                <span className="font-medium">Academic Calendar</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;