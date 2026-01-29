import { collection, getDocs, setDoc, doc, serverTimestamp, query, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const PACKAGES_COLLECTION = 'packages';

/**
 * Checks if the packages collection exists and creates it if it doesn't
 * @returns {Promise<boolean>} True if collection exists or was created successfully
 */
export const ensurePackagesCollection = async () => {
  try {
    // Check if collection exists by trying to get documents
    const querySnapshot = await getDocs(collection(db, PACKAGES_COLLECTION));
    
    // If we get here, the collection exists
    console.log('Packages collection exists');
    return true;
  } catch (error) {
    if (error.code === 'not-found' || error.code === 'not-found' || 
        error.message.includes('Missing or insufficient permissions') ||
        error.message.includes('permission-denied')) {
      
      // Collection doesn't exist or we don't have permission to read it
      // Create a sample document to initialize the collection with the correct schema
      const samplePackage = {
        name: '',
        slug: '',
        type: 'domestic',
        duration: '',
        price: 0,
        description: '',
        images: [],
        itinerary: [{
          day: 1,
          title: '',
          description: '',
          meals: '',
          hotel: ''
        }],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      try {
        // Create a document to initialize the collection
        const docRef = doc(collection(db, PACKAGES_COLLECTION));
        await setDoc(docRef, samplePackage);
        
        console.log('Created packages collection with sample document');
        return true;
      } catch (createError) {
        console.error('Error creating packages collection:', createError);
        return false;
      }
    }
    
    console.error('Error checking packages collection:', error);
    return false;
  }
};

/**
 * Type definition for a travel package document
 * @typedef {Object} TravelPackage
 * @property {string} name - Name of the package
 * @property {string} slug - URL-friendly slug for the package
 * @property {'domestic'|'international'} type - Type of package
 * @property {string} duration - Duration of the package (e.g., "3 Days / 2 Nights")
 * @property {number} price - Price of the package
 * @property {string} description - Detailed description of the package
 * @property {string[]} images - Array of image URLs
 * @property {Array<{
 *   day: number,
 *   title: string,
 *   description: string,
 *   meals: string,
 *   hotel: string
 * }>} itinerary - Daily itinerary details
 * @property {import('firebase/firestore').Timestamp} createdAt - When the package was created
 * @property {import('firebase/firestore').Timestamp} updatedAt - When the package was last updated
 */

/**
 * Get a package by its slug
 * @param {string} slug - The slug of the package to fetch
 * @param {function} onNext - Callback function that receives the package data
 * @param {function} onError - Callback function for error handling
 * @returns {function} Unsubscribe function to stop listening to updates
 */
export const getPackageBySlug = (slug, onNext, onError) => {
  if (!slug) {
    const error = new Error('Slug is required');
    if (onError) onError(error);
    return () => {};
  }

  const packagesRef = collection(db, 'packages');
  const q = query(packagesRef, where('slug', '==', slug), limit(1));
  
  return onSnapshot(
    q,
    (querySnapshot) => {
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        onNext({ id: doc.id, ...doc.data() });
      } else {
        onNext(null);
      }
    },
    (error) => {
      console.error('Error getting package by slug:', error);
      if (onError) onError(error);
    }
  );
};

export default {
  ensurePackagesCollection,
  getPackageBySlug,
};
