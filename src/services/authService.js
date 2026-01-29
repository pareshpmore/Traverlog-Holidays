import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';

/**
 * Register a new user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} displayName - User's display name (optional)
 * @returns {Promise<UserCredential>}
 */
export const registerWithEmail = async (email, password, displayName = '') => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = userCredential;

    // Update user profile with display name if provided
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: displayName || '',
      provider: 'password',
      role: 'user',
      emailVerified: user.emailVerified,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return userCredential;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<UserCredential>}
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise<void>}
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get the current authenticated user
 * @returns {User|null} - The current user or null if not authenticated
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return !!auth.currentUser;
};

/**
 * Sign in with Google
 * @returns {Promise<UserCredential>}
 */
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const { user } = result;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        provider: 'google',
        role: 'user',
        emailVerified: user.emailVerified,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    } else {
      // Update last login time
      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    
    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

/**
 * Initialize reCAPTCHA verifier for phone authentication
 * @param {string} elementId - ID of the element to render the reCAPTCHA
 * @returns {RecaptchaVerifier}
 */
export const initializeRecaptcha = (elementId = 'recaptcha-container') => {
  // Clear any existing reCAPTCHA
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear();
  }
  
  // Create a new reCAPTCHA verifier
  window.recaptchaVerifier = new RecaptchaVerifier(auth, elementId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber
    },
    'expired-callback': () => {
      // Reset reCAPTCHA
      window.recaptchaVerifier.render().then((widgetId) => {
        window.recaptchaVerifier.verify();
      });
    }
  });
  
  return window.recaptchaVerifier;
};

/**
 * Send OTP to the provided phone number
 * @param {string} phoneNumber - Phone number in E.164 format (e.g., +1234567890)
 * @param {string} recaptchaContainerId - ID of the reCAPTCHA container
 * @returns {Promise<ConfirmationResult>}
 */
export const sendOtp = async (phoneNumber, recaptchaContainerId = 'recaptcha-container') => {
  try {
    // Initialize reCAPTCHA if not already done
    if (!window.recaptchaVerifier) {
      initializeRecaptcha(recaptchaContainerId);
    }
    
    // Format phone number if needed
    const formattedNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`;
    
    // Send OTP
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      formattedNumber, 
      window.recaptchaVerifier
    );
    
    // Store confirmation result for later use
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    // Reset reCAPTCHA on error
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    throw error;
  }
};

/**
 * Verify the OTP code
 * @param {string} code - The OTP code entered by the user
 * @returns {Promise<UserCredential>}
 */
export const verifyOtp = async (code) => {
  try {
    if (!window.confirmationResult) {
      throw new Error('No verification in progress. Please request a new OTP.');
    }
    
    // Verify the OTP
    const result = await window.confirmationResult.confirm(code);
    const { user } = result;
    
    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        provider: 'phone',
        role: 'user',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp()
      });
    } else {
      // Update last login time
      await setDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    
    // Clean up
    delete window.confirmationResult;
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
    
    return result;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

/**
 * Check if user has admin role
 * @param {string} uid - User ID
 * @returns {Promise<boolean>}
 */
export const isAdmin = async (uid) => {
  if (!uid) return false;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    return userDoc.exists() && userDoc.data().role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
