// Base types without authentication fields
interface BaseUserData {
  displayName: string;
  department?: string;
  program?: string;
  semester?: number;
  joinedAt: string;
  lastLogin: string;
  isActive: boolean;
  photoURL?: string;
}

// Authentication fields
interface AuthFields {
  uid: string;
  email: string;
}

// Role-specific data types
interface StudentData extends BaseUserData {
  role: 'student';
  registrationNumber: string;
  batch: string;
  cgpa: number;
  credits: number;
  enrolledCourses: string[];
  completedCourses: string[];
}

interface FacultyData extends BaseUserData {
  role: 'faculty';
  employeeId: string;
  designation: string;
  specialization: string[];
  assignedCourses: string[];
}

interface AdminData extends BaseUserData {
  role: 'admin';
  permissions: string[];
}

// Combined types for complete user records
export type Student = StudentData & AuthFields;
export type Faculty = FacultyData & AuthFields;
export type Admin = AdminData & AuthFields;
export type User = Student | Faculty | Admin;

// Types for registration
export type NewStudentData = Omit<StudentData, 'joinedAt' | 'lastLogin' | 'isActive'>;
export type NewFacultyData = Omit<FacultyData, 'joinedAt' | 'lastLogin' | 'isActive'>;
export type NewAdminData = Omit<AdminData, 'joinedAt' | 'lastLogin' | 'isActive'>;
export type NewUserData = NewStudentData | NewFacultyData | NewAdminData;

// Course related types
export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  credits: number;
  department: string;
  semester: number;
  instructor: string; // Faculty UID
  prerequisites: string[]; // Array of course IDs
  capacity: number;
  enrolledStudents: string[]; // Array of student UIDs
  syllabus: string;
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Assignment related types
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  weight: number; // Percentage weight in final grade
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
  submissionType: 'file' | 'text' | 'both';
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
}

// Submission related types
export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string;
  content?: string;
  attachments: {
    name: string;
    url: string;
    type: string;
  }[];
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'late' | 'graded';
  gradedBy?: string;
  gradedAt?: string;
}

// Grade related types
export interface Grade {
  id: string;
  courseId: string;
  studentId: string;
  assignments: {
    assignmentId: string;
    score: number;
    weight: number;
  }[];
  midtermScore?: number;
  finalScore?: number;
  totalScore: number;
  letterGrade: string;
  gradePoints: number;
  semester: number;
  academicYear: string;
  status: 'in_progress' | 'finalized';
  lastUpdated: string;
}

// Attendance related types
export interface Attendance {
  id: string;
  courseId: string;
  date: string;
  records: {
    studentId: string;
    status: 'present' | 'absent' | 'late' | 'excused';
    remarks?: string;
  }[];
  takenBy: string; // Faculty UID
  createdAt: string;
  updatedAt: string;
}

// Department related types
export interface Department {
  id: string;
  name: string;
  code: string;
  headOfDepartment: string; // Faculty UID
  faculty: string[]; // Array of faculty UIDs
  programs: string[]; // Array of program IDs
  courses: string[]; // Array of course IDs
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Program/Major related types
export interface Program {
  id: string;
  name: string;
  code: string;
  department: string; // Department ID
  coordinator: string; // Faculty UID
  totalCredits: number;
  duration: number; // In years
  courses: {
    semester: number;
    required: string[]; // Array of course IDs
    elective: string[]; // Array of course IDs
  }[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Notification related types
export interface Notification {
  id: string;
  recipientId: string;
  title: string;
  message: string;
  type: 'assignment' | 'grade' | 'announcement' | 'system';
  relatedId?: string; // ID of related entity (assignment, course, etc.)
  read: boolean;
  createdAt: string;
}

// Academic Calendar related types
export interface AcademicCalendar {
  id: string;
  academicYear: string;
  events: {
    title: string;
    type: 'class_start' | 'class_end' | 'exam' | 'holiday' | 'other';
    startDate: string;
    endDate: string;
    description?: string;
  }[];
  createdAt: string;
  updatedAt: string;
} 