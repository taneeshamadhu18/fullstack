import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageStudents from './pages/admin/ManageStudents';
import ManageFaculty from './pages/admin/ManageFaculty';
import ManageCourses from './pages/admin/ManageCourses';

import FacultyDashboard from './pages/faculty/FacultyDashboard';
import GradeEntry from './pages/faculty/GradeEntry';
import StudentPerformance from './pages/faculty/StudentPerformance';

import StudentDashboard from './pages/student/StudentDashboard';
import Grades from './pages/student/Grades';
import Performance from './pages/student/Performance';
//import CourseHistory from './pages/student/CourseHistory';

import NotFoundPage from './pages/NotFoundPage';
import CourseHistory from './pages/student/CourseHistory';

const App: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected Routes */}
      <Route
        element={
          <ProtectedRoute isAllowed={!!user}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRouteGuard><AdminDashboard /></AdminRouteGuard>} />
        <Route path="/admin/students" element={<AdminRouteGuard><ManageStudents /></AdminRouteGuard>} />
        <Route path="/admin/faculty" element={<AdminRouteGuard><ManageFaculty /></AdminRouteGuard>} />
        <Route path="/admin/courses" element={<AdminRouteGuard><ManageCourses /></AdminRouteGuard>} />

        {/* Faculty Routes */}
        <Route path="/faculty" element={<FacultyRouteGuard><FacultyDashboard /></FacultyRouteGuard>} />
        <Route path="/faculty/grades" element={<FacultyRouteGuard><GradeEntry /></FacultyRouteGuard>} />
        <Route path="/faculty/performance" element={<FacultyRouteGuard><StudentPerformance /></FacultyRouteGuard>} />

        {/* Student Routes */}
        <Route path="/student" element={<StudentRouteGuard><StudentDashboard /></StudentRouteGuard>} />
        <Route path="/student/grades" element={<StudentRouteGuard><Grades /></StudentRouteGuard>} />
        <Route path="/student/performance" element={<StudentRouteGuard><Performance /></StudentRouteGuard>} />
        <Route path="/student/CourseHistory" element={<StudentRouteGuard><CourseHistory /></StudentRouteGuard>} />
      </Route>

      {/* Landing and Default Routes */}
      <Route path="/" element={user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

// Route guard components
interface ProtectedRouteProps {
  isAllowed: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

const AdminRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Navigate to={`/${user?.role || ''}`} />;
  }
  return <>{children}</>;
};

const FacultyRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'faculty') {
    return <Navigate to={`/${user?.role || ''}`} />;
  }
  return <>{children}</>;
};

const StudentRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user?.role !== 'student') {
    return <Navigate to={`/${user?.role || ''}`} />;
  }
  return <>{children}</>;
};

export default App;