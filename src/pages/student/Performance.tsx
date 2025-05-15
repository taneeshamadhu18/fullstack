import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BookOpen } from 'lucide-react';

const courses = [
  {
    name: 'Software Engineering',
    code: 'CSE-305',
    instructor: 'Dr. Robert Johnson',
    credits: 3,
    grade: 'A-',
    percentage: 92,
    status: 'Completed',
  },
  {
    name: 'Calculus III',
    code: 'MATH-201',
    instructor: 'Prof. Maria Garcia',
    credits: 4,
    grade: 'B+',
    percentage: 87,
    status: 'In Progress',
  },
  {
    name: 'Technical Writing',
    code: 'ENG-104',
    instructor: 'Dr. Emily Chen',
    credits: 3,
    grade: 'A',
    percentage: 95,
    status: 'Completed',
  },
  {
    name: 'Modern Physics',
    code: 'PHY-202',
    instructor: 'Prof. David Wilson',
    credits: 2,
    grade: 'B',
    percentage: 84,
    status: 'In Progress',
  },
  {
    name: 'Modern Physics',
    code: 'PHY-202',
    instructor: 'Dr. Sarah Ahmed',
    credits: 4,
    grade: 'A-',
    percentage: 91,
    status: 'In Progress',
  },
];

// Prepare data for pie chart
const performanceData = [
  {
    name: 'Completed',
    value: courses.filter((c) => c.status === 'Completed').length,
  },
  {
    name: 'In Progress',
    value: courses.filter((c) => c.status === 'In Progress').length,
  },
];

const COLORS = ['#4ade80', '#60a5fa']; // green and blue

const Performance: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
        Academic Performance
      </h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">Visual breakdown of your course progress:</p>
        <div className="w-full max-w-md mx-auto">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={performanceData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {performanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Performance;
