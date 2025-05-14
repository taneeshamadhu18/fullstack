import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  accent?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'none';
}

const Card: React.FC<CardProps> = ({ children, className, accent = 'none' }) => {
  return (
    <div
      className={cn(
        'rounded-lg bg-white p-6 shadow transition hover:shadow-md',
        accent === 'primary' && 'border-l-4 border-primary-500',
        accent === 'secondary' && 'border-l-4 border-secondary-500',
        accent === 'accent' && 'border-l-4 border-accent-500',
        accent === 'success' && 'border-l-4 border-success-500',
        accent === 'warning' && 'border-l-4 border-warning-500',
        accent === 'error' && 'border-l-4 border-error-500',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;