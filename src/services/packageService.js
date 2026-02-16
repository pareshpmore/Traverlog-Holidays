import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  serverTimestamp, 
  query, 
  where, 
  limit, 
  onSnapshot, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../firebase';

const PACKAGES_COLLECTION = 'packages';

/**
 * Checks if the packages collection exists and creates it if it doesn't
 * @returns {Promise<boolean>} True if collection exists or was created successfully
 */
/**
 * Updates existing package documents to include new optional fields if they don't exist
 * @returns {Promise<{updatedCount: number, totalPackages: number}>} Object containing count of updated packages and total packages
 */
export const updatePackageSchema = async () => {
  try {
    const packagesRef = collection(db, PACKAGES_COLLECTION);
    const querySnapshot = await getDocs(packagesRef);
    
    if (querySnapshot.empty) {
      console.log('No packages found in the collection.');
      return { updatedCount: 0, totalPackages: 0 };
    }
    
    const batch = writeBatch(db);
    let updateCount = 0;
    
    querySnapshot.forEach((docSnapshot) => {
      const docData = docSnapshot.data();
      const updates = {};
      
      // Check and add missing fields
      if (!docData.inclusions) updates.inclusions = [];
      if (!docData.exclusions) updates.exclusions = [];
      if (!docData.termsAndConditions) updates.termsAndConditions = [];
      if (!docData.cancellationPolicy) updates.cancellationPolicy = [];
      if (docData.rating === undefined) updates.rating = 4.5;
      if (docData.reviewsCount === undefined) updates.reviewsCount = 10;
      if (!docData.galleryImages) updates.galleryImages = [];
      
      // Only update if there are fields to add
      if (Object.keys(updates).length > 0) {
        const docRef = doc(db, PACKAGES_COLLECTION, docSnapshot.id);
        batch.update(docRef, {
          ...updates,
          updatedAt: serverTimestamp()
        });
        updateCount++;
      }
    });
    
    // Commit the batch if there are updates
    if (updateCount > 0) {
      await batch.commit();
      console.log(`Successfully updated ${updateCount} packages with new schema fields.`);
    } else {
      console.log('All packages already have the latest schema fields.');
    }
    
    return { 
      updatedCount: updateCount, 
      totalPackages: querySnapshot.size,
      message: updateCount > 0 
        ? `Updated ${updateCount} out of ${querySnapshot.size} packages.`
        : 'No updates needed. All packages have the latest schema.'
    };
    
  } catch (error) {
    console.error('Error updating package schema:', error);
    throw error;
  }
};

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
        duration: {
          days: 0,
          nights: 0
        },
        price: 0,
        description: '',
        images: [],
        itinerary: [{
          day: 1,
          title: '',
          description: '',
          meals: '',
          termsAndConditions: [],
          cancellationPolicy: [],
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
 * @property {Object} duration - Duration of the package
 * @property {number} duration.days - Number of days
 * @property {number} duration.nights - Number of nights
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
