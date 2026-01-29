import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut as firebaseSignOut, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastVisitedRoute, setLastVisitedRoute] = useState('/');
  const navigate = useNavigate();
  const location = useLocation();

  // Save the current route whenever it changes (except for login and auth routes)
  useEffect(() => {
    if (!['/login', '/register', '/forgot-password'].includes(location.pathname)) {
      setLastVisitedRoute(location.pathname);
    }
  }, [location]);

  // Register with email and password
  const register = async (email, password, displayName) => {
    try {
      await authService.registerWithEmail(email, password, displayName);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();

      // Update user role in context
      setUserRole(userData?.role || 'user');

      // Redirect based on role
      if (userData?.role === 'admin') {
        navigate('/admin');
      } else {
        // Redirect to last visited route or home
        navigate(lastVisitedRoute || '/');
      }

      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let userData = userDoc.data();

      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: 'user', // Default role
          createdAt: serverTimestamp(),
          provider: 'google'
        };
        await setDoc(doc(db, 'users', user.uid), userData);
      }

      // Update user role in context
      setUserRole(userData?.role || 'user');

      // Redirect based on role
      if (userData?.role === 'admin') {
        navigate('/admin');
      } else {
        // Redirect to last visited route or home
        navigate(lastVisitedRoute || '/');
      }

      return user;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  // Initialize reCAPTCHA for phone auth
  const initRecaptcha = (elementId = 'recaptcha-container') => {
    return authService.initializeRecaptcha(elementId);
  };

  // Send OTP to phone number
  const sendPhoneOtp = async (phoneNumber, recaptchaContainerId) => {
    try {
      return await authService.sendOtp(phoneNumber, recaptchaContainerId);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  };

  // Verify OTP code
  const verifyPhoneOtp = async (code) => {
    try {
      return await authService.verifyOtp(code);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    }
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user document from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();

          // Set the current user and role
          setCurrentUser(user);
          setUserRole(userData?.role || 'user');
        } catch (error) {
          console.error('Error in auth state change:', error);
          setCurrentUser(user);
          setUserRole('user');
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userRole,
    isAuthenticated: !!currentUser,
    isAdmin: userRole === 'admin',
    loading,
    register,
    login,
    logout,
    signInWithGoogle,
    // Phone auth methods
    initRecaptcha,
    sendPhoneOtp,
    verifyPhoneOtp
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
