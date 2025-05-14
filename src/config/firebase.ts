import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyBOMsR3c9iNW0rhxMTUKiu9j8Un4JQyCaw",
  authDomain: "tack-31d81.firebaseapp.com",
  projectId: "tack-31d81",
  storageBucket: "tack-31d81.firebasestorage.app",
  messagingSenderId: "1090918023274",
  appId: "1:1090918023274:web:3eedcc22aa6c2098988a13",
  measurementId: "G-5QFRX71SYS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); // 👈 ADD THIS

export { auth, db }; // 👈 EXPORT IT
export default app;
export { analytics };
export { firebaseConfig };
export { app };
export { getAuth };
export { getFirestore };
export { initializeApp };
export { getAnalytics };