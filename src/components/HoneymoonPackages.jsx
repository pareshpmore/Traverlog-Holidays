import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

const HoneymoonPackages = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Only show this component on the /domestic route
  if (location.pathname !== '/domestic') {
    return null;
  }

  useEffect(() => {
    // Query for domestic packages
    const q = query(
      collection(db, 'packages'),
      where('type', '==', 'domestic'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const packagesData = [];
        querySnapshot.forEach((doc) => {
          packagesData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setPackages(packagesData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching packages:', error);
        setLoading(false);
      }
    );

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  const handlePackageClick = (pkg) => {
    if (pkg.slug) {
      navigate(`/package/${pkg.slug}`);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gray-50 min-h-[60vh]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">Domestic Honeymoon Packages</h3>
          <p className="text-grey-600 max-w-2xl mx-auto">Discover the most romantic destinations in India, handpicked for your perfect honeymoon experience.</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : packages.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg h-80 cursor-pointer"
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePackageClick(pkg)}
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                {pkg.images && pkg.images.length > 0 ? (
                  <img
                    src={pkg.images[0]}
                    alt={pkg.name || 'Package image'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{pkg.name}</h3>
                <p className="text-gray-200 text-sm mb-4 drop-shadow-md line-clamp-2">{pkg.description}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePackageClick(pkg);
                  }}
                  className="self-start px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                >
                  Explore Package
                </button>
              </div>
            </motion.div>
          ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No packages found. Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HoneymoonPackages;
