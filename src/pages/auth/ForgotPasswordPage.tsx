import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Mail, CheckCircle } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (error: any) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="animate-fade-in text-center py-6">
        <CheckCircle size={48} className="mx-auto text-success-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Email Sent</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <span className="font-medium">{email}</span>.
          Please check your inbox and follow the instructions.
        </p>
        <div className="flex flex-col space-y-4">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Return to Login
            </Button>
          </Link>
          <button
            type="button"
            className="text-sm text-primary-600 hover:text-primary-500"
            onClick={() => setSubmitted(false)}
          >
            Try with a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
      <p className="text-gray-600 mb-6">
        Enter your email and we'll send you a link to reset your password
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-error-50 text-error-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail size={18} className="text-gray-500" />}
          required
          autoComplete="email"
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={loading}
        >
          Send Reset Link
        </Button>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="text-sm font-medium text-primary-600 hover:text-primary-500"
          >
            Return to login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;