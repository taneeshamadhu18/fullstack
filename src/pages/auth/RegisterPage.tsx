import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, User, Building, BookOpen, AlertCircle } from 'lucide-react';
import type { NewStudentData, NewFacultyData, NewAdminData } from '../types/schema';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'faculty' | 'student'>('student');
  const [department, setDepartment] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [designation, setDesignation] = useState('');
  const [semester, setSemester] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!role) {
      setError('Please select a role');
      return;
    }

    if (!department) {
      setError('Please enter department');
      return;
    }

    if (role === 'student' && !registrationNumber) {
      setError('Registration number is required for students');
      return;
    }

    if (role === 'faculty' && !employeeId) {
      setError('Employee ID is required for faculty');
      return;
    }

    setLoading(true);

    try {
      const baseUserData = {
        displayName: name,
        department,
      };

      let userData;
      if (role === 'student') {
        userData = {
          ...baseUserData,
          role: 'student' as const,
          registrationNumber,
          semester,
          batch: new Date().getFullYear().toString(),
          cgpa: 0,
          credits: 0,
          enrolledCourses: [],
          completedCourses: [],
        } satisfies NewStudentData;
      } else if (role === 'faculty') {
        userData = {
          ...baseUserData,
          role: 'faculty' as const,
          employeeId,
          designation,
          specialization: [],
          assignedCourses: [],
        } satisfies NewFacultyData;
      } else {
        userData = {
          ...baseUserData,
          role: 'admin' as const,
          permissions: ['all'],
        } satisfies NewAdminData;
      }

      console.log('Starting registration process...');
      const user = await signUp(email, password, userData);
      console.log('Registration successful, user:', user);
      
      // Navigate to the appropriate dashboard
      const path = `/${user.role.toLowerCase()}`;
      console.log('Navigating to:', path);
      navigate(path);
      
    } catch (error: any) {
      console.error('Registration error details:', {
        code: error.code,
        message: error.message,
        fullError: error
      });

      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
      } else if (error.code === 'auth/invalid-email') {
        setError('Invalid email address format');
      } else if (error.code === 'auth/weak-password') {
        setError('Password is too weak - must be at least 6 characters');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Create an Account</h2>
      {error && (
        <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md flex items-start">
          <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          leftIcon={<User size={18} className="text-gray-500" />}
          required
        />
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={18} className="text-gray-500" />}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock size={18} className="text-gray-500" />}
          helperText="Must be at least 6 characters"
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          leftIcon={<Lock size={18} className="text-gray-500" />}
          required
        />

        <Input
          label="Department"
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          leftIcon={<Building size={18} className="text-gray-500" />}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Register as</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="student"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={() => setRole('student')}
                className="mr-2"
              />
              <label htmlFor="student" className="text-gray-700">Student</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="faculty"
                name="role"
                value="faculty"
                checked={role === 'faculty'}
                onChange={() => setRole('faculty')}
                className="mr-2"
              />
              <label htmlFor="faculty" className="text-gray-700">Faculty</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
                className="mr-2"
              />
              <label htmlFor="admin" className="text-gray-700">Admin</label>
            </div>
          </div>
        </div>

        {/* Role-specific fields */}
        {role === 'student' && (
          <>
            <Input
              label="Registration Number"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              leftIcon={<BookOpen size={18} className="text-gray-500" />}
              required
            />
            <Input
              label="Semester"
              type="number"
              min={1}
              max={8}
              value={semester}
              onChange={(e) => setSemester(parseInt(e.target.value))}
              leftIcon={<BookOpen size={18} className="text-gray-500" />}
              required
            />
          </>
        )}

        {role === 'faculty' && (
          <>
            <Input
              label="Employee ID"
              type="text"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              leftIcon={<User size={18} className="text-gray-500" />}
              required
            />
            <Input
              label="Designation"
              type="text"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              leftIcon={<User size={18} className="text-gray-500" />}
              required
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full mt-6"
          size="lg"
          isLoading={loading}
        >
          Create Account
        </Button>

        <div className="mt-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link
            to="/login"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
