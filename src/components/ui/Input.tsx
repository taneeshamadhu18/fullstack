import React, { InputHTMLAttributes, useState } from 'react';
import { cn } from '../../utils/cn';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  className,
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  id,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  const isPassword = type === 'password';

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'w-full rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500',
            leftIcon && 'pl-10',
            (rightIcon || isPassword) && 'pr-10',
            error
              ? 'border-error-300 focus:border-error-500 focus:ring-error-500'
              : 'border-gray-300',
            className
          )}
          {...props}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        ) : (
          rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              {rightIcon}
            </div>
          )
        )}
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
    </div>
  );
};

export default Input;