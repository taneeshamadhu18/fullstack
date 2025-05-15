import React, { createContext, useEffect, useState } from 'react';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase'; // Adjust import based on your setup
import { toast } from 'react-hot-toast';

interface User {
  uid: string;
  email: string;
  role: 'admin' | 'faculty' | 'student';
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, role: 'admin' | 'faculty' | 'student', displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => ({ uid: '', email: '', role: 'student' }),
  signOut: async () => {},
  resetPassword: async () => {},
});

// AuthProvider component to manage authentication state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<User, 'uid'>;

            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              role: userData.role,
              displayName: userData.displayName || firebaseUser.displayName || '',
              photoURL: userData.photoURL || firebaseUser.photoURL || '',
            });
          } else {
            console.error('User document does not exist in Firestore');
            await firebaseSignOut(auth);
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          toast.error('Error loading user profile');
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const signUp = async (
    email: string, 
    password: string, 
    role: 'admin' | 'faculty' | 'student',
    displayName: string
  ) => {
    if (!role) {
      toast.error('Role must be selected');
      throw new Error('Role must be selected');
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        role,
        displayName,
        createdAt: new Date().toISOString(),
      });

      toast.success('Account created successfully');
    } catch (error: any) {
      console.error('Error during sign up:', error);
      let message = 'Failed to create account';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Email is already in use';
      }

      toast.error(message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // Log the result to check the sign-in response
      console.log('Sign-in result:', result);

      const userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        throw new Error('User data not found in Firestore');
      }

      const userData = userDoc.data() as Omit<User, 'uid'>;
      const user = {
        uid: result.user.uid,
        email: result.user.email || '',
        role: userData.role,
        displayName: userData.displayName || result.user.displayName || '',
        photoURL: userData.photoURL || result.user.photoURL || '',
      };

      toast.success('Signed in successfully');
      return user;
    } catch (error: any) {
      console.error('Error during sign-in:', error);

      // Check and log Firebase specific error code and message
      if (error.code) {
        console.error('Firebase Error Code:', error.code);
        console.error('Firebase Error Message:', error.message);
      }

      let message = 'Failed to sign in';

      if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password';
      }

      toast.error(message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Error during sign out:', error);
      toast.error('Failed to sign out');
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent');
    } catch (error) {
      console.error('Error sending reset password email:', error);
      toast.error('Failed to send password reset email');
      throw error;
    }
  };

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
