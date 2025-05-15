import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, Lock, User, AlertCircle } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'faculty' | 'student'>('student');
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

    setLoading(true);

    try {
      await signUp(email, password, role, name);
      navigate('/signIn');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email is already in use');
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
