import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { BookOpen, Users, Clock, AlertCircle } from 'lucide-react';
import type { Course } from '../../types/schema';
import { coursesDB } from '../../utils/db';
import { toast } from 'react-hot-toast';

const StudentCourses: React.FC = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    if (!user) {
      console.log('No user found in context');
      setError('User authentication required');
      setLoading(false);
      return;
    }
    
    console.log('Fetching courses for user:', user.uid);
    try {
      const courses = await coursesDB.getStudentCourses(user.uid);
      console.log('Fetched courses:', courses);
      setEnrolledCourses(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [user]);

  const handleSeedCourses = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await coursesDB.seedInitialCourses(user.uid);
      toast.success('Sample courses added successfully');
      await fetchCourses();
    } catch (error) {
      console.error('Error seeding courses:', error);
      toast.error('Failed to add sample courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-error-50 text-error-700 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
        <Button variant="outline">Browse Available Courses</Button>
      </div>

      {enrolledCourses.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No courses enrolled</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding some sample courses or browse available courses.</p>
            <div className="mt-6 space-x-4">
              <Button onClick={handleSeedCourses}>Add Sample Courses</Button>
              <Button variant="outline">Browse Courses</Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded-full">
                  {course.code}
                </span>
                <span className="px-2.5 py-1 text-xs font-medium bg-success-100 text-success-800 rounded-full">
                  {course.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{course.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.enrolledStudents.length}/{course.capacity} Students</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{course.credits} Credits</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button variant="outline" className="w-full">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentCourses; 