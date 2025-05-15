import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BookOpenCheck, Menu, X, LogOut, User, BarChart3, Users, BookOpen, GraduationCap as Graduation, ClipboardList } from 'lucide-react';
import Button from '../components/ui/Button';

const DashboardLayout: React.FC = () => {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  // Navigation items based on user role
  const navigationItems = {
    admin: [
      { name: 'Dashboard', path: '/admin', icon: <BarChart3 size={20} /> },
      { name: 'Students', path: '/admin/students', icon: <Users size={20} /> },
      { name: 'Faculty', path: '/admin/faculty', icon: <Graduation size={20} /> },
      { name: 'Courses', path: '/admin/courses', icon: <BookOpen size={20} /> },
    ],
    faculty: [
      { name: 'Dashboard', path: '/faculty', icon: <BarChart3 size={20} /> },
      { name: 'Grade Entry', path: '/faculty/grades', icon: <ClipboardList size={20} /> },
      { name: 'Student Performance', path: '/faculty/performance', icon: <BarChart3 size={20} /> },
    ],
    student: [
      { name: 'Dashboard', path: '/student', icon: <BarChart3 size={20} /> },
      { name: 'Courses', path: '/student/courses', icon: <BookOpen size={20} /> },
      { name: 'Grades', path: '/student/grades', icon: <ClipboardList size={20} /> },
      { name: 'Performance', path: '/student/performance', icon: <BarChart3 size={20} /> },
      { name: 'Course History', path: '/student/course-history', icon: <BookOpenCheck size={20} /> },
    ],
  };

  // Get navigation items based on user role
  const navItems = user ? navigationItems[user.role] : [];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/" className="flex items-center">
              <BookOpenCheck size={32} className="text-primary-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">GRADEX</span>
            </Link>
          </div>
          
          {/* User profile dropdown */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">{user?.displayName}</span>
              <span className="text-xs text-gray-500 capitalize">{user?.role}</span>
            </div>
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<LogOut size={16} />}
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for navigation */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 md:transform-none overflow-y-auto`}
        >
          <nav className="py-6 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;