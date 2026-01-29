import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { formatPrice } from '../utils/formatters';

const PackageDetail = () => {
  const { slug } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);

    try {
      // Query for the package with the matching slug
      const packagesRef = collection(db, 'packages');
      const q = query(
        packagesRef, 
        where('slug', '==', slug), 
        limit(1)
      );
      
      // Set up real-time listener
      const unsubscribe = onSnapshot(
        q, 
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            const data = doc.data();
            // Ensure itinerary is always an array
            const formattedData = {
              id: doc.id,
              ...data,
              itinerary: Array.isArray(data.itinerary) 
                ? data.itinerary 
                : []
            };
            setPackageData(formattedData);
          } else {
            setError('Package not found');
          }
          setLoading(false);
        },
        (err) => {
          console.error('Error fetching package:', err);
          setError('Failed to load package details');
          setLoading(false);
          toast.error('Failed to load package details');
        }
      );

      // Clean up subscription on unmount
      return () => unsubscribe();
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError('Error setting up real-time updates');
      setLoading(false);
      toast.error('Error setting up package details');
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-700">{error || 'Package not found'}</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { name, duration, price, description, images, itinerary } = packageData;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="mb-8">
        {images && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={img} 
                  alt={`${name} - ${index + 1}`} 
                  className="w-full h-64 object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500">No images available</span>
          </div>
        )}
      </div>

      {/* Package Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{duration}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="text-3xl font-bold text-blue-600">{formatPrice(price)}</span>
            <span className="text-gray-600"> / person</span>
          </div>
        </div>

        <div className="prose max-w-none mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Itinerary</h2>
          <div className="space-y-6">
            {itinerary && itinerary.length > 0 ? (
              itinerary.map((day, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center mr-4 font-bold">
                      {day.day}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{day.title}</h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-gray-700 mb-3">{day.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Meals: {day.meals || 'Not specified'}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Hotel: {day.hotel || 'Not specified'}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No itinerary details available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
