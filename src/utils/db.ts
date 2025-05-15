import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint
} from 'firebase/firestore';
import type { 
  User, 
  Student, 
  Faculty, 
  Course, 
  Assignment, 
  Submission,
  Grade,
  Attendance,
  Department,
  Program,
  Notification
} from '../types/schema';

// Generic get document by ID
export async function getDocumentById<T>(collectionName: string, id: string): Promise<T | null> {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as T) : null;
  } catch (error) {
    console.error(`Error fetching ${collectionName} document:`, error);
    throw error;
  }
}

// Generic query documents
export async function queryDocuments<T>(
  collectionName: string,
  constraints: QueryConstraint[]
): Promise<T[]> {
  try {
    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  } catch (error) {
    console.error(`Error querying ${collectionName} collection:`, error);
    throw error;
  }
}

// Generic create document
export async function createDocument<T>(
  collectionName: string,
  data: T,
  customId?: string
): Promise<string> {
  try {
    const docRef = customId 
      ? doc(db, collectionName, customId)
      : doc(collection(db, collectionName));
    await setDoc(docRef, data);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating ${collectionName} document:`, error);
    throw error;
  }
}

// Generic update document
export async function updateDocument<T extends DocumentData>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(`Error updating ${collectionName} document:`, error);
    throw error;
  }
}

// Generic delete document
export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    console.error(`Error deleting ${collectionName} document:`, error);
    throw error;
  }
}

// Function to seed initial courses
export async function seedInitialCourses(studentId: string) {
  const initialCourses = [
    {
      code: 'CS101',
      name: 'Introduction to Programming',
      description: 'Learn the basics of programming with Python',
      credits: 3,
      department: 'Computer Science',
      semester: 1,
      instructor: 'Dr. Smith',
      prerequisites: [],
      capacity: 30,
      enrolledStudents: [studentId],
      syllabus: 'Course syllabus...',
      schedule: [
        {
          day: 'Monday',
          startTime: '09:00',
          endTime: '10:30',
          room: 'CS-101'
        }
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      code: 'MATH201',
      name: 'Calculus I',
      description: 'Introduction to differential calculus',
      credits: 4,
      department: 'Mathematics',
      semester: 1,
      instructor: 'Dr. Johnson',
      prerequisites: [],
      capacity: 40,
      enrolledStudents: [studentId],
      syllabus: 'Course syllabus...',
      schedule: [
        {
          day: 'Tuesday',
          startTime: '11:00',
          endTime: '12:30',
          room: 'MATH-201'
        }
      ],
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  try {
    for (const courseData of initialCourses) {
      await createDocument('courses', courseData);
    }
    console.log('Initial courses seeded successfully');
  } catch (error) {
    console.error('Error seeding initial courses:', error);
    throw error;
  }
}

// Specific functions for each collection
export const usersDB = {
  getUser: (id: string) => getDocumentById<User>('users', id),
  createUser: (data: Omit<User, 'uid'>, uid: string) => createDocument<Omit<User, 'uid'>>('users', data, uid),
  updateUser: (id: string, data: Partial<User>) => updateDocument<User>('users', id, data),
  deleteUser: (id: string) => deleteDocument('users', id),
};

export const coursesDB = {
  getCourse: (id: string) => getDocumentById<Course>('courses', id),
  createCourse: (data: Omit<Course, 'id'>) => createDocument<Omit<Course, 'id'>>('courses', data),
  updateCourse: (id: string, data: Partial<Course>) => updateDocument<Course>('courses', id, data),
  deleteCourse: (id: string) => deleteDocument('courses', id),
  getInstructorCourses: (instructorId: string) => 
    queryDocuments<Course>('courses', [where('instructor', '==', instructorId), orderBy('createdAt', 'desc')]),
  getStudentCourses: (studentId: string) =>
    queryDocuments<Course>('courses', [where('enrolledStudents', 'array-contains', studentId), orderBy('createdAt', 'desc')]),
  seedInitialCourses: seedInitialCourses,
};

export const assignmentsDB = {
  getAssignment: (id: string) => getDocumentById<Assignment>('assignments', id),
  createAssignment: (data: Omit<Assignment, 'id'>) => createDocument<Omit<Assignment, 'id'>>('assignments', data),
  updateAssignment: (id: string, data: Partial<Assignment>) => updateDocument<Assignment>('assignments', id, data),
  deleteAssignment: (id: string) => deleteDocument('assignments', id),
  getCourseAssignments: (courseId: string) =>
    queryDocuments<Assignment>('assignments', [where('courseId', '==', courseId), orderBy('dueDate', 'asc')]),
};

export const submissionsDB = {
  getSubmission: (id: string) => getDocumentById<Submission>('submissions', id),
  createSubmission: (data: Omit<Submission, 'id'>) => createDocument<Omit<Submission, 'id'>>('submissions', data),
  updateSubmission: (id: string, data: Partial<Submission>) => updateDocument<Submission>('submissions', id, data),
  deleteSubmission: (id: string) => deleteDocument('submissions', id),
  getAssignmentSubmissions: (assignmentId: string) =>
    queryDocuments<Submission>('submissions', [where('assignmentId', '==', assignmentId), orderBy('submittedAt', 'desc')]),
  getStudentSubmissions: (studentId: string) =>
    queryDocuments<Submission>('submissions', [where('studentId', '==', studentId), orderBy('submittedAt', 'desc')]),
};

export const gradesDB = {
  getGrade: (id: string) => getDocumentById<Grade>('grades', id),
  createGrade: (data: Omit<Grade, 'id'>) => createDocument<Omit<Grade, 'id'>>('grades', data),
  updateGrade: (id: string, data: Partial<Grade>) => updateDocument<Grade>('grades', id, data),
  deleteGrade: (id: string) => deleteDocument('grades', id),
  getStudentGrades: (studentId: string) =>
    queryDocuments<Grade>('grades', [where('studentId', '==', studentId), orderBy('lastUpdated', 'desc')]),
  getCourseGrades: (courseId: string) =>
    queryDocuments<Grade>('grades', [where('courseId', '==', courseId), orderBy('lastUpdated', 'desc')]),
};

export const attendanceDB = {
  getAttendance: (id: string) => getDocumentById<Attendance>('attendance', id),
  createAttendance: (data: Omit<Attendance, 'id'>) => createDocument<Omit<Attendance, 'id'>>('attendance', data),
  updateAttendance: (id: string, data: Partial<Attendance>) => updateDocument<Attendance>('attendance', id, data),
  deleteAttendance: (id: string) => deleteDocument('attendance', id),
  getCourseAttendance: (courseId: string) =>
    queryDocuments<Attendance>('attendance', [where('courseId', '==', courseId), orderBy('date', 'desc')]),
};

export const departmentsDB = {
  getDepartment: (id: string) => getDocumentById<Department>('departments', id),
  createDepartment: (data: Omit<Department, 'id'>) => createDocument<Omit<Department, 'id'>>('departments', data),
  updateDepartment: (id: string, data: Partial<Department>) => updateDocument<Department>('departments', id, data),
  deleteDepartment: (id: string) => deleteDocument('departments', id),
  getAllDepartments: () => queryDocuments<Department>('departments', [orderBy('name', 'asc')]),
};

export const programsDB = {
  getProgram: (id: string) => getDocumentById<Program>('programs', id),
  createProgram: (data: Omit<Program, 'id'>) => createDocument<Omit<Program, 'id'>>('programs', data),
  updateProgram: (id: string, data: Partial<Program>) => updateDocument<Program>('programs', id, data),
  deleteProgram: (id: string) => deleteDocument('programs', id),
  getDepartmentPrograms: (departmentId: string) =>
    queryDocuments<Program>('programs', [where('department', '==', departmentId), orderBy('name', 'asc')]),
};

export const notificationsDB = {
  getNotification: (id: string) => getDocumentById<Notification>('notifications', id),
  createNotification: (data: Omit<Notification, 'id'>) => createDocument<Omit<Notification, 'id'>>('notifications', data),
  updateNotification: (id: string, data: Partial<Notification>) => updateDocument<Notification>('notifications', id, data),
  deleteNotification: (id: string) => deleteDocument('notifications', id),
  getUserNotifications: (userId: string, unreadOnly: boolean = false) => {
    const constraints: QueryConstraint[] = [
      where('recipientId', '==', userId),
      orderBy('createdAt', 'desc')
    ];
    if (unreadOnly) {
      constraints.push(where('read', '==', false));
    }
    return queryDocuments<Notification>('notifications', constraints);
  },
}; 