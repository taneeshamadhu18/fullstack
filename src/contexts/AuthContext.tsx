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
import type { User, NewUserData } from '../types/schema';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: NewUserData) => Promise<User>;
  signIn: (email: string, password: string) => Promise<User>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

// Create context with a default value
export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => ({ uid: '', email: '', role: 'student', displayName: '', isActive: false, joinedAt: '', lastLogin: '' } as User),
  signIn: async () => ({ uid: '', email: '', role: 'student', displayName: '', isActive: false, joinedAt: '', lastLogin: '' } as User),
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
            const userData = userDoc.data() as Omit<User, 'uid' | 'email'>;
            setUser({
              ...userData,
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
            } as User);
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
    userData: NewUserData
  ): Promise<User> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);

      const timestamp = new Date().toISOString();
      const fullUserData = {
        ...userData,
        uid: result.user.uid,
        email,
        isActive: true,
        joinedAt: timestamp,
        lastLogin: timestamp,
      } as User;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', result.user.uid), fullUserData);

      toast.success('Account created successfully');
      return fullUserData;
    } catch (error: any) {
      console.error('Detailed sign-up error:', {
        code: error.code,
        message: error.message,
        fullError: error
      });

      let message = 'Failed to create account';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email is already in use';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak';
      }

      toast.error(message);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<User> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        throw new Error('User data not found in Firestore');
      }

      const userData = userDoc.data() as User;
      
      // Update last login
      await setDoc(doc(db, 'users', result.user.uid), {
        ...userData,
        lastLogin: new Date().toISOString()
      }, { merge: true });

      toast.success('Signed in successfully');
      return userData;
    } catch (error: any) {
      console.error('Detailed sign-in error:', {
        code: error.code,
        message: error.message,
        fullError: error
      });

      let message = 'Failed to sign in';
      if (error.code === 'auth/invalid-credential') {
        message = 'Invalid email or password';
      } else if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
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
