import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const HoneymoonSection = () => {
  const [selectedOption, setSelectedOption] = useState('domestic');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const domesticPackages = [
    'Romantic Himachal Holidays',
    'Romantic Kerala Holidays',
    'Romantic Kerala with Kanyakumari Holidays',
    'Romantic Darjeeling – Gangtok',
    'Romantic Coorg Holidays',
    'Romantic Wayanad Holidays',
  ];

  const handlePackageClick = (packageName) => {
    // In a real app, you would navigate to the specific package page
    console.log(`Selected package: ${packageName}`);
    // Example: navigate(`/honeymoon/${packageName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <section 
      ref={ref}
      className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Honeymoon Select Option:</h2>
          
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setSelectedOption('domestic')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                selectedOption === 'domestic'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Domestic
            </button>
            <button
              onClick={() => setSelectedOption('international')}
              className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
                selectedOption === 'international'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              International
            </button>
          </div>
        </motion.div>

        {selectedOption === 'domestic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {domesticPackages.map((pkg, index) => (
              <motion.div
                key={pkg}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white cursor-pointer 
                           transform transition-all duration-300 hover:shadow-xl hover:from-blue-700 hover:to-blue-600"
                onClick={() => handlePackageClick(pkg)}
              >
                <h3 className="text-xl font-semibold mb-2">{pkg}</h3>
                <p className="text-blue-100 text-sm">Starting from ₹25,000*</p>
                <div className="mt-4 flex items-center text-sm text-blue-100">
                  <span>Explore Package</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {selectedOption === 'international' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl p-8 shadow-lg inline-block">
              <svg className="w-16 h-16 mx-auto text-blue-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">International Packages Coming Soon</h3>
              <p className="text-gray-600">We're working on adding amazing international honeymoon destinations for you!</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HoneymoonSection;
